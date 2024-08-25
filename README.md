# Employee Management

This is a simple Employee Management System built using React, Redux Toolkit, and Node.js with Express and MySQL. The application allows users to view, add, update, and delete employee information.

## Features

- **View Employees:** List all employees in a table format.
- **Add Employee:** Add a new employee to the system.
- **Update Employee:** Edit existing employee details.
- **Delete Employee:** Remove an employee from the system.
- **Loading State:** Shows a loading spinner during API requests.
- **Notifications:** Displays success and error messages using `react-toastify`.


## Technologies Used

- **Frontend:**
  - React
  - Redux Toolkit
  - Axios
  - Tailwind CSS (for styling)
  - React Toastify (for notifications)

- **Backend:**
  - Node.js
  - Express.js
  - MySQL


## How to run the application locally

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/SonuKumar10234/employee-management.git
    cd employee-management
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Set up the database:

   - Create a new MySQL database.
   - Create the table.

4. Configure environment variables:

   - Create a `.env` file in the `backend` directory with the following variables:

     ```plaintext
     DB_HOST=your_db_host
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=your_db_name
     PORT=5000
     ```

5. Start the backend server:

    ```bash
    node index.js
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```
   
   Open your browser and go to `http://localhost:5173`.




