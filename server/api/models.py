

# Create your models here.
from django.db import models
from model_utils.models import TimeStampedModel, SoftDeletableModel


class Sucursal(models.Model, TimeStampedModel, SoftDeletableModel):
    id = models.BigAutoField(null=False, unique=True, primary_key=True)
    nombre  = models.TextField(max_length=50, null=False)
    direccion = models.TextField(max_length=100, null=False)
    telefono = models.TextField(max_length=50, null=False)
    esta_habilitado = models.BooleanField(null=False, default=False)
    ciudad = models.TextField(max_length=40)
    coord_lat = models.FloatField()
    coord_ing = models.FloatField()

    def __str__(self):
        return self.id, self.nombre, self.direccion, self.telefono, self.esta_habilitado, self.ciudad, self.coord_lat, self.coord_ing

class Auditoria(models.Model, TimeStampedModel, SoftDeletableModel):
    id = models.BigAutoField(null=False, unique=True, primary_key=True)
    sucursal_id = models.ForeignKey(Sucursal.id)
    usuario_id = models.ForeignKey(Usuario.id)
    fecha = models.DateTimeField(null=False)
    esquema = models.IntegerField(null=False)
    puntuacion = models.IntegerField(null=False)

    def __str__(self):
		return self.id, self.sucursal_id, self.usuario_id, self.fecha, self.esquema, self.puntuacion

class AuditoriaEsquema(TimeStampedModel, SoftDeletableModel):
    #Campos
    tipo =models.BigAutoField(null=False,unique=True)
    nombre = models.TextField(max_length=255)

    def __str__(self):
        return self.tipo, self.nombre

class Pregunta(TimeStampedModel, SoftDeletableModel):
    # Enum de categoria
    INFORMATIVA = 'IN'
    DIGEFE = 'DG'
    EXTRANORMATIVA = 'EX'
    CATEGORIAS = [(INFORMATIVA, 'Informativa'), (DIGEFE, 'DIGEFE'), (EXTRANORMATIVA, 'Extranormativa')]

    # Campos
    id = models.BigAutoField(null=False, unique=True)
    pregunta = models.TextField(max_length=255, null=False)
    categoria = models.CharField(max_length=2, choices=CATEGORIAS)
    esquema_id = models.ForeignKey(AuditoriaEsquema.tipo)

    def __str__(self):
        return self.id, self.pregunta, self.categoria, self.esquema_id