from django.urls import path 
from user import views, post_views
# define the urls
urlpatterns = [
    path('users/', views.UserProfileViewSet.as_view({'get': 'list'})),
    path('users/<int:pk>', views.UserProfileViewSet.as_view({'get': 'retrieve'})),
    path('users-most-followed/<int:pk>', views.MostFollowedViewSet.as_view({'get': 'retrieve'})),
    path('follow/<int:pk>', views.UserProfileViewSet.as_view({'patch': 'update'})),
    path('follow-data/<int:pk>', views.FollowerViewSet.as_view({'post': 'create'})),
    path('users-small/<int:pk>', views.SmallUserProfileViewSet.as_view({'get': 'retrieve'})),

    path('confirm-auth/', views.ConfirmAuth.as_view({'post': 'create'})),

    path('users-posts/<int:pk>', post_views.UserPostViewSet.as_view({'get': 'retrieve'})),
    path('users-gympage-recommended/<int:pk>', post_views.RecommendedPostViewSet.as_view({'get': 'retrieve'})),
    path('users-all-posts/<int:pk>', post_views.AllUserPostsViewSet.as_view({'get': 'retrieve'})),
]
