#!/bin/bash

echo "Migrating"
python manage.py migrate --noinput # Apply database migrations

echo "Run the Django development server"
python manage.py runserver 0:80