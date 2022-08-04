from django.urls import path
from .api_views import api_list_sales, api_salesperson, api_customers

urlpatterns = [
    path('sales/', api_list_sales, name='api_list_sales_get' ),
    path('salespersons/', api_salesperson, name='api_show_salesperson'),
    path('customers/', api_customers, name ='api_customers'),
    path('salesrecord/', api_list_sales, name='api_list_sales_post')

    # path('hats/<int:pk>/', api_list_hat, name='api_hat_delete' ),
]