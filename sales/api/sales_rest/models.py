from django.db import models
from django.urls import reverse


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
            return self.name


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return str(self.vin)



class Customer(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length = 25)

    def __str__(self):
        return self.name

    def get_api_url(self):
        # return for encoder HREF call - reverse gives us the URL
        return reverse('api_show_customer', kwargs={"pk": self.id})


class SalesPerson(models.Model):
    name = models.CharField(max_length=50)
    employeenumber = models.IntegerField(unique=True)

    def __str__(self):
        return f'{self.name} {str(self.id)}'

    def get_api_url(self):
        
        return reverse('api_show_salesperson', kwargs={"pk": self.id})

class Sale(models.Model):

    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesperson",
        on_delete=models.PROTECT,
    )

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT,
    )

    price = models.IntegerField()
    
    def __str__(self):
        return f'{self.salesperson} {self.automobile} {self.customer} {self.price}'
    
    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.id})

    





# Create your models here.

# class BinVO(models.Model):
#     closet_name = models.CharField(max_length=100)
#     bin_number = models.PositiveSmallIntegerField(null=True)
#     bin_size = models.PositiveSmallIntegerField(null=True)
#     import_href = models.CharField(max_length=200, unique=True)

# class Shoe(models.Model):
#     manufacturer = models.CharField(max_length=200)
#     model_name = models.CharField(max_length=200)
#     color = models.CharField(max_length=200)
#     picture_url = models.URLField(null=True)
#     bin = models.ForeignKey(
#         BinVO,
#         related_name='shoes',
#         on_delete=models.CASCADE, null=True,
#     )
