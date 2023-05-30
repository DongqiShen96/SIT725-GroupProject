FROM node

# Update package lists
RUN apt-get update

# Install npm
RUN apt-get install -y npm

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

RUN npm install

CMD ["npm", "start"]
