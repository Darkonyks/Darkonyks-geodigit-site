web: gunicorn Gsite.wsgi:application --bind 0.0.0.0:$PORT --workers 3 --threads 2 --timeout 120
release: python manage.py migrate --noinput
