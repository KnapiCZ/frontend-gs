from rest_framework import routers,serializers,viewsets
from .models import *

class DivisionIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = ["id",]

class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = '__all__'

class DivisionFollowSerializer(serializers.Serializer):
    division_id = serializers.IntegerField()
    logged_in_user = serializers.PrimaryKeyRelatedField(queryset=Division.objects.all())
    class Meta:
        fields = ["division_id", "logged_in_user"]
