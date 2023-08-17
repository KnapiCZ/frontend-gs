from rest_framework import routers,serializers,viewsets
from .models import UserProfile
class UserProfileSerializer(serializers.ModelSerializer):
    handle = serializers.CharField(source="get_handle")
    followers = serializers.IntegerField(source="count_followers")

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
                  'background_picture']

class UserSmallSerializer(serializers.ModelSerializer):
    handle = serializers.CharField(source="get_handle")

    class Meta:
        model = UserProfile
        fields = ['id', 'handle']

class FollowCountSerializer(serializers.Serializer):
    followed_by = serializers.IntegerField()
    following = serializers.IntegerField()
