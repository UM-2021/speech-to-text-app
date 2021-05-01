# Generated by Django 2.2.14 on 2021-04-24 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sucursal',
            old_name='coord_ing',
            new_name='coord_lng',
        ),
        migrations.AlterField(
            model_name='sucursal',
            name='ciudad',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='sucursal',
            name='direccion',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='sucursal',
            name='nombre',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='sucursal',
            name='telefono',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
