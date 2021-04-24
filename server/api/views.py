from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from api.models import Sucursal
from api.serializers import SucursalSerializer

"""
from django.core.urlresolvers import reverse_lazy

from django.views.generic import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import (
    CreateView,
    UpdateView,
    DeleteView
)

from .models import Sucursal, Auditoria, AuditoriaEsquema, Pregunta


class SucursalList(ListView):
    model = Sucursal


class SucursalDetail(DetailView):
    model = Sucursal


class SucursalCreation(CreateView):
    model = Sucursal
    success_url = reverse_lazy('sucursal:list')
    fields = ['nombre', 'direccion', 'telefono', 'esta_habilitado', 'ciudad', 'coord_lat', 'coord_ing']


class SucursalUpdate(UpdateView):
    model = Sucursal
    success_url = reverse_lazy('sucursal:list')
    fields = ['nombre', 'direccion', 'telefono', 'esta_habilitado', 'ciudad', 'coord_lat', 'coord_ing']


class SucursalDelete(DeleteView):
    model = Sucursal
    success_url = reverse_lazy('sucursal:list')


class AuditoriaList(ListView):
    model = Auditoria


class AuditoriaDetail(DetailView):
    model = Auditoria


class AuditoriaCreation(CreateView):
    model = Auditoria
    success_url = reverse_lazy('auditoria:list')
    fields = ['sucursal_id', 'usuario_id', 'fecha', 'esquema', 'puntuacion']


class AuditoriaUpdate(UpdateView):
    model = Auditoria
    success_url = reverse_lazy('auditoria:list')
    fields = ['sucursal_id', 'usuario_id', 'fecha', 'esquema', 'puntuacion']


class AuditoriaDelete(DeleteView):
    model = Auditoria
    success_url = reverse_lazy('auditoria:list')


class AuditoriaEsquemaList(ListView):
    model = AuditoriaEsquema


class AuditoriaEsquemaDetail(DetailView):
    model = AuditoriaEsquema


class AuditoriaEsquemaCreation(CreateView):
    model = AuditoriaEsquema
    success_url = reverse_lazy('auditoria_esquema:list')
    fields = ['tipo', 'nombre']


class AuditoriaEsquemaUpdate(UpdateView):
    model = AuditoriaEsquema
    success_url = reverse_lazy('auditoria_esquema:list')
    fields = ['tipo', 'nombre']


class AuditoriaEsquemaDelete(DeleteView):
    model = AuditoriaEsquema
    success_url = reverse_lazy('auditoria_esquema:list')


class PreguntaList(ListView):
    model = Pregunta


class PreguntaDetail(DetailView):
    model = Pregunta


class PreguntaCreation(CreateView):
    model = Pregunta
    success_url = reverse_lazy('pregunta:list')
    fields = ['pregunta', 'categoria', 'esquema_id']


class PreguntaUpdate(UpdateView):
    model = Pregunta
    success_url = reverse_lazy('pregunta:list')
    fields = ['pregunta', 'categoria', 'esquema_id']


class PreguntaDelete(DeleteView):
    model = Pregunta
    success_url = reverse_lazy('pregunta:list')

"""


def hello(request):
    text = """<h1>welcome to my app !</h1>"""
    from api.serializers import AuditoriaEsquemaSerializer
    serializer = AuditoriaEsquemaSerializer()
    print(repr(serializer))
    return HttpResponse(serializer)


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
    mixins.DestroyModelMixin,
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
