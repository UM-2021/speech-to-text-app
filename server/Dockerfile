# Build de core
FROM python:3.7-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Prepare the app
RUN mkdir /code/
WORKDIR /code/

# Install packages for postgres support
RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# Delete build dependencies temporary files
RUN apk del .tmp-build-deps


# Copy entry point
COPY ./start_app_dev.sh /

# Copy all source code
COPY . .


#The entrypoint is weird you need to be at server to work and this is not good at all
RUN chmod +x /*.sh
ENTRYPOINT ["sh", "./start_app_dev.sh"]

