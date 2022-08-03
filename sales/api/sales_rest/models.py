from django.db import models


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)



class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)



class PotentialCustomer(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length = 25)

    def __str__(self):
        return self.name


class SalesPerson(models.Model):
    name = models.CharField(max_length=50)
    employeenumber = models.IntegerField(max_length=10)

    def __str__(self):
        return self.name

class Sale(models.Model):
    price = models.IntegerField(max_length=50)

    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesperson",
        on_delete=models.PROTECT,
    )

    automobile = models.



class SalesPersonSaleHistory(models.Model):





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
