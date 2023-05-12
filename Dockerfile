
FROM node:16

WORKDIR /node
COPY package*.json ./

ENV PORTSERVER=5555
ENV HOSTSERVER=0.0.0.0
ENV DB_USER=postgres
ENV DB_PASSWORD=resman56
ENV DB_HOST=db-auth-simklinik
ENV DB_NAME=auth
ENV DB_PORT=5432
ENV DB_METHOD=md5
ENV JWT_SECRET=secret_key
ENV BASE_URL=https://gateway.adameds.id/

RUN npm install
WORKDIR /node/app
COPY . .

EXPOSE 5555
CMD [ "npm", "start" ]
