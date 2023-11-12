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
class MyGymsViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    #authentication_classes = (TokenAuthentication,) s timhle to nefunguje idk proc

    """
    ViewSet na ziskani malyho gym infa (id, title, logo) 
    """
    def list(self, request):
        queryset = Gym.objects.all()
        serializer = GymSmallSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Gym.objects.filter(members__in=[pk])
        serializer = GymSmallSerializer(queryset, many=True)
        return Response(serializer.data)

class GymInfoViewSet(viewsets.ViewSet):
    """
    Vrati UPLNE VSECHNO info o gymu
    """
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk=None):
        queryset = Gym.objects.get(pk=pk)
        serializer = GymSerializer(queryset)
        return Response(serializer.data)

class GymViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):
        queryset = Gym.objects.get(pk=pk)
        serializer = GymSerializer(queryset)
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
            following_user = User.objects.get(pk=serializer.data.get("logged_in_user"))
            followed_user = Gym.objects.get(pk=serializer.data.get("gym_id"))
            followers = followed_user.members.values_list('pk', flat=True)
            if user == following_user:
                if following_user.id in followers:
                    followed_user.members.remove(following_user.id)
                    followers = followed_user.members.values_list('pk', flat=True)
                    return Response({f"user{following_user.id} leave": "success"})
                elif following_user.id not in followers:
                    followed_user.members.add(following_user.id)
                    followers = followed_user.members.values_list('pk', flat=True)
                    return Response({f"user{following_user.id} join": "success"})
            return Response({'ERROR': 'token does not match logged in user - check the "logged_in_user" id'})
