# Use an official Node runtime as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the app
RUN npm run build

# Use a lightweight version of Node.js to run the built app
FROM node:16-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install serve to serve the app on a static server
RUN npm install -g serve

# Copy the build folder from the build stage into the /app folder
COPY --from=0 /app/build .

# Start the app
CMD ["serve", "-s", ".", "-l", "3000"]