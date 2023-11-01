from django.urls import path
from gym import views
# define the urls
urlpatterns = [
    path('gyms-member/', views.MyGymViewSet.as_view({'get': 'list'})),
    path('gyms-member/<int:pk>', views.MyGymViewSet.as_view({'get': 'retrieve'})),

    path('gyms-button/<int:pk>', views.GymButtonViewSet.as_view({'get': 'retrieve'})),
]
