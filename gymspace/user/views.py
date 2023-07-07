from django.shortcuts import render
from .serializers import UserProfileSerializer
from .models import UserProfile
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

class UserProfileViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        queryset = User.objects.all()
        serializer = UserProfileSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        serializer = UserProfileSerializer(queryset)
        return Response(serializer.data)