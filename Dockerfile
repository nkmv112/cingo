# Use a Node.js base image with GCC support
FROM node:18-slim

# Install GCC and other build essentials
RUN apt-get update && \
    apt-get install -y gcc g++ make && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files from the backend directory and install dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy the backend source code
COPY backend/ .

# Create temp directory for compilation with proper permissions
RUN mkdir -p temp && chmod 777 temp

# Expose the port (Railway uses PORT env var, but we document 3001)
EXPOSE 3001

# Command to run the backend
CMD ["node", "server.js"]
