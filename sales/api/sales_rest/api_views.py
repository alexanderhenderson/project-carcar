from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Sale, AutomobileVO, Customer, SalesRep
import json

from common.json import ModelEncoder




class SalesRepEncoder(ModelEncoder):
    model = SalesRep
    properties = ['id','name', 'employeenumber']


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ['id','name','address','phone']


class CustomerList(ModelEncoder):
    model = Customer
    properties = ["id", "name"]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["id", "vin"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "salesrep",
        
        "customer",
        "automobile",
    ]
    encoders = {
        "salesrep": SalesRepEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

    # def get_extra_data(self, o):
    #     return {
    #         "salesrep": o.salesrep.name,
    #         "employeenumber": o.salesrep.employeenumber,
    #         "customer": o.customer.name,
    #         "automobile": o.automobile.vin,
    #         }






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
        # try:
            
            content = json.loads(request.body)

            
            salesrep = SalesRep.objects.get(id = content["salesrep"])
            content["salesrep"] = salesrep
            print(content["salesrep"])

            # employeenumber = SalesRep.objects.get(id = content["employeenumber"])
            # content["employeenumber"] = employeenumber

            customer = Customer.objects.get(id = content["customer"])
            print(content)
            content["customer"] = customer

            automobile = AutomobileVO.objects.get(id = content["automobile"])
            print(content)
            content["automobile"] = automobile

            sale = Sale.objects.create(**content)
            print("content", content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        

            
@require_http_methods(["GET", "POST"])
def api_list_salesrep(request):
    if request.method == "GET":
        

        salesrep = SalesRep.objects.all()
        return JsonResponse(
            {"salesrep": salesrep},
            encoder=SalesRepEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salesrep = SalesRep.objects.create(**content)
            return JsonResponse(
                salesrep,
                encoder=SalesRepEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesrep"}
            )
            response.status_code = 400
            return response

@require_http_methods(['DELETE', 'PUT', 'GET'])
def api_salesrep(request, pk):
    if request.method == "GET":
        try:
            salesrep = SalesRep.objects.get(id=pk)
            return JsonResponse(
                salesrep,
                encoder=SalesRepEncoder,
                safe=False,
            )
        except salesrep.DoesNotExist:
            response = JsonResponse({'message': 'Does not exist'})
            response.status_code=404
            return response
    elif request.method == "DELETE":
        try:
            salesrep = SalesRep.objects.get(id=pk)
            salesrep.delete()
            return JsonResponse(
                salesrep,
                encoder=SalesRepEncoder,
                safe=False,
            )
        except salesrep.DoesNotExist:
            return JsonResponse({'message': 'Does not exist'})
    else:
        try:
            content = json.loads(request.body)
            SalesRep.objects.filter(id=pk).update(**content)
            salesrep = SalesRep.objects.get(id=pk)
            return JsonResponse(
                salesrep,
                encoder=SalesRepEncoder,
                safe=False,
            )
        except salesrep.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_salesrep(request):
    if request.method == "GET":
        

        salesrep = SalesRep.objects.all()
        return JsonResponse(
            {"salesrep": salesrep},
            encoder=SalesRepEncoder,
            safe=False,
        )
    else:
        try:
            content = json.loads(request.body)
            salesrep = SalesRep.objects.create(**content)
            return JsonResponse(
                salesrep,
                encoder=SalesRepEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesrep"}
            )
            response.status_code = 400
            return response

        