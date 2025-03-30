

Doctor-Patient Management System:
It is a digital application designed to facilitate the interactions between doctors and patients. It allows patients to book appointments, doctors to manage their schedules and both have access to manage their medical records securely.

Core purposes:
Patient Management
Doctor Management
Appointment Scheduling
Medical Records
Authentication and Authorization

A full-stack application for managing appointments, patient records, and doctor profiles using Node.js, React, MongoDB, and JWT-based authentication.

Features:
1. Patient & Doctor registration/login

2. Secure JWT-based authentication

3. Profile management (Doctor & Patient)

4. Book/view/cancel appointments

5. Add/view medical records

6. Role-based route protection

7. Integrated CI/CD pipeline for auto deployment



//Git hub link: https://github.com/seethalr98/Doctor-Patient-Management-App-DPMA-
//JIRA Link: https://rseethal1998.atlassian.net/jira/software/projects/DPMA/boards/34/backlog

Backend Setup:
  cd backend
  npm install

Create a .env file inside the backend folder to store the db credentials:
  MONGO_URI=mongodb+srv://seethalr98:<<dbpassword>>>>@cluster1.vk9ma.mongodb.net/dpma?retryWrites=true&w=majority&appName=Cluster1
  JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
  PORT=5001

Start the backend server:
  npm start

Frontend Setup:
  cd frontend
  npm install
  npm start

axiosConfig.js points to correct URL:
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
  });


CI/CD Pipeline:
GitHub Actions Workflow:
  .github/workflows/ci.yml

Workflow Steps:
1. Trigger: On push to main

2. Install Dependencies: npm ci

3. Build Frontend

4. Run Backend Tests

5. Deploy to AWS EC2 via SSH


*******Sample ci.yml file: **********

name: Backend CI

on:
  push:
    branches:
      - main  # Trigger CI on pushes to the main branch


jobs:
  test:
    name: Run Tests
    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [22] # Test on multiple Node.js versions


    environment: MONGO_URI

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    # Set up Node.js
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Print Env Secret

      env:
        MONGO_URI: ${{ secrets.MONGO_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        PORT: ${{ secrets.PORT }}
      run: | 
        echo "Secret 1 is: $MONGO_URI"
        echo "Secret 2 is: $JWT_SECRET"
        echo "Secret 3 is: $PORT"
      
    - run: pm2 stop all

    # Install dependencies for backend
    - name: Install Backend Dependencies
      working-directory: ./backend
      run: | 
       npm install --global yarn
       yarn --version
       yarn install
      
    # Install dependencies for frontend
    - name: Install Frontend Dependencies
      working-directory: ./frontend
      run: |
        df -h
        sudo rm -rf ./build
        yarn install
        yarn run build


    # Run backend tests
    - name: Run Backend Tests
      env:
        MONGO_URI: ${{ secrets.MONGO_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        PORT: ${{ secrets.PORT }}
      working-directory: ./backend
      run: npm test


    - run: npm ci
    - run: | 
        cd ./backend
        touch .env
        echo "${{ secrets.PROD }}" > .env

    - run: pm2 start all

    - run: pm2 restart all

*********************************************************************************
