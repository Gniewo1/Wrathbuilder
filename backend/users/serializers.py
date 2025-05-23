from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CharacterBuild


User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    

class CharacterBuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharacterBuild
        fields = '__all__'

