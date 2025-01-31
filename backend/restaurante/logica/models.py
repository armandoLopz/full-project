from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ComentariosDb(models.Model):

    user_fk = models.ForeignKey(User, on_delete=models.CASCADE)
    local_fk = models.ForeignKey('LocalDb', on_delete=models.CASCADE) 
    calificacion = models.IntegerField()
    descripcion =  models.CharField(max_length=1000)

    class Meta:
        db_table = "comentarios"

class LocalDb(models.Model):
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="locales")
    tipo_comida =  models.CharField(max_length=40)

    nombre = models.CharField(max_length=80)
    contacto = models.CharField(max_length=30)

    #Status del local por evaluar 

    class Meta:
        db_table = "locales"
    
    def __str__(self):
        
        return f"{self.nombre}" 

class ZonasDb(models.Model):

    local_fk = models.ForeignKey(LocalDb, on_delete=models.CASCADE, null=True)

    estado =  models.CharField(max_length=120)
    ciudad =  models.CharField(max_length=120)
    calle =  models.CharField(max_length=120)

    class Meta:
        db_table = "zonas"
    
    def __str__(self):
        
        return f"{self.estado} {self.ciudad} {self.calle}"
    
class EventoDb(models.Model):

    #local_fk = models.ForeignKey(LocalDb, on_delete=models.CASCADE)

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="eventos")
    zona = models.ManyToManyField(ZonasDb)
    nombre = models.CharField(max_length=120)  
    descripcion = models.CharField(max_length=500)

    class Meta:
        db_table = "eventos"
    
    def __str__(self):
        return self.nombre
