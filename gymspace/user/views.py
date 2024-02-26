from django.shortcuts import render
from .serializers import *
from .models import (UserProfile,
                     UserPost,
                     UserPostMedia)
from django.contrib.auth.models import User

from gym import models
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import generics

from django.db.models import Count

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication

class UserProfileViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    """
    ViewSet for getting all UserProfile data nad following/unfollowing
    """
    def list(self, request):
        queryset = UserProfile.objects.all()
        serializer = UserProfileSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        serializer = UserProfileSerializer(queryset)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        serializer = FollowSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            following_user = UserProfile.objects.get(pk=serializer.data.get("followers"))
            followed_user = UserProfile.objects.get(pk=serializer.data.get("id"))
            followers = followed_user.followers.values_list('pk', flat=True)
            if following_user.id in followers:
                followed_user.followers.remove(following_user.id)
                followers = followed_user.followers.values_list('pk', flat=True)
                return Response({"following": following_user.id, "followed_followers": followers, "followed_id": followed_user.id})
            elif following_user.id not in followers:
                followed_user.followers.add(following_user.id)
                followers = followed_user.followers.values_list('pk', flat=True)
                return Response({"following": following_user.id, "followed_followers": followers, "followed_id": followed_user.id})
            return Response({'message': 'failed'}) 
        
class SmallUserProfileViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        serializer = SmallUserSerializer(queryset)
        return Response(serializer.data)
    
    def partial_update(self, request, pk=None):
        request.data.pop("followers"),
        request.data.pop("post_list")
        id = request.data.pop('id')
        user = User.objects.get(auth_token=request.COOKIES.get('auth_token'))
        logged_in_user = User.objects.get(pk=id)
        user_profile = UserProfile.objects.get(pk=id)
        if user == logged_in_user:
            setattr(user, "username", request.data.pop("handle"))
            for key, value in request.data.items():
                setattr(user_profile, key, value)
            user.save()
            user_profile.save()
            return Response({'SUCCESS': 'Data updated'})
        return Response({"FAILED": "not working"})

class FollowerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        serializer = FollowerSerializer(queryset)
        followers = serializer.data.get("followers").values_list('pk', flat=True)
        return Response({"followers": followers})

class MostFollowedViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        try:
            first_most_followed = queryset\
                    .followers\
                    .annotate(
                            nused=Count('user_profile__followers')
                            )\
                            .order_by('-nused')[0]
            first_serializer = SmallUserSerializer(data={
                "id": first_most_followed.user_profile.id,
                "username": first_most_followed.user_profile.username,
                "profile_picture": first_most_followed.user_profile.profile_picture
                })
        except:
            first_most_followed = {}
            first_serializer = SmallUserSerializer(data=first_most_followed)
        try:
            second_most_followed = queryset\
                    .followers\
                    .annotate(
                            nused=Count('user_profile__followers')
                            )\
                    .order_by('-nused')[1]
            second_serializer = SmallUserSerializer(data={
                "id": second_most_followed.user_profile.id,
                "username": second_most_followed.user_profile.username,
                "profile_picture": second_most_followed.user_profile.profile_picture,
                                                    })
        except:
            second_most_followed = {}
            second_serializer = SmallUserSerializer(data=second_most_followed)
        if first_serializer.is_valid() and second_serializer.is_valid():
            return Response([first_serializer.data, second_serializer.data])
        if first_serializer.is_valid() and not second_serializer.is_valid():
            return Response([first_serializer.data])
        if not first_serializer.is_valid() and second_serializer.is_valid():
            return Response([second_serializer.data])
        else:
            print(first_serializer.errors)
            return Response([{}, {}])



class ConfirmAuth(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    def create(self, request):
        # Check if 'auth_token' is in the request cookies.
        # Give precedence to 'Authorization' header.
        if 'auth_token' in request.COOKIES and \
                        'HTTP_AUTHORIZATION' not in request.META:
            user = User.objects.get(auth_token=request.COOKIES.get('auth_token'))
            return Response({'log': user.id})
        else:
            return Response({'log': 'not logged in'})
