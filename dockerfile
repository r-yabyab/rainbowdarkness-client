#for debian EC2 instance
FROM node:bullseye

#downloads awscli so it can set the .env parameters in the container
RUN apt-get update

WORKDIR /app

COPY public/ ./public
COPY src/ ./src
COPY package.json .

RUN npm install

# COPY . .

EXPOSE 3333

#CMD ["node", "index.js"]
CMD bash -c 'npm start'