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

1. _Ask for PEM key_
2. Conectarse via ssh: `ssh -i ~/.ssh/<PEM-FILE> ec2-user@X.X.X.X`
3. Entrar en un navegador a `localhost:8000`
4. `docker-compose -f docker-compose.staging.yml down -v`
5. `docker-compose -f docker-compose.staging.yml up -d`
6. `docker-compose -f docker-compose.staging.yml exec app python manage.py makemigrations`
7. `docker-compose -f docker-compose.staging.yml exec app python manage.py migrate --noinput`
8. `docker-compose -f docker-compose.staging.yml exec app python manage.py collectstatic --no-input --clear`
9. `docker-compose -f docker-compose.staging.yml exec app python manage.py createsuperuser`

## TOOLS

Remove images: `docker rmi $(docker images -q)`
Docker from user: `sudo usermod -a -G docker ec2-user`
Configure aws user:`aws configure --profile reduser`
Push to ECR: `docker-compose -f docker-compose.prod.yml push`
Pull from ECR: `docker-compose pull xxxxxxxx`

### AWS CLI SUPERUSER CREDENTIALS

KEY: _Ask for permissions_
SECRET ACCESS: _Ask for permissions_
DEFAULT REGION: us-east-1f
OUTPUT FORMAT: json
