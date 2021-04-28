from django.contrib import admin
from . import models


admin.site.register(models.Sucursal)
admin.site.register(models.Auditoria)
admin.site.register(models.Usuario)
admin.site.register(models.Pregunta)
admin.site.register(models.Respuesta)
