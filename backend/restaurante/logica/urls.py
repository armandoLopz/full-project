from django.urls import path, include
from rest_framework import routers
from logica.views import *

router = routers.DefaultRouter()
router.register(r'comentarios', Comentarios_View)
router.register(r'locales', Locales_View)
router.register(r'zonas', Zonas_View)
router.register(r'eventos', Eventos_View)
router.register(r'users', User_View)

urlpatterns = [
 
    path("", include(router.urls))
    
]