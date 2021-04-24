from django.shortcuts import render

# Create your views here.

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
