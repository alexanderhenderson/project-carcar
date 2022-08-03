from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Hat, LocationVO
import json

from common.json import ModelEncoder


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "id"]


class HatsListEncoder(ModelEncoder):
    model = Hat
    properties = ['fabric', 'style_name', 'color', 'picture_url', 'id']

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}


@require_http_methods(['GET', 'POST'])
def api_list_hats(request):

    if request.method == 'GET':
        
        Hats = Hat.objects.all()

        return JsonResponse(
            {"hats": Hats},
            encoder = HatsListEncoder,
        )

    else:
        content = json.loads(request.body)

        try: # test and set location if location exists in database
            # getting the numeric location ID number from the response content
            location_id = content["location"]
            # set location equal to the locationVO object that maches the id
            location = LocationVO.objects.get(id=location_id)
            # sets content location equal to the location
            content["location"] = location

        except LocationVO.DoesNotExist:
            return JsonResponse(
                {'message': 'invalid location id'},
                status = 400,
            )
        
        # if the above is successful create a new hat instance
        hat = Hat.objects.create(**content)

        return JsonResponse(
            hat,
            encoder = HatsListEncoder,
            safe = False,
        )


@require_http_methods(["DELETE"])
def api_list_hat(response, pk):

    try:
        hat = Hat.objects.get(id=pk)
        name = "Hat " + hat.style_name + " " + hat.color + " " + hat.fabric + " with ID " + str(hat.id)
        hat.delete()
        return JsonResponse(
            {"Deleted": str(name)},
            safe=False,
        )
    except Hat.DoesNotExist:
        return JsonResponse({"message": " This hat does not exist"})
        