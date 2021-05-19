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


class AuditoriaTestCase(TestCase):
    def test_save(self):
        Auditoria.objects.create(sucursal=1,fecha_creacion='18/05/2021T22:41',fecha_modificacion='18/05/2021T22:41')
        self.assertIsNotNone(Auditoria.objects.get(sucursal=1))
        self.assertIsNotNone(Auditoria.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Auditoria.objects.get(fecha_modificacion="18/05/2021T22:41"))

    def test_update(self):
        Auditoria.ojects.get(sucursal=1).update(fecha_creacion="18/05/2021T23:00")
        self.assertIsNone(Auditoria.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Auditoria.objects.get(fecha_creacion="18/05/2021T23:00"))



class PreguntaTestCase(TestCase):
    def test_save(self):
        Pregunta.objects.create(pregunta="El test funciona bien?",seccion="Adentro",categoria="DIGEFE",tipo="Audio")
        self.assertIsNotNone(Pregunta.objects.get(pregunta="El test funciona bien?"))
        self.assertIsNotNone(Pregunta.objects.get(seccion="Adentro"))
        self.assertIsNotNone(Pregunta.objects.get(categoria="DIGEFE"))
        self.assertIsNotNone(Pregunta.objects.get(tipo="Audio"))

    def test_update(self):
        Pregunta.ojects.get(pregunta="El test funciona bien?").update(seccion="Caja")
        self.assertIsNone(Pregunta.objects.get(seccion="Adentro"))
        self.assertIsNotNone(Pregunta.objects.get(seccion="Caja"))


class RespuestaTestCase(TestCase):
    def test_save(self):
        Respuesta.objects.create(respuesta="Si anda bien",auditoria=1,pregunta=1,usuario=1,fecha_creacion='18/05/2021T22:41',fecha_modificacion='18/05/2021T22:41')
        self.assertIsNotNone(Respuesta.objects.get(respuesta="si anda bien"))
        self.assertIsNotNone(Respuesta.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Respuesta.objects.get(fecha_modificacion="18/05/2021T22:41"))

    def test_update(self):
        Respuesta.ojects.get(respuesta="Si anda bien").update(fecha_creacion="18/05/2021T23:00")
        self.assertIsNone(Respuesta.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Respuesta.objects.get(fecha_creacion="18/05/2021T23:00"))


class MediaTestCase(TestCase):
    def test_save(self):
        Media.objects.create(url="www.google.com",respuesta=1,tipo="MID",fecha_creacion='18/05/2021T22:41',fecha_modificacion='18/05/2021T22:41')
        self.assertIsNotNone(Media.objects.get(url="www.google.com"))
        self.assertIsNotNone(Media.objects.get(respuesta=1))
        self.assertIsNotNone(Media.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Media.objects.get(fecha_modificacion="18/05/2021T22:41"))

    def test_update(self):
        Media.ojects.get(url="www.google.com").update(fecha_creacion="18/05/2021T23:00")
        self.assertIsNone(Media.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Media.objects.get(fecha_creacion="18/05/2021T23:00"))



class IncidenteTestCase(TestCase):
    def test_save(self):
        Incidente.objects.create(reporta=1, asignado=1, pregunta=1, accion='TOMA ACCION EN INCIDENTE')
        self.assertIsNotNone(Incidente.objects.get(reporta=1))
        self.assertIsNotNone(Incidente.objects.get(asignado=1))
        self.assertIsNotNone(Incidente.objects.get(pregunta=1))
        self.assertIsNotNone(Incidente.objects.get(accion="TOMA ACCION EN INCIDENTE"))

    def test_update(self):
        Incidente.ojects.get(accion='TOMA ACCION EN INCIDENTE').update(accion='TOMA ACCION EN INCIDENTE editado')
        self.assertIsNone(Incidente.objects.get(accion='TOMA ACCION EN INCIDENTE'))
        self.assertIsNotNone(Incidente.objects.get(accion='TOMA ACCION EN INCIDENTE editado'))


class EliminarTests(TestCase):
    def test_delete(self):
        Incidente.objects.delete(accion='TOMA ACCION EN INCIDENTE editado')
        self.assertIsNone(Incidente.objects.get(accion='TOMA ACCION EN INCIDENTE editado'))
        Media.objects.delete(url="www.google.com")
        self.assertIsNone(Media.objects.get(url="www.google.com"))
        Respuesta.objects.delete(respuesta="si anda bien")
        self.assertIsNone(Respuesta.objects.get(respuesta="si anda bien"))
        Pregunta.objects.delete(pregunta="El test funciona bien?")
        self.assertIsNone(Pregunta.objects.get(pregunta="El test funciona bien?"))
        Auditoria.objects.delete(sucursal=1)
        self.assertIsNone(Auditoria.objects.get(sucursal=1))
        Sucursal.objects.delete(nombre="Nuevo Centro")
        self.assertIsNone(Sucursal.objects.get(nombre="Nuevo Centro"))
        self.assertIsNone(Sucursal.objects.get(numero="9"))
