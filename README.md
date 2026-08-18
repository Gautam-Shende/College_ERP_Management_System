# 🎓 College ERP Management System

[![Live Demo - Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://college-erp-management-system-omega.vercel.app)
[![Live API - Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://college-erp-management-system-ur8j.onrender.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A modern, full-stack, enterprise-grade **College ERP (Enterprise Resource Planning) Management System** designed to streamline institutional administration. Built with a scalable layered architecture using **React 19**, **Node.js (Express 5)**, **TypeScript**, and **PostgreSQL 16**.

---

## 🌐 Live Deployments

| Component | Provider | Live URL |
| :--- | :--- | :--- |
| **Frontend Web Application** | **Vercel** | 🔗 [https://college-erp-management-system-omega.vercel.app](https://college-erp-management-system-omega.vercel.app) |
| **Backend RESTful API** | **Render** | 🔗 [https://college-erp-management-system-ur8j.onrender.com](https://college-erp-management-system-ur8j.onrender.com) |

---

## ✨ Key Features & Capabilities

### 🔐 1. Role-Based Access Control (RBAC) & Security
- **4 Granular Roles**:
  - `Principal`: Universal administrative control across all departments, courses, staff, and students.
  - `HOD` (Head of Department): Department-level oversight, student management, and staff monitoring.
  - `Teacher`: Academic administration, student performance, and personal profile management.
  - `Admission Staff`: Student enrollment management, records maintenance, and city/course allocations.
- **Authentication**: JWT (JSON Web Tokens) with bearer tokens & `bcrypt` password hashing (salt factor 10).
- **Frontend Protection**: Route guards based on user roles and token validity.

### 📊 2. Interactive Analytics Dashboard
- **Live Metrics**: Overview of total students, department counts, active staff members, and daily attendance statistics.
- **Data Visualizations**: Recharts integration for student distribution across courses and attendance trends.

### 👨‍🎓 3. Student Lifecycle Management
- **Full CRUD Operations**: Create, read, update, and delete student records.
- **Filtering & Search**: Dynamic search by student name, city, course, or department.
- **Course Assignment**: Strict foreign key constraints linking students to specific academic programs.

### 🏢 4. Department & Course Administration
- **Hierarchical Structuring**: Unique department creation paired with specialized course offerings.
- **Cascading Safety**: Integrity controls preventing orphan records on department or course modification.

### 👥 5. Staff & Attendance System
- **Staff Records**: Role-based designation management, contact detail tracking, and activation status (`active` / `inactive`).
- **Daily Attendance**: Log daily staff attendance (`present` / `absent`) with unique constraint validation per date.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + @hookform/resolvers
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database Engine**: PostgreSQL 16 (`pg` pool client)
- **Security & Auth**: `jsonwebtoken`, `bcrypt`, `cors`
- **Environment Management**: `dotenv`

### Infrastructure & Operations
- **Containerization**: Docker & Docker Compose (Local PostgreSQL)
- **Deployment**: Vercel (Client SPA) & Render (Express REST API)

---

## 📐 System Architecture

```text
               +--------------------------------------------------+
               |                  Client App                      |
               |          (React 19 + Vite + TypeScript)           |
               +------------------------+-------------------------+
                                        |
                                   HTTP / REST
                                 (JSON + JWT Auth)
                                        |
                                        v
               +--------------------------------------------------+
               |                  Backend API                     |
               |               (Express.js Layer)                 |
               +-------+----------------+----------------+--------+
                       |                |                |
                       v                v                v
                 [Middleware]     [Controllers]      [Services]
                 (Auth, RBAC)     (Validation)     (Business Logic)
                                                         |
                                                         v
                                                     [Models]
                                               (Parameterized SQL)
                                                         |
                                                         v
               +--------------------------------------------------+
               |               PostgreSQL Database                |
               |        (Departments, Courses, Students,          |
               |           Users, Staff Attendance)               |
               +--------------------------------------------------+
```

---

## 🗄️ Database Schema & ERD Overview

```text
 +------------------+          +------------------+          +------------------+
 |   DEPARTMENTS    |          |     COURSES      |          |     STUDENTS     |
 +------------------+          +------------------+          +------------------+
 | id (PK)          |<---------| id (PK)          |<---------| id (PK)          |
 | department_name  |  1    *  | course_name      |  1    *  | name             |
 | created_at       |          | department_id(FK)|          | email            |
 | updated_at       |          | created_at       |          | course_id (FK)   |
 +------------------+          +------------------+          | city             |
        ^                                                    +------------------+
        | 1
        |
        | *
 +------------------+          +------------------+
 |      USERS       |          | STAFF_ATTENDANCE |
 +------------------+          +------------------+
 | id (PK)          |<---------| id (PK)          |
 | name             |  1    *  | user_id (FK)     |
 | email            |          | attendance_date  |
 | password         |          | status           |
 | role             |          +------------------+
 | department_id(FK)|
 | designation      |
 | status           |
 +------------------+
```

---

## 📁 Repository Structure

```text
College_ERP_Management_System/
├── client/                     # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── api/                # Axios instance with interceptors
│   │   ├── components/         # Reusable UI cards, tables, modals & loaders
│   │   ├── context/            # AuthContext provider for JWT session state
│   │   ├── hooks/              # Custom React hooks (useDashboard, useStudents, etc.)
│   │   ├── pages/              # View pages (Login, Dashboard, Students, Staff, etc.)
│   │   ├── routes/             # Role-based protected router configuration
│   │   ├── services/           # Service modules for API calls
│   │   ├── types/              # Global TypeScript interfaces & types
│   │   └── utils/              # Helper utilities, constants, & menu configurations
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── server/                     # Express.js REST API Backend
│   ├── src/
│   │   ├── config/             # PostgreSQL pool setup (`db.js`)
│   │   ├── controllers/        # Express HTTP request & response handlers
│   │   ├── middleware/         # Auth verification, RBAC rules, & error handlers
│   │   ├── models/             # Parameterized SQL database queries
│   │   ├── routes/             # API route declarations (`/api/v1`)
│   │   ├── services/           # Core business logic & validations
│   │   ├── app.js              # Middleware pipeline configuration
│   │   └── server.js           # Server startup script
│   ├── .env.example
│   └── package.json
│
├── database/                   # Database Scripts
│   ├── schema.sql              # Table definitions, constraints, triggers & indexes
│   └── seed.sql                # Initial seed dataset for demo testing
│
├── docker-compose.yml          # Local containerized PostgreSQL setup
└── README.md                   # Project documentation
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Docker Desktop**: (Optional, for running PostgreSQL in Docker)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/Gautam-Shende/College_ERP_Management_System.git
cd College_ERP_Management_System
```

---

### Step 2: Database Initialization (PostgreSQL)

#### Option A: Using Docker Compose (Recommended)
```bash
# Start PostgreSQL container
docker compose up -d

# Execute database schema and seed data
docker exec -i college_erp_postgres psql -U postgres -d college_erp_management < database/schema.sql
docker exec -i college_erp_postgres psql -U postgres -d college_erp_management < database/seed.sql
```

#### Option B: Using Local PostgreSQL Instance
```bash
# Create database
createdb -U postgres college_erp_management

# Run schema and seed scripts
psql -U postgres -d college_erp_management -f database/schema.sql
psql -U postgres -d college_erp_management -f database/seed.sql
```

---

### Step 3: Configure Environment Variables

Create `.env` files in both `server/` and `client/` directories based on the templates below:

#### Backend Config (`server/.env`)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=college_erp_management
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:5173
```

#### Frontend Config (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

### Step 4: Install Dependencies & Run Application

#### 1. Start Backend API Server
```bash
cd server
npm install
npm run dev
```
*The server will start listening at `http://localhost:5000`.*

#### 2. Start Frontend Web Client
```bash
cd ../client
npm install
npm run dev
```
*Open your browser and navigate to `http://localhost:5173`.*

---

## 🔌 Core API Endpoints

### 🔐 Authentication & Staff Users (`/api/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/login` | Authenticate user & issue JWT | Public |
| `POST` | `/api/users/register` | Register new staff member | Principal |
| `GET` | `/api/users` | Fetch all staff members | Principal, HOD |
| `PATCH` | `/api/users/:id/status` | Update staff account status | Principal |

### 👨‍🎓 Student Management (`/api/students`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/students` | Get paginated student list (with filters) | All Authenticated |
| `POST` | `/api/students` | Enroll a new student | Principal, HOD, Admission |
| `GET` | `/api/students/:id` | Get student details by ID | All Authenticated |
| `PUT` | `/api/students/:id` | Update student information | Principal, HOD, Admission |
| `DELETE` | `/api/students/:id` | Remove student record | Principal |

### 🏢 Departments & Courses (`/api/departments`, `/api/courses`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/departments` | List all departments | All Authenticated |
| `POST` | `/api/departments` | Create department | Principal |
| `GET` | `/api/courses` | List all courses | All Authenticated |
| `POST` | `/api/courses` | Create course under department | Principal, HOD |

### 📅 Staff Attendance (`/api/attendance`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/attendance` | Record daily staff attendance | Principal, HOD |
| `GET` | `/api/attendance` | Fetch attendance records with date filters | Principal, HOD |

---

## 🔑 Demo Access Credentials

> [!NOTE]
> Ensure you run `database/seed.sql` to populate these credentials into your local or cloud database.

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Principal** | `principal@college.edu` | `Password123!` | System-wide administrative permissions |
| **HOD** | `hod.cs@college.edu` | `Password123!` | Computer Science Department management |
| **Teacher** | `teacher.cs@college.edu` | `Password123!` | Classroom academic management |
| **Admission Staff** | `admission@college.edu` | `Password123!` | Student registration and enrollment |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.
