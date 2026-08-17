# College ERP Management System

A full-stack, role-based College ERP Management System built with **React**, **Node.js (Express)**, and **PostgreSQL**.

---

## Technical Architecture

- **Frontend**: React + Vite + TypeScript, Lucide Icons, React Router DOM, Tailwind CSS
- **Backend**: Node.js + Express.js (Layered architecture: `Routes` → `Controllers` → `Services` → `Models` → `PostgreSQL`)
- **Database**: PostgreSQL 16 (Local containerized via Docker Compose)
- **Authentication**: JWT (JSON Web Tokens) & `bcrypt` password hashing
- **Role-Based Access Control (RBAC)**: Enforced on both backend API endpoints and frontend navigation (`Principal`, `HOD`, `Teacher`, `Admission Staff`)

---

## Directory Structure

```text
College_ERP_Management_System/
├── client/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── api/                # Axios instance configuration
│   │   ├── components/         # Reusable UI components & modals
│   │   ├── context/            # AuthContext provider
│   │   ├── hooks/              # Custom React hooks (useDashboard, etc.)
│   │   ├── pages/              # View pages (Login, Register, Dashboard, Students, Users, etc.)
│   │   ├── routes/             # Protected and role-based app routing
│   │   ├── services/           # Frontend API service functions
│   │   ├── types/              # TypeScript interfaces
│   │   └── utils/              # Helper utilities & menu items
│   ├── .env.example
│   └── package.json
│
├── server/                     # Node.js + Express Backend Application
│   ├── src/
│   │   ├── config/             # DB connection pool (db.js) & constants
│   │   ├── controllers/        # Request handlers & response formatters
│   │   ├── middleware/         # Auth, RBAC, Validation, Logger, Error Handler
│   │   ├── models/             # Parameterized SQL database queries (inline)
│   │   ├── routes/             # Express API route declarations
│   │   ├── services/           # Business logic & validations
│   │   ├── app.js              # Express app setup & middleware pipeline
│   │   └── server.js           # HTTP server initialization
│   ├── .env.example
│   └── package.json
│
├── database/                   # Single source of truth database scripts
│   ├── schema.sql              # Tables, PKs, FKs, constraints, triggers & indexes
│   └── seed.sql                # Initial demo data (Departments, Courses, Students)
│
├── docker-compose.yml          # Local PostgreSQL Docker configuration
├── .gitignore
└── README.md
```

---

## Local Development Workflow

### Step 1: Install & Start Docker PostgreSQL
Ensure Docker Desktop is running, then start the PostgreSQL container:

```bash
docker compose up -d
```
*This starts a PostgreSQL 16 container at `localhost:5432` with a persistent Docker volume (`postgres_data`).*

### Step 2: Initialize Database Schema & Seed Data
Execute `schema.sql` followed by `seed.sql` on the `college_erp_management` database:

```bash
# Using psql inside Docker container:
docker exec -i college_erp_postgres psql -U postgres -d college_erp_management < database/schema.sql
docker exec -i college_erp_postgres psql -U postgres -d college_erp_management < database/seed.sql
```

### Step 3: Configure Environment Variables

**Backend Environment (`server/.env`)**:
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

**Frontend Environment (`client/.env`)**:
```env
VITE_API_URL=http://localhost:5000
```

### Step 4: Install Dependencies & Run

**Backend (`server/`)**:
```bash
cd server
npm install
npm run dev
```

**Frontend (`client/`)**:
```bash
cd client
npm install
npm run dev
```

Access the application at `http://localhost:5173`.

---

## User Registration API Endpoint

To create users (Principal, HOD, Teacher, Admission Staff), send a POST request:

```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456",
  "role": "teacher",
  "department_id": 1,
  "designation": "Assistant Professor",
  "phone": "9876543210"
}
```

