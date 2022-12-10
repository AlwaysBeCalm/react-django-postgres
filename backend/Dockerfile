FROM python:3.9-alpine
WORKDIR /app
COPY . .
COPY ./entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r//' /entrypoint.sh
RUN chmod +x /entrypoint.sh
RUN chown root /entrypoint.sh

RUN pip install -r requirements.txt

CMD ["/entrypoint.sh"]
