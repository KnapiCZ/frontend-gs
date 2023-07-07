from rest_framework import routers,serializers,viewsets
from .models import UserProfile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'handle', 'goal', 'description', 'email', 'sex', 'height', 'weight', 'trainer_status']