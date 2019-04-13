FROM node:6.6

# Installing service
WORKDIR /home/demo
COPY . ./

# Install dependencies
RUN npm install

EXPOSE 3000
ENTRYPOINT [ "npm", "start"]