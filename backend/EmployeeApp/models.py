from django.db import models


# Create your models here.

class Departments(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=50)


class Employees(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=50)
    Department = models.CharField(max_length=50)
    JoiningDate = models.DateField()
