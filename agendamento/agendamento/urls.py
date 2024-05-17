# agendamento/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('agendamento_app.urls')),  # Inclua as URLs do agendamento_app
]
