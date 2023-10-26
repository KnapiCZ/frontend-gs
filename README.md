# Repozitář pro gymspace webovou aplikaci využívající Vue.js a Django.

## Zapnutí serveru pro Vue:
Jdi do /gymspace-frontend/ v terminálu a napiš:
```
ionic serve  (pro local)
ionic serve --external (pro hostovani)
```

Server se zapne na specifické url, koukni se do terminálu.
Změň si baseUrl v src/components/API/apiCaller.js na IP tvého django serveru.

## Zapnutí serveru pro Django
Jdi do /gymspace/ v terminálu a napiš:
```
python manage.py runserver

Nefunguje?
python manage.py makemigrations
python manage.py migrate
python manage.py runserver {ip:port}

Vytvoreni admina?
python manage.py createsuperuser
```


