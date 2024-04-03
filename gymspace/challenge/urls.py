from django.urls import path
from challenge import views
# define the urls
urlpatterns = [
    path('challenge-id/', views.ChallengeIdViewSet.as_view({'get': 'list'})),
    path('challenge-id/<int:pk>', views.ChallengeIdViewSet.as_view({'get': 'retrieve'})),

    path('challenge/', views.ChallengeViewSet.as_view({'get': 'retrieve'})),
    path('challengeProgress/', views.ProgressViewSet.as_view({'post': 'create'})),
    path('challengeProgress/update/', views.ProgressViewSet.as_view({'patch': 'update'})),
    path('joinChallenge/', views.ProgressCreateViewSet.as_view({'post': 'create'})),

]
