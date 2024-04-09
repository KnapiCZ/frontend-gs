from django.urls import path
from gym import views
# define the urls
urlpatterns = [
    path('gym/<int:pk>/', views.GymViewSet.as_view({'get': 'retrieve'})),
    path('gym/join/', views.GymViewSet.as_view({'patch': 'update'})),
    
    path('gyms-id/', views.GymsIdViewSet.as_view({'get': 'retrieve'})),
    path('gyms-id/<int:pk>', views.GymsIdViewSet.as_view({'get': 'retrieve'})),

]
