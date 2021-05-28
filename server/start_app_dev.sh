#!/bin/sh
echo "Connecting to db ..."
python manage.py wait_for_db

#echo "Flushing ..."  TODO DOES NOT WORK
#python manage.py flush --noinput #Flushes the database

echo "Migrating ..."
python manage.py migrate --noinput # Apply database migrations

echo "Running the Django development server ..."
python manage.py runserver 0:80

#exec "$@"