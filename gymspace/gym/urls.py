from django.urls import path
from gym import views
# define the urls
urlpatterns = [
    path('gym/<int:pk>/', views.GymViewSet.as_view({'get': 'retrieve'})),
    path('gym/join/<int:pk>/', views.GymViewSet.as_view({'patch': 'update'})),
    
    path('my-gyms/', views.MyGymsViewSet.as_view({'get': 'retrieve'})),
]
