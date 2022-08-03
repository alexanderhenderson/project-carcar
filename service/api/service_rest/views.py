from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, Appointment

from common.json import ModelEncoder

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ['name']

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ['name', 'employee_number']

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ['owner_name', 'vin']

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):

    # test if get request
    if request.method == "GET":

        technicians = Technician.objects.all()
        return JsonResponse(
            technicians,
            encoder = TechnicianListEncoder,
            safe=False
        )

    # post request
    else:
        try:
            content = json.loads(request.body)

            technician = Technician.objects.create(**content)

            return JsonResponse(
                technician,
                encoder = TechnicianListEncoder,
                safe=False
            )

        except:
            return JsonResponse(
                {'message': 'bad post request'},
                status=400,
            )


@require_http_methods(["GET"])
def api_show_technician(request, pk):

    technician = Technician.objects.get(id=pk)
    return JsonResponse(
        technician,
        encoder=TechnicianDetailEncoder,
        safe=False,
    )


@require_http_methods(["GET"])
def api_list_appointments(request):

    appointments = Appointment.objects.all()
    return JsonResponse(
        appointments,
        encoder = AppointmentListEncoder,
        safe=False,
    )



def api_show_appointment(reqiest, pk):
    pass
