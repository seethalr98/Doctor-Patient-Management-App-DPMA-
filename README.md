### Doctor-Patient Management System:
It is a digital application designed to facilitate the interactions between doctors and patients. It allows patients to book appointments, doctors to manage their schedules and both have access to manage their medical records securely.

### Features:
  1. Doctor:
      - View scheduled appointments
      - Access patient medical records
      - Add treatment summaries
      - Receive notifications for new bookings

  2. Patient:
      - Register and log in
      - Schedule medical appointments
      - View and manage their appointments
      - Update personal profile

### Design Patterns Used:
- **Factory** – User creation based on role (Doctor/Patient)
- **Decorator** – Layered notification system (basic, email, SMS, log)
- **Proxy** – Secure access to medical records
- **Strategy** – Sort appointments by date, time, or patient name
- **Facade** – Unified appointment scheduling with persistence and notification

## 🛠️ Technologies

### Frontend:
- React.js (Vite-based)
- Tailwind CSS
- Axios

### Backend:
- Flask
- MongoEngine (ODM for MongoDB)
- PyJWT for authentication
- Python `unittest` / `pytest` for testing

### Database:
- MongoDB Atlas (cloud-hosted)

## 📁 Project Structure

Doctor-Patient-Management-App-DPMA-/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── design_patterns/
│ ├── tests/
│ └── server.py
│
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── context/
│
└── README.md

## ⚙️ Setup Instructions

### 🔧 Backend

1. Navigate to backend:
   cd backend

2. Create Virtual Environment
python -m venv myenvpy
source myenvpy/bin/activate  # or myenvpy\Scripts\activate on Windows

3. Install Dependencies:
pip install -r requirements.txt

4. Create .env file: 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5001

5. Run the Server:
python server.py

🎨 Frontend
1. Navigate to frontend:
  cd frontend

2. Install dependencies:
  npm install
3. Start development server:
  npm start

Frontend will run at: http://localhost:3000

### Testing:
cd backend/tests
pytest

### API Testing Tool
Postman


| Method | Endpoint                         | Description                           |
| ------ | -------------------------------- | ------------------------------------- |
| POST   | `/api/auth/login`                | Login as patient or doctor            |
| POST   | `/api/auth/register`             | Register a new user                   |
| PUT    | `/api/doctors/profile`           | Update doctor profile                 |
| PUT    | `/api/patients/profile`          | Update patient profile                |
| POST   | `/api/appointments`              | Book an appointment                   |
| GET    | `/api/appointments`              | View patient’s own appointments       |
| GET    | `/api/appointments/doctor`       | Doctor views assigned appointments    |
| POST   | `/api/records`                   | Add treatment record (Doctor only)    |
| GET    | `/api/records?patientEmail=`     | View medical records by patient email |


### 👥 Contributors
1. Seethal Raghavan (N12046370)
2. Akhila Mappilakunnel Kuriakose (N11822554)
3. Alwin Sunny (N11932228)
4. Jeevan Jyothish koottukaran (N11896094)


//Git hub link: https://github.com/seethalr98/Doctor-Patient-Management-App-DPMA-
//JIRA Link: https://rseethal1998.atlassian.net/jira/software/projects/DPMA/boards/34/backlog

### CI/CD Pipeline:
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
        node-version: [22]  # For frontend (React)

    environment: MONGO_URI

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    # ----------------------------------------
    # 🐍 Setup Python & Run Pytest for Backend
    # ----------------------------------------
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'

    - name: Install Python Dependencies
      working-directory: ./backend
      run: |
        python -m venv venv
        source venv/bin/activate
        pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest

    - name: Run Backend Tests with Pytest
      working-directory: ./backend
      env:
        MONGO_URI: ${{ secrets.MONGO_URI }}
        JWT_SECRET: ${{ secrets.JWT_SECRET }}
        PORT: ${{ secrets.PORT }}
      run: |
        source venv/bin/activate
        pytest tests

    # ----------------------------------------
    # 🌐 Frontend Steps (React)
    # ----------------------------------------

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install Backend Node (Optional PM2)
      run: pm2 stop all

    - name: Install Backend Node Dependencies
      working-directory: ./backend
      run: |
        npm install --global yarn
        yarn --version
        yarn install

    - name: Install Frontend Dependencies
      working-directory: ./frontend
      run: |
        sudo rm -rf ./build
        yarn install
        yarn run build

    # Optional Deployment Steps (if applicable)
    - run: npm ci
    - run: |
        cd ./backend
        touch .env
        echo "${{ secrets.PROD }}" > .env

    - run: pm2 start all
    - run: pm2 restart all

*********************************************************************************