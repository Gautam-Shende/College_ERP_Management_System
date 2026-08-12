# College ERP Management System

This is a simple College ERP (student management) web app I built to manage students, courses, departments and staff in one place. It has login with different roles, so a principal, HOD, teacher and admission staff all see different things based on what they are allowed to do.

## Live Demo

- Client (frontend): https://college-erp-management-system-omega.vercel.app/login
- Server (backend API): https://college-erp-management-system-ur8j.onrender.com

Note: the backend is hosted on Render free plan, so it goes to sleep after some time of no use. The first request after that can take 30-50 seconds to respond. This is normal, just wait a bit.

## What this project does

- Login system with JWT (token based login)
- Different access for different roles:
  - Principal - can manage everything (students, employees, courses, departments)
  - HOD - can manage students and view departments
  - Teacher - can manage students
  - Admission Staff - can add and manage students
- Add, edit, view and delete students
- Add, edit and manage employees (only principal can do this)
- Manage courses and departments
- A dashboard page with some charts and quick numbers (total students, total courses, etc)
- Filter and search students by name, course, city
- Register page for new staff to create an account (it stays inactive until principal approves it)
- Works fine on mobile too, sidebar turns into a toggle menu on small screens

## Tech Stack

**Frontend (client folder)**
- React with TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios (for calling the API)
- React Hook Form + Zod (for form validation)
- Recharts (for dashboard charts)

**Backend (server folder)**
- Node.js with Express
- MySQL (using mysql2 package)
- JWT for login/auth
- bcrypt for hashing passwords
- CORS

## Folder Structure

```
College_ERP_Management_System/
  client/     -> React frontend
  server/     -> Express backend
```

Inside client/src you will find folders like pages, components, hooks, services, routes and context.

Inside server you will find folders like routes, controllers, models, middleware and config.

## How to run this project on your own computer

You need Node.js and a MySQL database installed first.

### 1. Clone the repo

```
git clone https://github.com/Gautam-Shende/College_ERP_Management_System.git
cd College_ERP_Management_System
```

### 2. Setup the backend

```
cd server
npm install
```

Create a `.env` file inside the server folder and add this:

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=any_random_secret_text
CLIENT_URL=http://localhost:5173
```

You also need to create the database tables yourself (users, students, courses, departments) in MySQL before running the server, since there is no auto migration script yet.

Run the server:

```
npm run dev
```

Server will start on http://localhost:5000

### 3. Setup the frontend

Open a new terminal:

```
cd client
npm install
```

Create a `.env` file inside the client folder:

```
VITE_API_URL=http://localhost:5000/api
```

Run the client:

```
npm run dev
```

Client will start on http://localhost:5173

## Roles in this project

There are 4 roles:

1. principal - full access
2. hod - department related access
3. teacher - can handle students
4. admission_staff - can add new students

When someone registers using the Register page, they can only pick teacher, hod or admission_staff. Only a principal account (created directly in the database or by another principal) can create more principal-level access. This was done on purpose so random users can't sign up as an admin.

## Known Limitations

- No forgot password option yet
- No file/photo upload for students yet
- No email notification when a new employee registers
- Free hosting plan means the backend can be a bit slow to wake up first time

## Future Plans

- Add attendance tracking
- Add exam/marks section
- Add email notifications
- Add forgot password with OTP

## Author

Made by Gautam Shende, BCA student.

- GitHub: https://github.com/Gautam-Shende
- LinkedIn: https://www.linkedin.com/in/gautam-shende-262803290/
- Portfolio: https://my-portfolio-website-ruddy-xi.vercel.app/

If you find any bug or issue, feel free to open an issue on this repo.
