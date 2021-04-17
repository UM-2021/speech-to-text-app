from django.db import models

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

