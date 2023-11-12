from rest_framework import routers,serializers,viewsets
from .models import *

class GymSmallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = ['id',
                  'title',
                  'logo',
                  ]

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = '__all__'

class GymFollowSerializer(serializers.Serializer):
    gym_id = serializers.IntegerField()
    logged_in_user = serializers.PrimaryKeyRelatedField(queryset=Gym.objects.all())
    class Meta:
        fields = ["gym_id", "logged_in_user"]
