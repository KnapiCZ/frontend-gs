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

class ChallengeIdViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    """
    ViewSet na ziskani challenge all
    """
    def list(self, request):
        queryset = Challenge.objects.all()
        serializer = ChallengeIdSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        challenge_ids = []
        queryset = Challenge.objects.filter(members__in=[pk])
        serializer = ChallengeIdSerializer(queryset, many=True)
        for challenge in serializer.data:
            challenge_ids.append(challenge["id"])
        return Response(challenge_ids)

class ChallengeViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    """
    ViewSet na ziskani challenge all
    """

    def retrieve(self, request, pk=None):
        queryset = Challenge.objects.get(pk=pk)
        serializer = ChallengeSerializer(queryset)
        return Response(serializer.data)
    
class ProgressViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    """
    ViewSet na ziskani progresu uzivatele all
    """

    def create(self, request, pk=None):
        try:
            queryset = MemberProgress.objects.get(user_id=request.data['user'], challenge_id=request.data['challenge'])
            print("\n\n\n", queryset, "\n\n\n")
            serializer = MemberProgressSerializer(queryset)
            return Response(serializer.data)
        except:
            return Response({"ERROR": 'this user doesnt have a progress'})
    
    def partial_update(self, request, pk=None):
        challenge = Challenge.objects.get(id=request.data['challenge'])
        progress = MemberProgress.objects.get(user=request.data['user'], challenge=request.data['challenge'])
        progress.progress = request.data['progress']
        if challenge.goal == progress.progress:
            progress.completed = True
        progress.save()    
        return Response({"SUCCESS": "Progress updated"})

class ProgressCreateViewSeet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
        
    def create(self, request, pk=None):
        challenge = Challenge.objects.get(id=request.data['challenge'])
        user = User.objects.get(id=request.data['user'])
        progress = MemberProgress.objects.create(user=user, challenge=challenge)
        challenge.members.add(user.id)
        challenge.save()
        
        return Response({"SUCCESS": "User joined challenge"})