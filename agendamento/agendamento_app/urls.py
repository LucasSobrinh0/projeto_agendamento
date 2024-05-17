# agendamento_app/urls.py

from django.urls import path
from .views import (
    ListarClientes, CriarClientes, EditarClientes, ExcluirClientes,
    ListarAgendamentos, CriarAgendamentos, EditarAgendamentos, ExcluirAgendamentos
)

urlpatterns = [
    path('clientes/', ListarClientes.as_view(), name='listar-clientes'),
    path('clientes/novo/', CriarClientes.as_view(), name='criar-clientes'),
    path('clientes/<int:pk>/', EditarClientes.as_view(), name='editar-clientes'),
    path('clientes/<int:pk>/excluir/', ExcluirClientes.as_view(), name='excluir-clientes'),
    path('agendamentos/', ListarAgendamentos.as_view(), name='listar-agendamentos'),
    path('agendamentos/novo/', CriarAgendamentos.as_view(), name='criar-agendamentos'),
    path('agendamentos/<int:pk>/', EditarAgendamentos.as_view(), name='editar-agendamentos'),
    path('agendamentos/<int:pk>/excluir/', ExcluirAgendamentos.as_view(), name='excluir-agendamentos'),
]
