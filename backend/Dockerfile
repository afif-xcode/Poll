# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (to optimize caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose application port (change if your app uses another port)
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]
