# Generated by Django 4.0.3 on 2022-08-02 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_rename_technicin_technician'),
    ]

    operations = [
        migrations.AlterField(
            model_name='technician',
            name='employee_number',
            field=models.IntegerField(),
        ),
    ]
