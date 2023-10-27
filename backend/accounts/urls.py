from drf_yasg import openapi

from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from django.urls import path

from .swagger import get_schema_view
from .views import SuscriberRegistrationView
schema_view = get_schema_view(
    openapi.Info(
        title="Blog API API",
        default_version='v1',
        description="Test API",
        contact=openapi.Contact(email="sjsiless@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
urlpatterns = [

    # SWAGGER URLs
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0),
         name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),

    # Accounts URLs
    path('suscriber-registration/', SuscriberRegistrationView.as_view(),
         name='suscriber_register'),
    path("login/", TokenObtainPairView.as_view(), name='token_obtain_pair'),


]
