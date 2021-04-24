from django.db import models
from audio import speech_to_text


class Sucursal(models.Model):
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=50, unique=True)
    esta_habilitado = models.BooleanField(default=False)
    ciudad = models.CharField(max_length=40)
    coord_lat = models.FloatField(null=True)
    coord_lng = models.FloatField(null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f'Sucursal: {self.nombre} - {self.direccion}.'


class AuditoriaEsquema(models.Model):
    nombre = models.TextField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    """Creo que tipo no deberia ir, cada "tipo" de Auditoria esquema es una AuditoriaEsquema, es decir una 
    AuditoriaEsquema con un ID distinto"""
    tipo = models.IntegerField()

    def __str__(self):
        return str(self.id)


class Usuario(models.Model):
    nombre = models.TextField(max_length=60)
    apellido = models.TextField(max_length=60)
    fecha_de_nacimiento = models.DateTimeField()
    email = models.EmailField(max_length=254)
    esta_habilitado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    """ Las categorias hay que cambiarlas, puse esto temporalmente"""
    JUNIOR = 'JR'
    MID_LEVEL = 'MID'
    SENIOR = 'SR'
    LEVEL = (
        (JUNIOR, 'Junior'),
        (MID_LEVEL, 'Mid-level'),
        (SENIOR, 'Senior')
    )
    categoria = models.CharField(max_length=3, choices=LEVEL)


class Auditoria(models.Model):
    sucursal_id = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    usuario_id = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    esquema = models.ForeignKey(AuditoriaEsquema, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    puntuacion = models.IntegerField(null=True)  # Cuando se crea la auditoria pero todavia no se tiene el puntaje, null

    def __str__(self):
        return f"Auditoria con ID: {self.id} de la sucursal con ID: {self.sucursal_id}."


class Pregunta(models.Model):
    pregunta = models.CharField(max_length=255)
    esquema_id = models.ForeignKey(AuditoriaEsquema, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    INFORMATIVA = 'IN'
    DIGEFE = 'DG'
    EXTRANORMATIVA = 'EX'
    CATEGORIAS = [
        (INFORMATIVA, 'Informativa'),
        (DIGEFE, 'DIGEFE'),
        (EXTRANORMATIVA, 'Extranormativa')
    ]

    categoria = models.CharField(max_length=2, choices=CATEGORIAS)

    def save(self, *args, **kwargs):
        if self.audio is not None:
            self.pregunta = speech_to_text.get_transcription(self.audio)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.pregunta


class Respuesta(models.Model):
    texto = models.TextField(max_length=255)
    auditoria_id = models.ForeignKey(Auditoria, on_delete=models.CASCADE)
    pregunta_id = models.ForeignKey(Pregunta, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    """ Las categorias hay que cambiarlas, puse esto temporalmente"""
    JUNIOR = 'JR'
    MID_LEVEL = 'MID'
    SENIOR = 'SR'
    LEVEL = (
        (JUNIOR, 'Junior'),
        (MID_LEVEL, 'Mid-level'),
        (SENIOR, 'Senior')
    )
    validez = models.CharField(max_length=3, choices=LEVEL)

    def __str__(self):
        return self.texto


class Media(models.Model):
    url = models.URLField(max_length=255)
    respuesta_id = models.ForeignKey(Respuesta, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    """ Las categorias hay que cambiarlas, puse esto temporalmente"""
    JUNIOR = 'JR'
    MID_LEVEL = 'MID'
    SENIOR = 'SR'
    LEVEL = (
        (JUNIOR, 'Junior'),
        (MID_LEVEL, 'Mid-level'),
        (SENIOR, 'Senior')
    )
    tipo = models.CharField(max_length=3, choices=LEVEL)

    def __str__(self):
        return self.url
