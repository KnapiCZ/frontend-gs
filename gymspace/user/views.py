from django.shortcuts import render
from .serializers import UserProfileSerializer, FollowCountSerializer
from .models import UserProfile
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

class UserProfileViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = UserProfile.objects.all()
        serializer = UserProfileSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        serializer = UserProfileSerializer(queryset)
        return Response(serializer.data)

    def followers(self, request, pk=None):
        user = UserProfile.objects.get(pk=pk)
        print(user)
        

        followers = len(user.following.all())

        print(followers)
        serializer = FollowCountSerializer(data={"following": followers, "followers": followers})
        serializer.is_valid()
        print(serializer.validated_data)
        return Response(serializer.data)

class FollowCountViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = UserProfile.objects.all()
        serializer = FollowCountSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = UserProfile.objects.get(pk=pk)
        print(user)
        
        following = len(user.followers.all())
        followers = UserProfile.objects.filter(followers=pk).count()

        print(followers)
        serializer = FollowCountSerializer(data={"following": following, "followers": followers})
        serializer.is_valid()
        print(serializer.validated_data)
        return Response(serializer.data)
