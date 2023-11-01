from rest_framework import routers,serializers,viewsets
from .models import *

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = ['id',
                  'title',
                  'logo',
                  ]

class GymButtonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = '__all__'
