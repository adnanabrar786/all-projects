# Use the official Node.js image with version 18 and macOS as the base image
FROM node:18

# Set the working directory within the container to /frontend
WORKDIR /frontend

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install the project dependencies using Yarn
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Start app
CMD ["yarn", "dev"]