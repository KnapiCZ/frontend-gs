from rest_framework import routers,serializers,viewsets
from .models import *

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = '__all__'
        
class ChallengeIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['id',]
        
class MemberProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberProgress
        fields = ['completed', 'progress']