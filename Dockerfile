FROM nginx:alpine

EXPOSE 80

RUN mkdir -p /clinical-client
COPY ./nginx/clinical-client.conf /etc/nginx/conf.d/clinical-client.conf
COPY ./build /clinical-client
RUN rm /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
