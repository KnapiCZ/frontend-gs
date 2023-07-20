from rest_framework import routers,serializers,viewsets
from .models import UserProfile, Follow
from django.db import models
class UserProfileSerializer(serializers.ModelSerializer):
    handle = serializers.CharField(source="get_handle")

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'handle', 'goal', 'description', 'email', 'sex', 'height', 'weight', 'trainer_status']

class FollowSerializer(serializers.Serializer):
    following = serializers.IntegerField()


class UserSmallSerializer(serializers.ModelSerializer):
    handle = serializers.CharField(source="get_handle")

    class Meta:
        model = UserProfile
        fields = ['id', 'handle']
