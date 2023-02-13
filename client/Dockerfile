# Base image
FROM node:19.5.0-alpine
# Make folder to put our files in
RUN mkdir -p /usr/src/mtgacc
RUN mkdir -p /usr/src/mtgacc/client
# Set working directory so that all
# subsequent command runs in this folder
WORKDIR /usr/src/mtgacc/client
# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
# Copy our app
COPY . .
# Expose port to access server
EXPOSE 4200
# Command to run our app
CMD [ "npm", "start" ]
