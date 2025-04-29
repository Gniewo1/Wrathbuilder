from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .models import CharacterBuild, Race, Class

from .serializers import CharacterBuildSerializer



class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": {
                "username": user.username,
                "email": user.email
            }
        })
    
class LoginAPI(KnoxLoginView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)
    
class UserCheckView(APIView):
    permission_classes = [IsAuthenticated]  # Only allow authenticated users

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        })
    
class CharacterBuildCreateView(generics.CreateAPIView):
    queryset = CharacterBuild.objects.all()
    serializer_class = CharacterBuildSerializer
    permission_classes = [IsAuthenticated]

def race_names(request):
    races = Race.objects.all().values('id', 'name')
    return JsonResponse(list(races), safe=False)

## Fetch one selected race info
def fetch_race(request, race_id):
    
    race = get_object_or_404(Race, id=race_id)
    
    return JsonResponse({
        'id': race.id,
        'name': race.name,
        'description': race.description,
        'strength_bonus': race.strength_bonus,
        'dexterity_bonus': race.dexterity_bonus,
        'constitution_bonus': race.constitution_bonus,
        'intelligence_bonus': race.intelligence_bonus,
        'wisdom_bonus': race.wisdom_bonus,
        'charisma_bonus': race.charisma_bonus,
        'choose_bonus': race.choose_bonus,
        'image': race.image.url if race.image else None,
    })

def class_list(request):
    # Use prefetch_related to avoid unnecessary JOINs
    classes = Class.objects.prefetch_related('class_skills', 'allowed_alignments').all()

    class_data = []
    for class_obj in classes:
        class_data.append({
            'id': class_obj.id,
            'name': class_obj.name,
            'hit_die': class_obj.hit_die,
            'skill_points': class_obj.skill_points,
            'class_skills': [skill.name for skill in class_obj.class_skills.all()],  # Assuming class_skills has 'name'
            'allowed_alignments': [alignment.name for alignment in class_obj.allowed_alignments.all()]  # Assuming allowed_alignments has 'name'
        })
    
    return JsonResponse(class_data, safe=False)