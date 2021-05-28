# Correr el server

## Prerequisitos

- Python 3.x
- Docker
- Docker Compose
- Pipenv

## Pasos DEV

1. `cd server`
2. `docker-compose up`
3. Entrar en un navegador a `localhost:8000`

## Pasos Staging

1. *Ask for PEM key*
2. conectarse via ssh: `ssh -i ~/.ssh/<PEM-FILE> ec2-user@X.X.X.X`
3. Entrar en un navegador a `localhost:8000`
4. `Docker-compose -f docker-compose.staging.yml exec app python manage.py makemigrations` 
4. `docker-compose -f docker-compose.staging.yml down -v`
5. `docker-compose -f docker-compose.staging.yml up -d`
6. `docker-compose -f docker-compose.staging.yml exec app python manage.py migrate --noinput`
7. `docker-compose -f docker-compose.staging.yml exec app python manage.py collectstatic --no-input --clear`
8. `docker-compose -f docker-compose.staging.yml exec app python manage.py createsuperuser1`

## TOOLS:

Remove images: `docker rmi $(docker images -q)` <br>
Docker from user: `sudo usermod -a -G docker ec2-user` <br>
Configure aws user:`aws configure --profile reduser` <br>
Push to ECR: `docker-compose -f docker-compose.prod.yml push` <br>
Pull from ECR: `docker-compose pull xxxxxxxx`

### AWS CLI SUPERUSER CREDENTIALS 
KEY: *Ask for permissions* <br>
SECRET ACCESS: *Ask for permissions* <br>
DEFAULT REGION: us-east-1f <br>
OUTPUT FORMAT: json <br>