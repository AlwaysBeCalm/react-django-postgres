from rest_framework import serializers
from .models import Departments, Employees


class DepartmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Departments
		fields = ("Id", "Name")


class EmployeesSerializer(serializers.ModelSerializer):
	department = serializers.CharField(source="Department.Name", read_only=True)

	class Meta:
		model = Employees
		fields = ("Id", "Name", "Department", "JoiningDate", "department")
