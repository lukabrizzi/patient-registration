# Patient Registration App

This project is a full-stack patient registration application. It uses Node.js with Express for the backend, MySQL as the database, and React (or Vue) for the frontend, with Tailwind CSS for styling.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
  - [Register Patients](#register-patients)
  - [Get All Patients](#get-all-patients)
- [Notes](#notes)
- [License](#license)

## Prerequisites

Make sure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for containerization)
- [Node.js](https://nodejs.org/) and npm (for managing dependencies)

## Installation

1. Clone the repository:
   git clone https://github.com/lukabrizzi/patient-registration.git
   cd patient-registration

2. Open Docker Desktop to ensure that Docker is running.

## Running the Project

### Backend Setup

1. Navigate to the `backend` folder:
   cd backend

2. Create a .env file with the following content:

`PORT=3000
DB_HOST=db
DB_USER=root
DB_PASSWORD=password
DB_NAME=patients_db
EMAIL_USER=test@gmail.com
EMAIL_PASS=hardpassword`

3. Run `npm run build`

4. Build and start the Docker containers:
   docker compose up --build -d

   - `--build`: Forces a rebuild of the Docker images, ensuring that any changes made to the Dockerfile or dependencies are included.
   - `-d`: Runs the containers in detached mode, allowing them to run in the background.

5. If there are existing services running on port `3000` or `3001`, you need to stop those processes:

   - **On macOS (M1)**: Use the following commands to find and kill the process using the port.
     lsof -i :3000
     kill -9 <PID>
     Replace `<PID>` with the process ID shown in the output.

   - **On Windows**:
     1. Open Command Prompt or PowerShell as administrator.
     2. Use the command below to find the PID of the process occupying the port:
        netstat -ano | findstr :3000
     3. Terminate the process with the command:
        taskkill /PID <PID> /F

6. Install backend dependencies (if not done previously):
   npm install

### Frontend Setup

1. Navigate to the `frontend` folder:
   cd frontend

2. Install frontend dependencies:
   npm install

3. The backend will run on port `3000`. Since this port is occupied, the frontend will automatically start on port `3001`. Start the frontend server:
   npm start

## API Endpoints

Once the frontend and backend are running, you can interact with the API via the following endpoints.

### Register Patients

- **URL**: POST http://localhost:3000/api/patients
- **Description**: Registers a new patient with details such as name, email, phone number, and ID photo.

### Get All Patients

- **URL**: GET http://localhost:3000/api/patients
- **Description**: Retrieves a list of all registered patients.

## Notes

- The backend will run on port `3000`, and the frontend will run on port `3001`.
- You can access the frontend via [http://localhost:3001](http://localhost:3001) in your browser.
- The backend API can be tested with tools like Postman or directly from the frontend interface.

## License

This project is licensed under the MIT License.
