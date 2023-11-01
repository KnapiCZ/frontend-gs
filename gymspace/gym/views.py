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
    ViewSet for getting all Gym data
    """
    def list(self, request):
        queryset = Gym.objects.all()
        serializer = GymSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Gym.objects.filter(members__in=[pk])
        serializer = GymSerializer(queryset, many=True)
        return Response(serializer.data)

class GymInfoViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk=None):
        queryset = Gym.objects.get(pk=pk)
        serializer = GymButtonSerializer(queryset)
        return Response(serializer.data)
