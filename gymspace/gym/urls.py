from django.urls import path 
from gym import views
# define the urls
urlpatterns = [
    path('gyms-member/', views.GymViewSet.as_view({'get': 'list'})),
    path('gyms-member/<int:pk>', views.GymViewSet.as_view({'get': 'retrieve'})),
]
