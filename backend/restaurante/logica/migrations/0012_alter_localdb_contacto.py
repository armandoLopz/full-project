# Generated by Django 5.1.1 on 2024-11-26 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('logica', '0011_remove_localdb_calificacion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localdb',
            name='contacto',
            field=models.CharField(max_length=30),
        ),
    ]
