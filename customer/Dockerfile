FROM node

# Setting up the work directory
WORKDIR /app/customer

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Exposing server port
EXPOSE 8001

# Starting our application
CMD [ "npm", "start" ]