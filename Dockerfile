#Sample Dockerfile for NodeJS Apps

FROM node:16

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]