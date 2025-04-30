from django.urls import path
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static
from .views import RegisterAPI, UserCheckView, LoginAPI, CharacterBuildCreateView, race_names, fetch_race, class_names, fetch_class, alignment_names, background_names, deity_names

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/auth/user/', UserCheckView.as_view(), name='user-check'),
    path('builds/create/', CharacterBuildCreateView.as_view(), name='create-build'),

    path('race-names/', race_names, name='race-names'),
    path('class-names/', class_names, name='class-names'),
    path('alignment-names/', alignment_names, name='alignment-names'),
    path('background-names/', background_names, name='background-names'),
    path('deity-names/', deity_names, name='deity-names'),


    path('fetch-race/<int:race_id>/', fetch_race, name='fetch-race'),
    path('fetch-class/<int:class_id>/', fetch_class, name='fetch-class'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)