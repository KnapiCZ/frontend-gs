from django.shortcuts import render
from .serializers import *
from .models import *
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import generics

from django.db.models import Count

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Seznam views (ve stejnem poradi jako jsou napsany)
#   1. MyGyms - vrati id vsech gymu ve kterych uzivatel je
#   2. Gym - RETRIEVE vrati vsechno info o gymu, 
#            PARTIAL_UPDATE prida/odebere uzivatele z/do clenu klubu

class MyGymsViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    
    """
    ViewSet na ziskani id gymu 
    """
    def retrieve(self, request, pk=None):
        queryset = Gym.objects.filter(members__in=[pk])
        serializer = GymIdSerializer(queryset, many=True)
        return Response({"gyms": serializer.data,})

class GymViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    
    """
    Vrati UPLNE VSECHNO info o gymu
    """
    def retrieve(self, request, pk=None):
        gym = Gym.objects.get(pk=pk)
        serializer = GymSerializer(gym)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        """
        PRIPOJENI/ODCHOD UZIVATELE Z GYMU
        pro vyuziti je potreba:
            poslat PATCH request, ktery musi mit:
                auth_token v Cookies
                logged_in_user: id v json body
                gym_id: id v json body

                povoli to pripojeni jen uzivateli, ktery ma shodny auth token a logged_in_user
        """
        serializer = GymFollowSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            user = User.objects.get(auth_token=request.COOKIES.get('auth_token'))
            joining_user = User.objects.get(pk=serializer.data.get("logged_in_user"))
            gym = Gym.objects.get(pk=serializer.data.get("gym_id"))
            members = gym.members.values_list('pk', flat=True)
            if user == joining_user:
                if joining_user.id in members:
                    gym.members.remove(joining_user.id)
                    members = gym.members.values_list('pk', flat=True)
                    return Response({f"user{joining_user.id} leave": "success"})
                elif joining_user.id not in members:
                    gym.members.add(joining_user.id)
                    members = gym.members.values_list('pk', flat=True)
                    return Response({f"user{joining_user.id} join": "success"})
            return Response({'ERROR': 'token does not match logged in user - check the "logged_in_user" id'})
