from django.urls import path 
from user import views
# define the urls
urlpatterns = [
    path('users/', views.UserProfileViewSet.as_view({'get': 'list'})),
    path('users/<int:pk>', views.UserProfileViewSet.as_view({'get': 'retrieve'})),
    path('users-most-followed/<int:pk>', views.MostFollowedViewSet.as_view({'get': 'retrieve'})),
    path('follow/<int:pk>', views.UserProfileViewSet.as_view({'patch': 'update'})),
    path('follow-data/<int:pk>', views.FollowerViewSet.as_view({'post': 'create'})),
]
