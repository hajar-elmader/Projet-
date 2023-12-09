# Use an official Node.js runtime as a base image with Alpine Linux
FROM node:20.10.0-alpine  
# Set the working directory in the container
WORKDIR /react-app
# Copy only the package.json and package-lock.json files to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install 
# Copy the rest of the application code to the working directory
COPY . .
# Build the React app
RUN npm run build
# Expose the port that the app will run on
EXPOSE 3000
# Define the command to run your application
CMD ["npm", "start"]