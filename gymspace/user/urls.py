from django.urls import path 
from user import views
# define the urls
urlpatterns = [
    path('users/', views.UserProfileViewSet.as_view({'get': 'list'})),
    path('users/<int:pk>', views.UserProfileViewSet.as_view({'get': 'retrieve'})),
    path('users/follow/<int:pk>', views.FollowCountViewSet.as_view({'get': 'retrieve'})),
    path('users/<int:pk>/follow-count', views.FollowCountViewSet.as_view({'get': 'list'}))

]
