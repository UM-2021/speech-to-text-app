from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from server.storage_backends import PublicMediaStorage, PrivateMediaStorage


class Sucursal(models.Model):
    nombre = models.CharField(max_length=50)
    numero_de_sag = models.CharField(max_length=10)
    departamento = models.CharField(max_length=20)
    barrio = models.CharField(max_length=20)
    direccion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=50, unique=True)
    celular = models.CharField(max_length=50)
    razon_social = models.CharField(max_length=50)
    rut = models.CharField(max_length=12)
    negocio_anexo = models.CharField(max_length=20)
    tipo_de_acceso = models.CharField(max_length=30)
    cantidad_de_cajas = models.IntegerField
    # Campos agregados por nosotros
    ultimo_responsable = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL,
                                           null=True, blank=True, default=None, related_name='ultima_sucursal')
    esta_habilitado = models.BooleanField(default=False)
    ciudad = models.CharField(max_length=40)
    coord_lat = models.FloatField(null=True, blank=True)
    coord_lng = models.FloatField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    if settings.USE_S3:
        imagen = models.ImageField(storage=PrivateMediaStorage(), null=True, blank=True)
    else:
        imagen = models.ImageField(upload_to='audios_de_respuesta/', null=True, blank=True)

    def __str__(self):
        return f'Sucursal: {self.nombre} - {self.direccion}.'


class Auditoria(models.Model):
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    finalizada = models.BooleanField(default=False)
    digefe_aprobada = models.BooleanField(default=False)
    extra_aprobada = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sucursal.nombre} - {self.fecha_creacion.strftime('%d/%m/%Y')}"


class Pregunta(models.Model):
    pregunta = models.CharField(max_length=255)
    SECCION = [
        ('Afuera', 'Afuera'),
        ('Adentro', 'Adentro'),
        ('Caja', 'Caja')
    ]

    CATEGORIAS = [
        ('Informativa', 'Informativa'),
        ('DIGEFE', 'DIGEFE'),
        ('Extranormativa', 'Extranormativa')
    ]

    TIPOS = [
        ('Audio', 'Audio'),
        ('Numerica', 'Numerica'),
        ('Opciones', 'Opciones')
    ]
    seccion = models.CharField(max_length=7, choices=SECCION, default=SECCION[0][0])
    categoria = models.CharField(max_length=14, choices=CATEGORIAS)
    tipo = models.CharField(max_length=8, choices=TIPOS, default=TIPOS[0][0])
    respuestas_correctas = ArrayField(models.CharField(max_length=255, null=True))
    # Campos agregados por nosotros
    opciones = ArrayField(models.CharField(max_length=25), null=True, blank=True)

    def __str__(self):
        return self.pregunta


class Respuesta(models.Model):
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    usuario = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True)
    auditoria = models.ForeignKey(Auditoria, on_delete=models.CASCADE)
    respuesta = models.CharField(max_length=128, null=True, blank=True)
    notas = models.TextField(null=True, blank=True)
    """
    if settings.USE_S3:
        audio = models.FileField(storage=PublicMediaStorage(), null=True, blank=True)
    else:
        audio = models.FileField(upload_to='audios_de_respuesta/', null=True, blank=True)
    """

    # Campos agregados por nosotros
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pregunta.pregunta} - {self.respuesta}'


class Media(models.Model):
    """ Las categorias hay que cambiarlas, puse esto temporalmente"""
    TIPO = (
        ('Audio', 'Audio'),
        ('Image', 'Image')
    )

    url = models.URLField(max_length=255)
    respuesta = models.ForeignKey(Respuesta, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=5, choices=TIPO)
    # Campos agregados por nosotros
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url


class Incidente(models.Model):
    reporta = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL,null=True, related_name='incidentes_reportados')
    asignado = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL,null=True, related_name='incidentes_asignados')
    respuesta = models.ForeignKey(Respuesta, on_delete=models.CASCADE)
    accion = models.CharField(max_length=255)
    # Campos agregados por nosotros
    status = (
        ('Resuelto', 'Resuelto'),
        ('Procesando','Procesando')
        ('Pendiente', 'Pendiente'),
        ('Confirmado', 'Confirmado')

    )
    status = models.CharField(max_length=10,choices=status, default='Pendiente')
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE,null=False)


    def __str__(self):
        return self.accion, self.reporta, self.asignado, self.pregunta


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
