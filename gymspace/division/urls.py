from django.urls import path
from division import views

urlpatterns = [
    
    path('gym-divisions-id/<int:pk>', views.GymDivisionsIdViewSet.as_view({'get': 'retrieve'})),
    
    path('division/<int:pk>/', views.DivisionViewSet.as_view({'get': 'retrieve'})),
    path('division/join/', views.DivisionViewSet.as_view({'patch': 'update'})),
    
    path('divisions-id/', views.DivisionsIdViewSet.as_view({'get': 'retrieve'})),
    path('divisions-id/<int:pk>', views.DivisionsIdViewSet.as_view({'get': 'retrieve'})),
    
    path('division-name/<int:pk>', views.DivisionNameViewSet.as_view({'get': 'retrieve'})),


]
