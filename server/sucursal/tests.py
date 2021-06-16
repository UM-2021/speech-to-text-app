from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from api.models import Sucursal, Auditoria
from auditoria.serializers import AuditoriaSerializer


class SucursalesAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(username='user1', email='test@example.io', password='test123')
        self.client.force_authenticate(user=self.user)

    def test_get_auditoria_from_sucursal(self):
        sucursal = Sucursal.objects.create(nombre='Sucursal 1',
                                           numero_de_sag='123',
                                           departamento='Montevideo',
                                           barrio='Barrio 1',
                                           direccion='Direccion 1',
                                           telefono='00000000',
                                           celular='098000000',
                                           razon_social='S.A.',
                                           rut='00023423100',
                                           negocio_anexo='Anexo',
                                           tipo_de_acceso='Calle',
                                           ciudad='Montevideo')

        res1 = self.client.get(f'/api/sucursales/{sucursal.id}/auditoria/')

        # That sucursal doesn't have an auditoria neither in course nor finished.
        self.assertEquals(res1.data, {})

        # Create an auditoria for that sucursal.
        auditoria = Auditoria.objects.create(sucursal=sucursal)

        serializer = AuditoriaSerializer(auditoria, many=False)
        res2 = self.client.get(f'/api/sucursales/{sucursal.id}/auditoria/')
        self.assertEquals(res2.data, serializer.data)

        # Complete the previous auditoria and create another one.
        auditoria.finalizada = True
        auditoria.save()

        res3 = self.client.get(f'/api/sucursales/{sucursal.id}/auditoria/')
        self.assertTrue(res3.data['finalizada'])

        auditoria2 = Auditoria.objects.create(sucursal=sucursal)
        serializer2 = AuditoriaSerializer(auditoria2, many=False)
        res4 = self.client.get(f'/api/sucursales/{sucursal.id}/auditoria/')
        self.assertEquals(res4.data, serializer2.data)
