# agendamento_app/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cliente, Agendamento

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class AgendamentoSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all(), required=False)
    data_hora = serializers.DateTimeField(required=False)

    class Meta:
        model = Agendamento
        fields = '__all__'