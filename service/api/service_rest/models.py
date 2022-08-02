from dataclasses import dataclass
from django.db import models

# Create your models here.

class Technicin(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField(max_length=100)


class Appointment(models.Model):
    vin = models.CharField(max_length=100)
    owner_name = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    assigned_tech = models.ForeignKey(Technicin, on_delete=models.CASCADE)
    reason_for_appointment = models.TextField(max_length=10000)


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)

    # def get_api_url(self):
    #     return reverse("api_manufacturer", kwargs={"pk": self.id})

    def __str__(self):
        return self.name


 # this is the class that holds our inventory virtual object
 # the "automobiles" name is slightly confusing but I am
 # looking to keep the naming consistent in this project with
 # the exisiting API
class AutomobilesVO(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()

    manufacturer = models.ForeignKey(
        ManufacturerVO,
        related_name="models",
        on_delete=models.CASCADE,
    )

    # def get_api_url(self):
    #     return reverse("api_vehicle_model", kwargs={"pk": self.id})

    def __str__(self):
        return self.name
