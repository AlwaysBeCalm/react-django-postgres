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


@csrf_exempt
def employee_api(request, _id=0):
    # todo: remaining is getting a single employee.
    if request.method == 'GET':
        employees = Employees.objects.all()
        employees_data = EmployeesSerializer(employees, many=True)
        return JsonResponse(employees_data.data, safe=False, status=HTTP_200_OK)

    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employee_data = EmployeesSerializer(data=employee_data)
        if employee_data.is_valid():
            employee_data.save()
            return JsonResponse("New Employee saved successfully", status=HTTP_201_CREATED, safe=False)
        return JsonResponse("Enter Employee Data correctly", status=HTTP_400_BAD_REQUEST, safe=False)

    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee = Employees.objects.get(Id=employee_data["Id"])
        employee_data = EmployeesSerializer(employee, data=employee_data)
        if employee_data.is_valid():
            employee_data.save()
            return JsonResponse("Updated Successfully", safe=False, status=HTTP_200_OK)
        return JsonResponse("Enter Employee Data correctly", status=HTTP_400_BAD_REQUEST, safe=False)

    elif request.method == 'DELETE':
        employee = Employees.objects.get(Id=_id)
        employee.delete()
        return JsonResponse("Employee Data Deleted Successfully.", safe=False, status=HTTP_204_NO_CONTENT)


@csrf_exempt
def save_photo(request):
    from django.core.files.storage import default_storage
    photo = request.FILES.get('photo')
    photo_name = default_storage.save(photo.name, photo)
    return JsonResponse(f"photo '{photo_name}' saved successfully", safe=False)
