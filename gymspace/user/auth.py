from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from rest_framework.permissions import AllowAny


class CustomAuthToken(ObtainAuthToken):
    permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data['user']
        token,created=Token.objects.get_or_create(user=user)
        response =  Response({
            "user_id": user.id,
        })
        response.set_cookie(key="auth_token",
                            value=f"{token}",
                            httponly=True,
                            max_age=3600,
                            samesite='None',
                            secure=True,
                            )

        return response
