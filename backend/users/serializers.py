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
    # class Meta:
    #     model = CharacterBuild
    #     fields = '__all__'
    class_name = serializers.StringRelatedField(source='first_class')  # replace 'class_field' with actual field name
    deity_name = serializers.StringRelatedField(source='deity')        # optional rename

    class Meta:
        model = CharacterBuild
        fields = ['id', 'name', 'backstory', 'class_name', 'deity_name', 'created_at', 'image']

