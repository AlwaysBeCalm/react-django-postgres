from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.status import *
from django.http.response import JsonResponse

from .models import Departments, Employees
from .serializers import DepartmentSerializer, EmployeesSerializer


# Create your views here.


@csrf_exempt
def department_api(request, _id=0):
    # todo: remaining is getting a single department.
    if request.method == 'GET':
        departments = Departments.objects.all()
        departments_data = DepartmentSerializer(departments, many=True)
        return JsonResponse(departments_data.data, safe=False, status=HTTP_200_OK)

    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        department_data = DepartmentSerializer(data=department_data)
        if department_data.is_valid():
            department_data.save()
            return JsonResponse("New Department saved successfully", status=HTTP_201_CREATED, safe=False)
        return JsonResponse("Enter Department Data correctly", status=HTTP_400_BAD_REQUEST, safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Departments.objects.get(Id=department_data["Id"])
        department_data = DepartmentSerializer(department, data=department_data)
        if department_data.is_valid():
            department_data.save()
            return JsonResponse("Updated Successfully", safe=False, status=HTTP_200_OK)
        return JsonResponse("Enter Department Data correctly", status=HTTP_400_BAD_REQUEST, safe=False)

    elif request.method == 'DELETE':
        department = Departments.objects.get(Id=_id)
        department.delete()
        return JsonResponse("Department Data Deleted Successfully.", safe=False, status=HTTP_204_NO_CONTENT)
