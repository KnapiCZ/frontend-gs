from rest_framework import routers,serializers,viewsets
from .models import (UserProfile,
                     UserPost,
                     UserPostMedia,
                     )

class UserProfileSerializer(serializers.ModelSerializer):
    handle = serializers.CharField(source="get_handle")
    followers = serializers.IntegerField(source="count_followers")
    post_list = serializers.ListField(source="get_posts")
    class Meta:
        model = UserProfile
        fields = ['id',
                  'username',
                  'handle',
                  'followers',
                  'goal',
                  'description',
                  'email',
                  'sex',
                  'height',
                  'weight',
                  'trainer_status',
                  'profile_picture',
                  'background_picture',
                  'post_list']

class SmallUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'profile_picture']

class FollowSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    followers = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    class Meta:
        fields = ["id", "followers"]

class FollowerSerializer(serializers.Serializer):
    followers = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        fields: ["followers"]


class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = ['id',
                  'author',
                  'gym',
                  'body',
                  'likes',
                  'post_time']

class UserPostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPostMedia
        fields = ['pk',
                  'parent_post',
                  'media']


class UserPostCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = ['id',]
