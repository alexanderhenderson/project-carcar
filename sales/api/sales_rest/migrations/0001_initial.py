# Generated by Django 4.0.3 on 2022-08-03 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='ManufacturerVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='SalesPerson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('employeenumber', models.IntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField(max_length=50)),
                ('automobile', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='automobile', to='sales_rest.automobilevo')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='customer', to='sales_rest.customer')),
                ('salesperson', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='salesperson', to='sales_rest.salesperson')),
            ],
        ),
    ]