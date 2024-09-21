# Stage 1: Build React frontend
FROM node:20 AS frontend-builder

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Set up Python environment and copy Flask backend
FROM python:3.12.4-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Copy Flask backend
COPY backend/ ./backend/

# Copy built React frontend
COPY --from=frontend-builder /app/dist ./backend/dist

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Configure Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx and Gunicorn
CMD service nginx start && gunicorn --bind 0.0.0.0:5000 --chdir backend 'server:app'