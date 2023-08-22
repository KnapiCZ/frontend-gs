from django.urls import include, path
from rest_framework import routers
from user import views
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', views.UserProfileViewSet, basename='users')
router.register(r'users-most-followed', views.MostFollowedViewSet, basename='users-most-followed')
router.register(r'follow', views.UserProfileViewSet, basename='follow')
router.register(r'follow-data', views.FollowerViewSet, basename='follow-data')
router.register(r'users-posts', views.UserPostViewSet, basename='users-posts')
router.register(r'users-small', views.SmallUserProfileViewSet, basename='users-posts')
router.register(r'users-gympage-recommended', views.RecommendedPostViewSet, basename='users-recommended')
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] +static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
