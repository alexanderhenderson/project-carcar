from django.urls import path

from .views import api_list_technicians, api_show_technician, api_list_appointments, api_show_appointment, api_list_vins

urlpatterns = [
    
    path('technicians/', api_list_technicians, name="api_list_technicians"),
    path('technician/<int:pk>', api_show_technician, name="api_show_technician"),

    path('appointments/', api_list_appointments, name="api_list_appointments"),
    path('appointment/<int:pk>', api_show_appointment, name="api_show_appointment"),
    
    path('vins/', api_list_vins, name="api_list_vins"),
]
