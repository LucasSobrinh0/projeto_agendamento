# agendamento_app/models.py

from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14)
    telefone = models.CharField(max_length=14)
    data_nascimento = models.DateField()
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name_plural = 'Clientes'

class Agendamento(models.Model):
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    data_hora = models.DateTimeField()
    observacoes = models.TextField(blank=True, null=True)
    administrador = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.cliente.nome} - {self.data_hora.strftime('%Y-%m-%d %H:%M')}"
    
    class Meta:
        verbose_name_plural = 'Agendamentos'
