from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from datetime import datetime

from .models import Technician, Appointment, AutomobilesVO

from common.json import ModelEncoder

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ['name','id']

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ['name', 'employee_number']

class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = ['owner_name', 'vin', 'date', 'time', 'reason_for_appointment', "completed", "assigned_tech", ]
    encoders = {
        "assigned_tech": TechnicianDetailEncoder(),
    }

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = ['owner_name', 'vin', 'date', 'time', 'reason_for_appointment', "assigned_tech"]
    encoders = {
        "assigned_tech": TechnicianDetailEncoder(),
    }

class VinListEncoder(ModelEncoder):
    model = AutomobilesVO
    properties = ['vin']

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

    if request.method == "GET":
        appointments = Appointment.objects.all()

        # converting datetime objects into string for json
        index = 0
        for appointment in appointments:            
            appointments[index].time = str(appointment.time)
            appointments[index].date = str(appointment.date)
            # print(appointments[index].time)
            # print(appointments[index].date)
            index += 1

        return JsonResponse(
            {'appointments': appointments},
            encoder = AppointmentListEncoder,
            safe=False,
        )
    
    else:
        appointment = json.loads(request.body)
        print("Appointment tech json: ",appointment['assigned_tech'])

        try:
            tech = Technician.objects.get(id=appointment['assigned_tech'])
            appointment["assigned_tech"] = tech
        except:
            return JsonResponse(
                {'error': 'Tech does not exist'},
                status=400
            )

        # unessisary date and time conversion - appointment no longer serializable
        # appointment['date'] = datetime.strptime(appointment['date'], '%Y-%m-%d').date()
        # appointment['time'] = datetime.strptime(appointment['time'],'%X').time()
        # print("Corrected date object:", appointment['date'], 'is of type: ', type(appointment['date']))
        # print("Corrected date object:", appointment['time'], 'is of type: ', type(appointment['time']))
        
        try:
            new_appointment = Appointment.objects.create(**appointment)
            return JsonResponse(
                new_appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
                )
        except:
            return JsonResponse(
                {'error': 'failed to create appointment'},
                status=400
            )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointment(request, pk):
    
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)

        appointment.date = str(appointment.date)
        appointment.time = str(appointment.time)

        # print(json.dumps(appointment, default=str))
        
        # print(json.dumps(appointment))
        
        return JsonResponse(
            appointment,
            encoder = AppointmentDetailEncoder,
            safe=False,
        )
    else:

        try:
            Appointment.objects.filter(id=pk).delete()
            return JsonResponse(
            {"Message": f'Successfully deleted appointment of primary key ${pk}'}
            )
        except:
            return JsonResponse(
            {"Error": "Failed to delete appointment, appointment may not exist"}
            )



@require_http_methods({"GET"})
def api_list_vins(request):

    vins = AutomobilesVO.objects.all()

    return JsonResponse(
        {"vins": vins},
        encoder = VinListEncoder,
        safe = False
    )