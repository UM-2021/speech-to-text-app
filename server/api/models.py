# Create your models here.
from django.db import models
from model_utils.models import TimeStampedModel, SoftDeletableModel


class AuditoriaEsquema(TimeStampedModel, SoftDeletableModel):
    # Campos
    tipo = models.IntegerField(null=False, unique=True)
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
