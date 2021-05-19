from django.test import TestCase

from api.models import Sucursal, Auditoria, Pregunta, Respuesta, Media ,Incidente


class SucursalTestCase(TestCase):

    def test_save(self):
        Sucursal.objects.create(nombre="Nuevo Centro",numero="10")
        self.assertIsNotNone(Sucursal.objects.get(nombre="Nuevo Centro"))
        self.assertIsNotNone(Sucursal.objects.get(numero="10"))

    def test_update(self):
        Sucursal.ojects.get(nombre="Nuevo Centro").update(numero="9")
        self.assertIsNone(Sucursal.objects.get(numero="10"))
        self.assertIsNotNone(Sucursal.objects.get(numero="9"))

    def test_delte(self):
        Sucursal.objects.delete(nombre="Nuevo Centro")
        self.assertIsNone(Sucursal.objects.get(nombre="Nuevo Centro"))
        self.assertIsNone(Sucursal.objects.get(numero="9"))



class PreguntaTestCase(TestCase):

class RespuestaTestCase(TestCase):

class MediaTestCase(TestCase):

class IncidenteTestCase(TestCase):