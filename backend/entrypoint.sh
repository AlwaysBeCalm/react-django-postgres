#!/usr/bin/env sh
python manage.py makemigrations EmployeeApp
python manage.py migrate --noinput
python manage.py runserver 0.0.0.0:8000
exec "$@"