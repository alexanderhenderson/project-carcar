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

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ['owner_name', 'vin', 'date', 'time', 'reason_for_appointment', "assigned_tech"]
    encoders = {
        "assigned_tech": TechnicianDetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):

    # test if get request
    if request.method == "GET":

        technicians = Technician.objects.all()
        return JsonResponse(
            {'technicians': technicians},
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


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):

    if request == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            appointments,
            encoder = AppointmentListEncoder,
            safe=False,
        )
    
    else:
        appointment = json.loads(request.body)
        print("Appointment json: ",appointment)

        try:
            techs = Technician.objects.get(pk=appointment.assigned_tech)
        except:
            print("Tech does not exist")
            return JsonResponse(
                {'message': 'Tech does not exist'},
                status=400
            )


@require_http_methods(["GET"])
def api_show_appointment(request, pk):
    
    appointment = Appointment.objects.get(id=pk)
    # print("appointment date: ", json.dumps(appointments[0].date, default=str))
    #print(json.dumps(appointment))

    print(" GO FUCK YOURSELF: ", appointment.assigned_tech)

    appointment.date = str(appointment.date)
    appointment.time = str(appointment.time)

    # # print(json.dumps(appointment, default=str))
    
    # # print(json.dumps(appointment))
    
    return JsonResponse(
        appointment,
        encoder = AppointmentDetailEncoder,
        safe=False,
    )
