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

class UserPostViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):
        post = UserPost.objects.get(pk=pk)
        media = UserPostMedia.objects.filter(parent_post__pk=pk)

        post_serializer = UserPostSerializer(data={
            "id": post.id,
            "author": post.author.pk,
            "gym": post.gym.pk,
            "body": post.body,
            "likes": post.likes.count(),
            "post_time": post.post_time
            })
        media_serializer = UserPostMediaSerializer(media, many=True)

        if post_serializer.is_valid():
            return Response({"post": post_serializer.data,
                             "media": media_serializer.data})
        else:
            return Response({"post error": post_serializer.errors,})


class RecommendedPostViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):

        following = UserProfile.objects.filter(followers=pk)\
                .values_list('pk', flat=True)
        posts = UserPost.objects\
                .filter(author__user_profile__in=following)\
                .order_by('-post_time')[:5]

        post_serializer = UserPostSerializer(posts, many=True)
        return Response({"posts": post_serializer.data,})

class AllUserPostsViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):
        posts = UserPost.objects.filter(author__id=pk)
        serializer = UserPostCountSerializer(posts, many=True)
        return Response({"posts": serializer.data,})
