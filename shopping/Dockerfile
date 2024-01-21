FROM node

# Setting up the work directory
WORKDIR /app/shopping

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Exposing server port
EXPOSE 8003

# Starting our application
CMD [ "npm", "start" ]