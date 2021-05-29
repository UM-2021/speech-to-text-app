from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models import Sucursal, Auditoria, Pregunta, Respuesta, Media ,Incidente


class SucursalTestCase(TestCase):

    def test_save(self):
        Sucursal.objects.create(nombre="Nuevo Centro",numero="10")
        self.assertIsNotNone(Sucursal.objects.get(nombre="Nuevo Centro"))
        self.assertIsNotNone(Sucursal.objects.get(numero="10"))

    def test_update(self):
        suc=Sucursal.objects.create(nombre="Nuevo Centro",numero="10")
        suc.numero = 9
        suc.save(update_fields=['numero'])
        self.assertFalse(Sucursal.objects.filter(numero="10").exists())
        self.assertIsNotNone(Sucursal.objects.get(numero="9"))


class AuditoriaTestCase(TestCase):
    def test_save(self):
        suc=Sucursal.objects.create(nombre="Nuevo Centro", numero="1")
        Auditoria.objects.create(sucursal=suc,puntuacion=0)
        self.assertIsNotNone(Auditoria.objects.get(sucursal=1))


    def test_update(self):
        suc=Sucursal.objects.create(nombre="Nuevo Centro", numero="1")
        suc.save()
        aud=Auditoria.objects.create(sucursal=suc, puntuacion=0)
        aud.puntuacion=1
        aud.save(update_fields=['puntuacion'])
        self.assertFalse(Auditoria.objects.filter(puntuacion=0).exists())
        self.assertIsNotNone(Auditoria.objects.filter(puntuacion=1))



class PreguntaTestCase(TestCase):
    def test_save(self):
        Pregunta.objects.create(pregunta="El test funciona bien?",seccion="AD",categoria="Dg",tipo="audi")
        self.assertIsNotNone(Pregunta.objects.filter(pregunta="El test funciona bien?"))
        self.assertIsNotNone(Pregunta.objects.filter(seccion="Adentro"))
        self.assertIsNotNone(Pregunta.objects.filter(categoria="DIGEFE"))
        self.assertIsNotNone(Pregunta.objects.filter(tipo="Audio"))

    def test_update(self):
        Pregunta.objects.filter(pregunta="El test funciona bien?").update(seccion="CA")
        self.assertFalse(Pregunta.objects.filter(seccion="Adentro").exists())
        self.assertFalse(Pregunta.objects.filter(seccion="Caja").exists())


class RespuestaTestCase(TestCase):
    def test_save(self):
        suc = Sucursal.objects.create(nombre="Nuevo Centro", numero="1")
        aud = Auditoria.objects.create(sucursal=suc, puntuacion=0)
        preg = Pregunta.objects.create(pregunta="El test funciona bien?",seccion="AD",categoria="dg",tipo="audi")
        usr = get_user_model().objects.create(username="Sher",email="sher@gmail.com",password="123456")
        Respuesta.objects.create(respuesta="Si anda bien",auditoria=aud,pregunta=preg,usuario=usr)
        self.assertTrue(Respuesta.objects.filter(respuesta="Si anda bien").exists())

    def test_update(self):
        suc = Sucursal.objects.create(nombre="Nuevo Centro", numero="1")
        aud = Auditoria.objects.create(sucursal=suc, puntuacion=0)
        preg = Pregunta.objects.create(pregunta="El test funciona bien?", seccion="AD", categoria="dg", tipo="audi")
        usr = get_user_model().objects.create(username="Sher",email="sher@gmail.com",password="123456")
        res = Respuesta.objects.create(respuesta="Si anda bien", auditoria=aud, pregunta=preg, usuario=usr)
        res.respuesta = 'anda mal ahora k'
        res.save(update_fields=['respuesta'])
        self.assertFalse(Respuesta.objects.filter(respuesta="Si anda bien").exists())
        self.assertIsNotNone(Respuesta.objects.get(respuesta="anda mal ahora k"))
"""
class MediaTestCase(TestCase):
    def test_save(self):
        Media.objects.create(url="/media",respuesta=1,tipo="MID",fecha_creacion='18/05/2021T22:41',fecha_modificacion='18/05/2021T22:41')
        self.assertIsNotNone(Media.objects.get(url="www.google.com"))
        self.assertIsNotNone(Media.objects.get(respuesta=1))
        self.assertIsNotNone(Media.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Media.objects.get(fecha_modificacion="18/05/2021T22:41"))

    def test_update(self):
        Media.ojects.get(url="www.google.com").update(fecha_creacion="18/05/2021T23:00")
        self.assertFalse(Media.objects.get(fecha_creacion="18/05/2021T22:41"))
        self.assertIsNotNone(Media.objects.get(fecha_creacion="18/05/2021T23:00"))


"""

class IncidenteTestCase(TestCase):
    def test_save(self):
        preg = Pregunta.objects.create(pregunta="El test funciona bien?", seccion="AD", categoria="dg", tipo="audi")
        usr = get_user_model().objects.create(username="Sher", email="sher@gmail.com", password="123456")
        usr2 = get_user_model().objects.create(username="Nacho", email="nacho@gmail.com", password="123456")
        Incidente.objects.create(reporta=usr, asignado=usr2, pregunta=preg, accion='TOMA ACCION EN INCIDENTE')
        self.assertIsNotNone(Incidente.objects.get(accion="TOMA ACCION EN INCIDENTE"))

    def test_update(self):
        preg = Pregunta.objects.create(pregunta="El test funciona bien?", seccion="AD", categoria="dg", tipo="audi")
        usr = get_user_model().objects.create(username="Sher", email="sher@gmail.com", password="123456")
        usr2 = get_user_model().objects.create(username="Nacho", email="nacho@gmail.com", password="123456")
        inc = Incidente.objects.create(reporta=usr, asignado=usr2, pregunta=preg, accion='TOMA ACCION EN INCIDENTE')
        inc.accion = 'ACCION NUEVA pa'
        inc.save(update_fields=['accion'])
        self.assertFalse(Incidente.objects.filter(accion='TOMA ACCION EN INCIDENTE').exists())
        self.assertIsNotNone(Incidente.objects.get(accion='ACCION NUEVA pa'))


class EliminarTests(TestCase):
    def test_delete(self):
        Incidente.objects.filter(accion='ACCION NUEVA pa').delete()
        self.assertFalse(Incidente.objects.filter(accion='TOMA ACCION EN INCIDENTE editado').exists())
        Respuesta.objects.filter(respuesta="si anda bien").delete()
        self.assertFalse(Respuesta.objects.filter(respuesta="si anda bien").exists())
        Pregunta.objects.filter(pregunta="El test funciona bien?").delete()
        self.assertFalse(Pregunta.objects.filter(pregunta="El test funciona bien?").exists())
        Auditoria.objects.filter(sucursal=1).delete()
        self.assertFalse(Auditoria.objects.filter(sucursal=1).exists())
        Sucursal.objects.filter(nombre="Nuevo Centro").delete()
        self.assertFalse(Sucursal.objects.filter(nombre="Nuevo Centro").exists())
        self.assertFalse(Sucursal.objects.filter(numero="9").exists())
