FROM tiangolo/uwsgi-nginx-flask:latest

COPY ./app/requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app /app

EXPOSE 80 443 
