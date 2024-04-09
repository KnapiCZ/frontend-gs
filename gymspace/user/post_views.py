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

from django.core.files.base import ContentFile
import base64


class UserPostViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
        
    def create(self, request):
        post = UserPost.objects.create(author_id=request.data["author"], description=request.data["description"])
        for media in request.data["media"]:
            format, imgstr = media.split(';base64,') 
            ext = format.split('/')[-1] 
            data = ContentFile(base64.b64decode(imgstr), name='image.' + ext) 
            UserPostMedia.objects.create(parent_post_id=post.id, media=data)

        return Response({"SUCCESS": "it works for now"})
    
    def retrieve(self, request, pk=None):
        post = UserPost.objects.get(pk=pk)
        post_serializer = UserPostSerializer(post)
        return Response(post_serializer.data)
        
    def partial_update(self, request, pk=None):
        user = User.objects.get(pk=request.data.get('logged_in_user'))
        post = UserPost.objects.get(pk=request.data.get("post_id"))
        post.description = request.data.get('description')
        post.save()
        return Response({'SUCCES': 'Description updated succesfuly'})

 
    def delete(self, request, pk=None):
        user = User.objects.get(pk=request.data.get("logged_in_user"))
        post = UserPost.objects.get(pk=request.data.get("post_id"))
        post.delete()
        return Response({'SUCCES': 'File deleted succesfuly'})

class RecommendedPostViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    
    def retrieve(self, request, pk=None):

        following = UserProfile.objects.filter(followers=pk)\
                .values_list('pk', flat=True)
        posts = UserPost.objects\
                .filter(author__user_profile__in=following)\
                .order_by('-post_time')[:5]

        post_serializer = UserPostSerializer(posts, many=True)
        return Response({"posts": post_serializer.data,})

class AllUserPostsIDViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    
    """
    Vrati pole ID vsech prispevku od uzivatele
    api/users-posts-all-id/<id>/
    """
    def retrieve(self, request, pk=None):
        posts = UserPost.objects.filter(author__id=pk)
        serializer = UserPostCountSerializer(posts, many=True)
        return Response({"posts": serializer.data,})

class AllUserPostsDetailViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    
    """
    Vrati detailni pole vsech prispevku od uzivatele
    api/users-posts-all-detail/<id>/
    """
    def retrieve(self, request, pk=None):
        posts = UserPost.objects.filter(author__id=pk)
        serializer = UserPostSerializer(posts, many=True)
        return Response({"posts": serializer.data,})

class UserPostThumbnail(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def retrieve(self, request, pk=None):
        post = UserPost.objects.get(pk=pk)
        post_serializer = UserPostSerializer(data={'media': post.media})
        return Response({"post": post_serializer.data})
        

class UserPostLikedStatusViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)
    
    """
    vrati jestli jsem liknul nebo ne urcitej prispevek
    api/users-posts-liked-status/
        musis mit auth_token v cookies
        musi to byt POST
        v json body:
            user: id
            post_id: id
    """
    def create(self, request):
        post = UserPost.objects.get(pk=request.data.get("post_id"))
        if int(request.data.get("logged_in_user")) in post.likes.values_list('pk', flat=True):
             return Response({"liked": "true"})
        return Response({"liked": "false",})

    def partial_update(self, request, pk=None):
        """
        LIKE/UNLIKE POSTU
        pro vyuziti je potreba:

            url = api/users-posts/like/
            poslat PATCH request, ktery musi mit:
                auth_token v Cookies
                logged_in_user: id v json body
                post_id: id v json body

                povoli to pripojeni jen uzivateli, ktery ma shodny auth token a logged_in_user
        """
        serializer = PostLikeSerializer(data=request.data, partial=True)
        serializer.is_valid()
        user = User.objects.get(pk=serializer.data.get("logged_in_user"))
        post = UserPost.objects.get(pk=serializer.data.get("post_id"))
        likes = post.likes.values_list('pk', flat=True)
        if user.id in likes:
            post.likes.remove(user.id)
            return Response({f"user {user.id} unlike": "success"})
        elif user.id not in likes:
            post.likes.add(user.id)
            return Response({f"user {user.id} like": "success"})
       