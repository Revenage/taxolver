#! /bin/bash

python3 -m venv myenv
source myenv/bin/activate
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
