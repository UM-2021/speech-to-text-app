from django.conf.urls import url, include
from django.contrib import admin

from .views import (
    AuditoriaEsquemaList,
    AuditoriaEsquemaCreation,
    AuditoriaEsquemaDetail,
    AuditoriaEsquemaUpdate,
    AuditoriaEsquemaDelete,
    PreguntaList,
    PreguntaCreation,
    PreguntaDetail,
    PreguntaUpdate,
    PreguntaDelete,
)

urlpatterns = [

    url(r'^$', AuditoriaEsquemaList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)$', AuditoriaEsquemaDetail.as_view(), name='detail'),
    url(r'^nuevo$', AuditoriaEsquemaCreation.as_view(), name='new'),
    url(r'^editar/(?P<pk>\d+)$', AuditoriaEsquemaUpdate.as_view(), name='edit'),
    url(r'^borrar/(?P<pk>\d+)$', AuditoriaEsquemaDelete.as_view(), name='delete'),

    url(r'^$', PreguntaList.as_view(), name='list'),
    url(r'^(?P<pk>\d+)$', PreguntaDetail.as_view(), name='detail'),
    url(r'^nuevo$', PreguntaCreation.as_view(), name='new'),
    url(r'^editar/(?P<pk>\d+)$',PreguntaUpdate.as_view(), name='edit'),
    url(r'^borrar/(?P<pk>\d+)$', PreguntaDelete.as_view(), name='delete'),

]