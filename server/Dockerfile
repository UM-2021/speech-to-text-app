# Build de core
FROM python:3.7-alpine

EXPOSE 80 443

# Copy the start_app scripts
COPY ./start_app_dev.sh /
RUN chmod +x /*.sh
CMD ["/start_app_dev.sh"]

# Prepare the app
RUN mkdir /code/
WORKDIR /code/

# Install packages for postgres support
RUN apk add --update --no-cache postgresql-client jpeg-dev
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev

# Install PipEnv
RUN pip3 install pipenv

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock

# Install requirements
RUN pipenv install --system

# Delete build dependencies temporary files
RUN apk del .tmp-build-deps

# Copy all source code
COPY --chown=www-data:www-data . .