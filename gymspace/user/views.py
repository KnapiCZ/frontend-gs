from django.shortcuts import render
from .serializers import UserProfileSerializer, FollowSerializer
from .models import UserProfile, Follow
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


class FollowViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = Follow.objects.all()
        serializer = FollowSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Follow.objects.filter(following=pk).count()
        print(queryset)
        serializer = FollowSerializer(data={"following": queryset})
        serializer.is_valid()
        print(serializer.validated_data)
        return Response(serializer.data)
