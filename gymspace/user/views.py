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
    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        serializer = SmallUserSerializer(queryset)
        return Response(serializer.data)

class FollowerViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        queryset = UserProfile.objects.get(pk=pk)
        serializer = FollowerSerializer(queryset)
        followers = serializer.data.get("followers").values_list('pk', flat=True)
        return Response({"followers": followers})

class MostFollowedViewSet(viewsets.ViewSet):
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


class UserPostViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        post = UserPost.objects.get(pk=pk)
        media = UserPostMedia.objects.filter(parent_post__pk=pk)

        post_serializer = UserPostSerializer(data={
            "id": post.id,
            "author": post.author.pk,
            "title": post.title,
            "body": post.body,
            "likes": post.likes.values_list('pk', flat=True),
            "post_time": post.post_time
            })
        print(media)
        media_serializer = UserPostMediaSerializer(media, many=True)

        if post_serializer.is_valid():
            return Response({"post": post_serializer.data,
                             "media": media_serializer.data})
        else:
            return Response({"post error": post_serializer.errors,})


class RecommendedPostViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):

        following = UserProfile.objects.filter(followers=pk)\
                .values_list('pk', flat=True)
        posts = UserPost.objects\
                .filter(author__user_profile__in=following)\
                .order_by('-post_time')[:5]

        post_serializer = UserPostSerializer(posts, many=True)
        print(posts)
        return Response({"posts": post_serializer.data,})

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
