from rest_framework import serializers
from .models import Departments, Employees


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ("Id", "Name")


class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ("Id", "Name", "Department", "JoiningDate")
