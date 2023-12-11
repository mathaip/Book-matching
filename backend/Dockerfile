# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the whole application code into the container
COPY . .

# Expose the application port
EXPOSE 8080
# Copy the Flask app code into the container
COPY main.py .

# Set the command to run the Flask ap
CMD ["streamlit", "run", "main.py", "--server.port=8080","server.address=0.0.0.0"]
