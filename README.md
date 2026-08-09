# College ERP Management System

A role-based ERP web application built to digitize how a college's administrative staff manage students, courses, departments, and staff records — replacing scattered spreadsheets with a single system where every role sees only what they're supposed to.

**GitHub Repo:** [https://github.com/Gautam-Shende/College_ERP_Management_System](https://github.com/Gautam-Shende/College_ERP_Management_System)

<!-- Add these once available: -->
<!-- **Live Demo:** [link] -->
<!-- **Backend API:** [link] -->
<!-- **Screenshots:** [./screenshots](./screenshots) -->

---

## 📌 What This Project Does

Most small colleges manage students, courses, and staff records manually or in disconnected spreadsheets — no access control, no audit trail, no single source of truth. This ERP centralizes that into one system, where every action is scoped to the logged-in user's role.

**The core workflow:**

Admission staff register new students against a course and department. Teachers and HODs view student and course data relevant to their department. The principal has full visibility — managing staff accounts, approving/rejecting course and department changes, and viewing college-wide analytics on a live dashboard.

---

## ✨ Features

### Role-based access control (RBAC)
Four distinct roles — `principal`, `hod`, `teacher`, `admission_staff` — each with a different set of permissions enforced at the route level, not just hidden in the UI.

- **Principal** — full access: manage staff accounts, approve/create/delete departments, full course and student control, dashboard analytics
- **HOD** — manage courses within their department, view/update students
- **Teacher** — read access to students, courses, and departments
- **Admission staff** — register new students, read access to courses and departments

### Student management
- Create, update, and view student records (name, email, course, city)
- Search by name/email, filter by course and city
- Server-side pagination and sorting on every list endpoint

### Course & department management
- CRUD operations scoped by role (only principal/HOD can create or modify)
- Courses linked to departments via foreign key relationships

### Staff / user management
- Principal-only staff account creation with role and designation assignment
- Account activation/deactivation (`status: active/inactive`) instead of hard deletes
- JWT-based authentication with bcrypt password hashing

### Dashboard
- Summary statistics (total students, courses, departments, staff)
- Course-wise and city-wise student distribution
- Recently added students, fetched in parallel for fast load

---

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express 5**
- **MySQL** (via `mysql2`, connection pooling) — chosen over MongoDB here because student/course/department/user data is inherently relational (foreign keys, joins for reporting)
- **JWT** (`jsonwebtoken`) for authentication, **bcrypt** for password hashing
- Layered architecture: `routes → middleware (auth/authorize/validation) → controllers → models`
- Centralized error handling (`errorHandler.js`) and request logging (`logger.js`)

### Frontend
- **React 19** with **TypeScript** and **Vite**
- **Tailwind CSS v4** for styling
- **React Router v7** for routing
- **React Hook Form** + resolvers for form validation
- **Axios** for API calls
- **Recharts** for dashboard visualizations
- **React Hot Toast** for notifications
- **Lucide React** for icons

---

## 📂 Project Structure

```
College_ERP_Management_System/
├── client/                  # React + TypeScript frontend
│   └── src/
│       ├── api/             # Axios & API calls
│       ├── components/      # Reusable UI components (by module)
│       ├── context/         # Auth/global context providers
│       ├── hooks/           # Custom React hooks
│       ├── layouts/         # Page layout wrappers
│       ├── pages/           # Route-level pages (by module)
│       ├── routes/          # Route definitions
│       ├── services/        # API service layer
│       ├── types/           # TypeScript type definitions
│       ├── utils/           # Helper functions
│       └── validations/     # Form validation schemas
└── server/                  # Express backend server
    ├── config/               # DB connection (MySQL pool) Database
    ├── controllers/          # Request handlers per module
    ├── middleware/           # auth, authorize, validation, error handling, logging 
    ├── models/                # Raw SQL queries per entity , schema architecture
    ├── routes/                # Route definitions per module, 
    └── server.js              # App entry point
```

---

## 🔌 API Overview

Base URL: `/api`

| Module      | Endpoint                                                  | Access                                             |
|-------------|-----------------------------------------------------------|----------------------------------------------------|
| Auth        | `POST /users/register`, `POST /users/login`               | Public |
| Users       | `GET /users/me`                                           | Any authenticated user |
| Users       | `GET /users`, `POST /users`, `PUT /users/:id`, `PATCH /users/:id/status`, `DELETE /users/:id` | Principal only |
| Students    | `GET /students`, `GET /students/:id`                      | Principal, HOD, Teacher, Admission staff           |
| Students    | `POST /students`                                          | Principal, Admission staff                         |
| Students    | `PUT /students/:id`                                       | Principal, HOD, Admission staff                    |
| Students    | `DELETE /students/:id`                                    | Principal only                                     |
| Courses     | `GET /courses`, `GET /courses/:id`                        | Principal, HOD, Teacher, Admission staff           |
| Courses     | `POST /courses`, `PUT /courses/:id`, `DELETE /courses/:id`| Principal, HOD                                     |
| Departments | `GET /departments`, `GET /departments/:id`                | Principal, HOD, Teacher, Admission staff           |
| Departments | `POST /departments`, `PUT /departments/:id`, `DELETE /departments/:id` | Principal only                        |
| Dashboard   | `GET /dashboard`                                          | Principal, HOD, Teacher, Admission staff           |

All protected routes require `Authorization: Bearer <token>` and are additionally gated by role via an `authorize()` middleware.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MySQL server running locally or remotely

### Backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=college_erp
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

🔐 Security Notes
User passwords are securely hashed using bcrypt before being saved in the database. Plain-text passwords are never stored.

• JWT tokens are verified on every protected request. The system also checks whether the related user account is still active.

• All role-based access checks are handled on the server through middleware. The frontend does not control or restrict user permissions.

• Environment files such as .env, which may contain sensitive information, are excluded from version control using .gitignore.

🧠 Design Decisions
• MySQL instead of MongoDB: MySQL was selected because the system contains clearly related data. For example, each student belongs to a specific course, and each course belongs to a department. A relational database with foreign-key constraints was therefore a better fit than a document-based database.

• Status flags instead of permanently deleting users: User accounts are deactivated rather than deleted permanently. This preserves historical information, such as which staff member created a particular student record, even if that staff member later leaves the organization.

• Middleware-based authorization: Authorization logic is handled through centralized middleware instead of being repeated inside individual controllers. This keeps the access rules consistent and easier to maintain across all five modules.
---

## 🚧 Possible Improvements

- Add automated tests (unit tests for controllers/models, integration tests for routes)
- Add refresh tokens instead of a single long-lived JWT
- Add audit logging for sensitive actions (staff creation, department deletion)
- Add attendance and fee management modules
