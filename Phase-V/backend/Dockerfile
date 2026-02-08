
# Stage 1: Build the Python application
FROM python:3.11-slim-buster AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends 
    gcc 
    # psycopg2-binary requires this
    libpq-dev 
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Run the Python application
FROM python:3.11-slim-buster AS runner
WORKDIR /app

# Install runtime dependencies for psycopg2-binary
RUN apt-get update && apt-get install -y --no-install-recommends 
    libpq5 
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy the application code
COPY . .

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
