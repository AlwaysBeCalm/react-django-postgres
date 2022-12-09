from django.urls import path
from .views import *

urlpatterns = [
    path('departments', department_api),
    path('departments/<_id>', department_api),
]
