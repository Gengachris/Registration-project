FROM node:18-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

WORKDIR /home/app

# Copy package.json first for better caching
COPY App/package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY App/ .

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
