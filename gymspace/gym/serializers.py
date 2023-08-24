from rest_framework import routers,serializers,viewsets
from .models import *

class GymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gym
        fields = ['id',
                  'title',
                  'description',
                  'logo',
                  ]
