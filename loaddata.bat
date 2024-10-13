cd gymspace

python manage.py makemigrations user
python manage.py makemigrations challenge
python manage.py makemigrations company
python manage.py makemigrations division
python manage.py makemigrations gym
python manage.py makemigrations 
python manage.py migrate

python manage.py loaddata mockupData/user.json
python manage.py loaddata mockupData/gym_sport.json
python manage.py loaddata mockupData/profile.json
python manage.py loaddata mockupData/company.json
python manage.py loaddata mockupData/gym.json
python manage.py loaddata mockupData/division.json
python manage.py loaddata mockupData/posts.json
python manage.py loaddata mockupData/challenges.json
python manage.py loaddata mockupData/challenge_progress.json

cd ..