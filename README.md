# Workflow Display Tool

Workflow Display Tool is a web application for visualizing workflows using React and Vite.

## Features

- Visualize workflows with interactive nodes and edges
- Detailed task information display on node click
- Responsive design for both desktop and mobile views

## Prerequisites

- Docker

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine using Docker.

### Build and Run the Docker Container

1. **Build the Docker image**:

   ```bash
   docker build -t workflow-display-tool .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 4173:4173 workflow-display-tool
   ```

3. **Access the application**:

   Open your web browser and navigate to `http://localhost:4173`.