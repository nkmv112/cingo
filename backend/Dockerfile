# Use a Node.js base image with GCC support
FROM node:18-slim

# Install GCC and other build essentials
RUN apt-get update && \
    apt-get install -y gcc g++ make && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Create temp directory for compilation
RUN mkdir -p temp && chmod 777 temp

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "server.js"]
