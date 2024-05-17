# agendamento_app/admin.py

from django.contrib import admin
from .models import Cliente, Agendamento

admin.site.register(Cliente)
admin.site.register(Agendamento)
