### ✨ Pokretanje
```bash
git clone http://gitlab.geodigit.local/zombori.ivan/geodigit-site
cd geodigit-site
python -m venv venv
(windows) venv\Scripts\activate  
(linux) source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### ✨ Otvori Novi CMD:
```bash
python manage.py livereload (automatsko refresovanje posle izmene)
```

### ✨ Ostale Komande: 
```bash
python manage.py compilemessages (cuvanje svih izmena prevoda u locale - django.po fajlovima)
```

