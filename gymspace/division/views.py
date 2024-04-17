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
#   1. MyDivisions - vrati id vsech divisions ve kterych uzivatel je
#   2. Division - RETRIEVE vrati vsechno info o division, 
#            PARTIAL_UPDATE prida/odebere uzivatele z/do clenu klubu



class GymDivisionsIdViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
        
    def retrieve(self, request, pk=None):
        try:
            division_ids = []
            queryset = Division.objects.filter(parent_gym_id=pk)
            serializer = DivisionIdSerializer(queryset, many=True)
            for division in serializer.data:
                division_ids.append(division["id"])
            return Response(division_ids)
        except:
            return Response([])

class DivisionsIdViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
        
    """
    ViewSet na ziskani id division 
    """
    def list(self, request, pk=None):
        division_ids = []
        queryset = Division.objects.all()
        serializer = DivisionIdSerializer(queryset, many=True)
        for division in serializer.data:
            division_ids.append(division["id"])
        return Response(division_ids)
    
    def retrieve(self, request, pk=None):
        division_ids = []
        queryset = Division.objects.filter(members__in=[pk])
        serializer = DivisionIdSerializer(queryset, many=True)
        for division in serializer.data:
            division_ids.append(division["id"])
        return Response(division_ids)
    
class DivisionNameViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    
    def retrieve(self, request, pk=None):
        division = Division.objects.get(pk=pk)
        return Response(division.title)
    
class DivisionViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
        
    """
    Vrati UPLNE VSECHNO info o Division
    """
    def retrieve(self, request, pk=None):
        division = Division.objects.get(pk=pk)
        serializer = DivisionSerializer(division)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        """
        PRIPOJENI/ODCHOD UZIVATELE Z DIVISION
        pro vyuziti je potreba:
            poslat PATCH request, ktery musi mit:
                auth_token v Cookies
                logged_in_user: id v json body
                division_id: id v json body

                povoli to pripojeni jen uzivateli, ktery ma shodny auth token a logged_in_user
        """
        serializer = DivisionFollowSerializer(data=request.data, partial=True)
        serializer.is_valid()
        joining_user = User.objects.get(pk=serializer.data.get("logged_in_user"))
        division = Division.objects.get(pk=serializer.data.get("division_id"))
        members = division.members.values_list('pk', flat=True)
        if joining_user.id in members:
            division.members.remove(joining_user.id)
            members = division.members.values_list('pk', flat=True)
            return Response({f"user{joining_user.id} leave": "success"})
        elif joining_user.id not in members:
            division.members.add(joining_user.id)
            members = division.members.values_list('pk', flat=True)
            return Response({f"user{joining_user.id} join": "success"})
