from django.shortcuts import render

from .serializers import CustomUserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class SuscriberRegistrationView(APIView):
    """
    Allows users to register in the system
    """
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'username', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING),
                'username': openapi.Schema(type=openapi.TYPE_STRING),
                'password': openapi.Schema(type=openapi.TYPE_STRING),
            },
        )
    )
    def post(self, request):
        data = request.data.copy()
        data['user_type'] = 'suscriber'
        serializer = CustomUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'messsage': 'Completed'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)
