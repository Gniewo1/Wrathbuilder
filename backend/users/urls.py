from django.urls import path
from knox import views as knox_views
from django.conf import settings
from django.conf.urls.static import static
from .views import RegisterAPI, UserCheckView, LoginAPI, CharacterBuildCreateView, race_names, class_list, fetch_race

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/auth/user/', UserCheckView.as_view(), name='user-check'),
    path('builds/create/', CharacterBuildCreateView.as_view(), name='create-build'),
    path('race-names/', race_names, name='race-names'),
    path('classes/', class_list, name='class-list'),
    path('fetch-race/<int:race_id>/', fetch_race, name='fetch-race'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)