# Generated by Django 5.0.6 on 2024-05-28 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agendamento_app', '0002_remove_agendamento_administrador'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='telefone',
            field=models.CharField(max_length=15),
        ),
    ]