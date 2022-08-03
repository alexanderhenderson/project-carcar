from dataclasses import dataclass
from django.db import models
from django.urls import reverse

# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField(unique=True)

    def get_api_url(self):
        # return for encoder HREF call - reverse gives us the URL
        return reverse('api_show_technician', kwargs={"pk": self.id})
                        

    def __str__(self):
        return f'{self.name} {str(self.id)}'



class Appointment(models.Model):
    vin = models.CharField(max_length=100)
    owner_name = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    assigned_tech = models.ForeignKey(Technician, on_delete=models.PROTECT)
    reason_for_appointment = models.TextField(max_length=10000)

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.id})

 # not 100% certin this will work as a foreingkey since we are polling
 # but I am certain it to start with.
class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)


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

    def __str__(self):
        return self.name
