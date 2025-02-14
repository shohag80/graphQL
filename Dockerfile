# Use official Node.js LTS image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Expose port 4000 (GraphQL API)
EXPOSE 4000

# Command to run the server
CMD ["npm", "start"]
