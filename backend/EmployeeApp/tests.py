from django.test import TestCase
from EmployeeApp.models import Departments

# Create your tests here.


class DepartmentTestCase(TestCase):

    def setUp(self) -> None:
        Departments.objects.create(Name="HR")

    def test_confirm_department_name(self):
        department = Departments.objects.get(pk=1)
        self.assertEqual(department.Name, "HR")
