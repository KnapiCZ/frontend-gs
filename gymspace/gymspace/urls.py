from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from user.auth import CustomAuthToken

from user import views as user_views
from user import post_views as user_post_views

from gym import views as gym_views

from challenge import views as challenge_views

from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'users', user_views.UserProfileViewSet, basename='users')
router.register(r'users-most-followed', user_views.MostFollowedViewSet, basename='users-most-followed')
router.register(r'users-follow', user_views.UserProfileViewSet, basename='follow')
router.register(r'users-follow-data', user_views.FollowerViewSet, basename='follow-data')
router.register(r'users-small', user_views.SmallUserProfileViewSet, basename='users-posts')
router.register(r'confirm-auth', user_views.ConfirmAuth, basename='confirm-auth')
router.register(r'users-posts', user_post_views.UserPostViewSet, basename='users-posts')
router.register(r'users-gympage-recommended', user_post_views.RecommendedPostViewSet, basename='users-recommended')
router.register('users-posts-all-id', user_post_views.AllUserPostsIDViewSet, basename='all-user-posts'),
router.register('users-posts-all-detail', user_post_views.AllUserPostsDetailViewSet, basename='all-user-posts'),

router.register(r'users-posts-liked-status', user_post_views.UserPostLikedStatusViewSet, basename='users-posts-liked-status')

router.register(r'gym', gym_views.GymViewSet, basename='gym')
router.register(r'my-gyms', gym_views.MyGymsViewSet, basename='my-gyms')

router.register(r'challenge-id', challenge_views.ChallengeIdViewSet, basename='challenge')
router.register(r'challenge', challenge_views.ChallengeViewSet, basename='challenge')
router.register(r'challengeProgress', challenge_views.ProgressViewSet, basename='challenge-progress')
router.register(r'joinChallenge', challenge_views.ProgressCreateViewSeet, basename='join-challenge')



from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', CustomAuthToken.as_view()),
] +static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
