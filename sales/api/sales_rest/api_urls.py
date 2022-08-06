from django.urls import path
from .api_views import api_list_sales, api_salesrep, api_customers, api_list_salesrep

urlpatterns = [
    path('sales/', api_list_sales, name='api_list_sales_get' ),
    path('salesrep/<int:pk>/', api_salesrep, name='api_salesrep'),
    path('salesrep/', api_list_salesrep, name='api_list_salesrep'),
    path('customers/', api_customers, name ='api_customers'),
    path('salesrecord/', api_list_sales, name='api_list_sales_post')
    # path('salesrephistory/', api_salesrep_history, name='api_salesrep_history')

    # path('hats/<int:pk>/', api_list_hat, name='api_hat_delete' ),
]