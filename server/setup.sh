pip install -r requirements.txt
createdb test_db
createdb flask_api
python manage.py db upgrade
python manage.py seed
echo 'Finished backend setup'
