# Stage 1: Set up Python environment and copy Flask backend
FROM python:3.12.4-slim

WORKDIR /app
COPY requirements.txt .
# Install system dependencies
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     nginx \
#     && rm -rf /var/lib/apt/lists/*

# Copy Flask backend
COPY . .

# Install Python dependencies

RUN pip install --no-cache-dir -r requirements.txt gunicorn

# # Configure Nginx
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 80

EXPOSE 5000
CMD ["python", "server.py"]