    from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Sucursal(models.Model):
    nombre = models.CharField(max_length=50)
    numero = models.CharField(max_length=10)
    departamento = models.CharField(max_length=20)
    bardrio = models.CharField(max_length=20)
    direccion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=50, unique=True)
    celular = models.CharField(max_length=50)
    razon_social = models.CharField(max_length=50)
    rut = models.CharField(max_length=12)
    negocio_anexo = models.CharField(max_length=20)
    tipo_de_acceso = models.CharField(max_length=30)
    cantidad_de_cajas = models.IntegerField
    # Campos agregados por nosotros
    esta_habilitado = models.BooleanField(default=False)
    ciudad = models.CharField(max_length=40)
    coord_lat = models.FloatField(null=True)
    coord_lng = models.FloatField(null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Sucursal: {self.nombre} - {self.direccion}.'


class Auditoria(models.Model):
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    puntuacion = models.IntegerField(null=True, blank=True, default=0)
    finalizada = models.BooleanField(default=False)
    # Campos agregados por nosotros
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.sucursal.nombre} - {self.fecha_creacion.strftime('%d/%m/%Y')}"


class Pregunta(models.Model):
    pregunta = models.CharField(max_length=255)
    SECCION = [
        ('AF', 'Afuera'),
        ('AD', 'Adentro'),
        ('CA', 'Caja')
    ]

    CATEGORIAS = [
        ('IN', 'Informativa'),
        ('DG', 'DIGEFE'),
        ('EX', 'Extranormativa')
    ]

    TIPOS = [
        ('audi', 'Audio'),
        ('nume', 'Numerica'),
        ('opci', 'Opciones')
    ]
    seccion= models.CharField(max_length=2,choices=SECCION,default=SECCION[0][0])
    categoria = models.CharField(max_length=2, choices=CATEGORIAS)
    tipo = models.CharField(max_length=4, choices=TIPOS, default=TIPOS[0][0])
    respuesta_ok = models.CharField(max_length=255, null=True)
    # Campos agregados por nosotros
    opciones = ArrayField(models.CharField(max_length=25), null=True, blank=True)

    def __str__(self):
        return self.pregunta


class Respuesta(models.Model):
    respuesta = models.CharField(max_length=128)
    notas = models.TextField(max_length=256, null=True, blank=True)
    auditoria = models.ForeignKey(Auditoria, on_delete=models.CASCADE)
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    audio = models.FileField(upload_to='audios_de_respuesta/', null=True, blank=True)
    # Campos agregados por nosotros
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pregunta.pregunta} - {self.respuesta}'


class Media(models.Model):
    """ Las categorias hay que cambiarlas, puse esto temporalmente"""
    JUNIOR = 'JR'
    MID_LEVEL = 'MID'
    SENIOR = 'SR'
    LEVEL = (
        (JUNIOR, 'Junior'),
        (MID_LEVEL, 'Mid-level'),
        (SENIOR, 'Senior')
    )

    url = models.URLField(max_length=255)
    respuesta = models.ForeignKey(Respuesta, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=3, choices=LEVEL)
    # Campos agregados por nosotros
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url


class Incidente(models.Model):
    reporta = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='reportado')
    asignado = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    accion = models.CharField(max_length=255)

    def __str__(self):
        return self.accion, self.reporta, self.asignado, self.pregunta


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
