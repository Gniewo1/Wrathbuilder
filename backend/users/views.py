from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes


from .models import CharacterBuild, Race, Class, Alignment, Background, Deity

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

########################################## fetch names of objects #############################
def race_names(request):
    races = Race.objects.all().values('id', 'name')
    return JsonResponse(list(races), safe=False)

def class_names(request):
    classes = Class.objects.all().values('id', 'name')
    return JsonResponse(list(classes), safe=False)

def alignment_names(request):
    alignments = Alignment.objects.all().values('id', 'name')
    return JsonResponse(list(alignments), safe=False)

def background_names(request):
    backgrounds = Background.objects.all().values('id', 'name')
    return JsonResponse(list(backgrounds), safe=False)

def deity_names(request):
    deities = Deity.objects.all().values('id', 'name')
    return JsonResponse(list(deities), safe=False)


######################################### fetch one specific object given an id #########################
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



def fetch_class(request, class_id):
    # Use prefetch_related to avoid unnecessary JOINs
    class_info = get_object_or_404(Class, id=class_id)

    return JsonResponse({
        'id': class_info.id,
        'name': class_info.name,
        'description': class_info.description,
        'hit_die': class_info.hit_die,
        'skill points' : class_info.skill_points,
        'class_skills': list(class_info.class_skills.values_list('name', flat=True)),
        'allowed_alignments': list(class_info.allowed_alignments.values_list('name', flat=True))
    })


def fetch_background(request, background_id):
    # Use prefetch_related to avoid unnecessary JOINs
    background = get_object_or_404(Background, id=background_id)

    return JsonResponse({
        'id': background.id,
        'name': background.name,
        'description': background.description,
    })

def fetch_deity(request, deity_id):
    # Use prefetch_related to avoid unnecessary JOINs
    deity = get_object_or_404(Deity, id=deity_id)

    return JsonResponse({
        'id': deity.id,
        'name': deity.name,
        'allowed_alignments': list(deity.allowed_alignments.values_list('name', flat=True)),
        'description': deity.description,
        'image': deity.image.url if deity.image else None,
    })


######################## Create Character ######################
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_character_build(request):
    user = request.user
    data = request.data

    try:
        race = Race.objects.get(id=data.get('race'))
        first_class = Class.objects.get(id=data.get('first_class'))
        alignment = Alignment.objects.get(name=data.get('alignment'))
        background = Background.objects.get(id=data.get('background'))
        deity_id = data.get('deity')
        deity = Deity.objects.get(id=deity_id) if deity_id else None

        build = CharacterBuild.objects.create(
            user=user,
            name=data.get('name'),
            race=race,
            first_class=first_class,
            alignment=alignment,
            background=background,
            deity=deity,
            mythic_path=data.get('mythic_path', ''),
            backstory=data.get('backstory', '')
        )

        return Response({'message': 'Character build created successfully.', 'id': build.id}, status=status.HTTP_201_CREATED)

    except (Race.DoesNotExist, Class.DoesNotExist, Alignment.DoesNotExist, Background.DoesNotExist, Deity.DoesNotExist) as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': 'Something went wrong: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


############################# Load Characters #########################################


