FROM python:3.8-slim

RUN mkdir app
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --upgrade pip \
    && pip install -r requirements.txt