# Build de core
FROM python:3.7-slim-stretch

EXPOSE 80 443

# Copy the start_app scripts
COPY ./start_app_dev.sh /
RUN chmod +x /*.sh
CMD ["/start_app_dev.sh"]

# Prepare the app
RUN mkdir /code/
WORKDIR /code/

# Install PipEnv
RUN pip3 install pipenv

COPY Pipfile Pipfile
COPY Pipfile.lock Pipfile.lock

# Install requirements
RUN pipenv install --system

# Copy all source code
COPY --chown=www-data:www-data . .