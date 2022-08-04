from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Sale, AutomobileVO, Customer, SalesPerson
import json

from common.json import ModelEncoder



class CustomerList(ModelEncoder):
    model = Customer
    properties = ["name"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "salesperson",
        "employeenumber",
        "customer",
        "automobile",
    ]
    def get_extra_data(self, o):
        return {
            "salesperson": o.salesperson.name,
            "employeenumber": o.salesperson.employeenumber,
            "customer": o.customer.name,
            "automobile": o.automobile.vin,
            }    

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = ['name', 'employeenumber',]

   

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ['name','address','phone']



# class AutomobileVOEncoder(ModelEncoder):


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response




@require_http_methods(['GET', 'POST'])
def api_list_sales(request):

    if request.method == 'GET':
        
        sales = Sale.objects.all()

        return JsonResponse(
            {"sales": sales},
            encoder = SaleEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sale"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_list_customers(request):

    # test if get request
    if request.method == "GET":

        customers = Customer.objects.all()
        return JsonResponse(
            {'customers': customers},
            encoder = CustomerEncoder,
            safe=False
        )

    # post request
    else:
        try:
            content = json.loads(request.body)

            customer = Customer.objects.create(**content)

            return JsonResponse(
                customer,
                encoder = CustomerEncoder,
                safe=False
            )

        except:
            return JsonResponse(
                {'message': 'bad post request'},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "GET":
        salesperson = SalesPerson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalesPersonEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"},
                status = 400,
            )
            return response
            





# @require_http_methods(["DELETE"])
# def api_list_hat(response, pk):

#     try:
#         hat = Hat.objects.get(id=pk)
#         name = "Hat " + hat.style_name + " " + hat.color + " " + hat.fabric + " with ID " + str(hat.id)
#         hat.delete()
#         return JsonResponse(
#             {"Deleted": str(name)},
#             safe=False,
#         )
#     except Hat.DoesNotExist:
#         return JsonResponse({"message": " This hat does not exist"})
        