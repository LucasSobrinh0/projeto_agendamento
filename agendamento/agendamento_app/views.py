# agendamento_app/views.py

from rest_framework import generics
from .serializers import ClienteSerializer, AgendamentoSerializer
from .models import Cliente, Agendamento
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class BaseClienteView(generics.GenericAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class ListarClientes(BaseClienteView, generics.ListAPIView):
    pass

class CriarClientes(BaseClienteView, generics.CreateAPIView):
    pass

class EditarClientes(BaseClienteView, generics.RetrieveUpdateAPIView):
    pass

class ExcluirClientes(BaseClienteView, generics.DestroyAPIView):
    pass

class BaseAgendamentoView(generics.GenericAPIView):
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class ListarAgendamentos(BaseAgendamentoView, generics.ListAPIView):
    pass

class CriarAgendamentos(BaseAgendamentoView, generics.CreateAPIView):
    pass

class EditarAgendamentos(BaseAgendamentoView, generics.RetrieveUpdateAPIView):
    pass

class ExcluirAgendamentos(BaseAgendamentoView, generics.DestroyAPIView):
    pass
