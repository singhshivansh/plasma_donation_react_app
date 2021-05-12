from django.contrib.auth.models import User
from django.db.models import fields
from rest_framework import serializers

from rest_framework.authtoken.models import Token

from .models import Donor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'])
        Token.objects.create(user=user)
        return user

class DonorSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=30)
    city = serializers.CharField(max_length=30)
