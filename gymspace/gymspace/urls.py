from django.urls import include, path
from rest_framework import routers
from user import views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', views.UserProfileViewSet, basename='users')
router.register(r'users/follow', views.FollowCountViewSet, basename='users-follow')

from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] +static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 
