from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from api.models import Sucursal, Auditoria
from .serializers import SucursalSerializer


class SucursalViewSet(viewsets.ModelViewSet):
    """
    Un ejemplo de una ViewSet para ver, crear, editar y eliminar Sucursales.

    Comenté todo lo anterior porque esta clase es una gran simplificacion de mucho codigo de arriba.

    Para entender como se hace toda esta magia en tan pocas lineas de código, recomiendo leer lo siguiente:
    Primero esto: https://www.django-rest-framework.org/api-guide/generic-views/
    Segundo esto: https://www.django-rest-framework.org/api-guide/viewsets/

    Pero en criollo, las funciones predeterminadas para un modelo simple (CRUD), se pueden heredar de una combinacion
    particular de clases.
    Siempre se tiene que heredar de GenericAPIView, pero si junto GenericAPIView se hereda tambien de ListModelMixin,
    Se tiene la funcionalidad de llamar un GET para obtener todos los objetos guardados del modelo.
    Lo que es una ModelViewSet es una combinacion de varias MixinClasses, mas particularmente:
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyM odelMixin,
    mixins.ListModelMixin,
    y
    GenericViewSet

    Y esta hecho de forma generica, nosotros solo le pasamos el queryset y el serializer y se puede inferir el resto.

    Yo mañana explico mejor igual, pero de todas formas, lo mejor va a estar explicado en los links que les pase,
    lo lei de ahi y a huevo se entiende.

    Es probable que en el futuro tengamos que meter mano aca, modificar las manera que se crea o edita un modelo,
    pero para arrancar esta bien.
    """
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer

    """
    def get_ordering(self):
        ultimasAuditorias=Auditoria.objects.orderby('-fecha_modificacion')[:10]
        sucursales_id= ultimasAuditorias

        ordering=self.request.GET.get('ordering','') 
    """