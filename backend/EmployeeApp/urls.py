from django.urls import path
from .views import *

from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('departments', department_api),
    path('departments/<_id>', department_api),

    path('employees/save_photo', save_photo),
    path('employees', employee_api),
    path('employees/<_id>', employee_api),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

