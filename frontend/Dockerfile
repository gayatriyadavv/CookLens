FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
