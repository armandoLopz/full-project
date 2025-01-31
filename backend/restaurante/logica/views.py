from django.shortcuts import render
from rest_framework import viewsets
from . serializer import *
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# Create your views here.

class User_View(viewsets.ModelViewSet):

    serializer_class = User_serializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        
        password = make_password(serializer.validated_data['password'])
        
        serializer.save(password=password)

class Comentarios_View(viewsets.ModelViewSet):

    serializer_class = Comentario_serializer
    queryset = ComentariosDb.objects.all()

class Zonas_View(viewsets.ModelViewSet):

    serializer_class = Zona_serializer
    queryset = ZonasDb.objects.all()

class Locales_View(viewsets.ModelViewSet):

    serializer_class = Local_serializer
    queryset = LocalDb.objects.all()

class Eventos_View(viewsets.ModelViewSet):

    serializer_class = Evento_serializer
    queryset = EventoDb.objects.all()