from rest_framework import serializers
from . models import *
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class Zona_serializer(serializers.ModelSerializer):

    class Meta:
        
        model = ZonasDb
        fields = ('__all__')

class Evento_serializer(serializers.ModelSerializer):

    class Meta:
        
        model = EventoDb
        fields = ('__all__')


class Comentario_serializer(serializers.ModelSerializer):

    class Meta:
        
        model = ComentariosDb
        fields = ('__all__')

class Local_serializer(serializers.ModelSerializer):

    class Meta:
        
        model = LocalDb
        fields = ('__all__')

class User_serializer(serializers.ModelSerializer):

    class Meta:
        
        model = User
        fields = ('__all__')