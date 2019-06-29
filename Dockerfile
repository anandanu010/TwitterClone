#Define image we want to build from
FROM node:argon

#Setup the directory structure for our web app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Since argon comes with nodejs and npm we need to make sure rest of our dependencies are installed ( express, etc)
COPY package.json /usr/src/app/
RUN npm install

#Copy all our app source code sitting locally inside the docker image
COPY . /usr/src/app

#What port we want to expost
EXPOSE 5001

#Next we need to start our server so we can reach it (i.e. server.js)
CMD ["npm", "start" ]
