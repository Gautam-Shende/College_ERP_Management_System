# 🚀 Deployment Guide — College ERP Management System

Complete step-by-step guide to deploy:
- **Backend** → [Render](https://render.com) (Node.js Web Service)
- **Frontend** → [Vercel](https://vercel.com) (Vite + React SPA)
- **Database** → [Neon](https://neon.tech) (Serverless PostgreSQL)

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Neon PostgreSQL Setup](#2-neon-postgresql-setup)
3. [Run Database Migrations](#3-run-database-migrations)
4. [Local Development Setup](#4-local-development-setup)
5. [Deploy Backend to Render](#5-deploy-backend-to-render)
6. [Deploy Frontend to Vercel](#6-deploy-frontend-to-vercel)
7. [Environment Variables Reference](#7-environment-variables-reference)
8. [Post-Deployment Verification](#8-post-deployment-verification)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

- **Node.js** v18.x or higher
- **npm** v9.x or higher
- **Git** installed and configured
- Accounts on:
  - [Neon](https://neon.tech) (free tier available)
  - [Render](https://render.com) (free tier available)
  - [Vercel](https://vercel.com) (free tier available)
  - [GitHub](https://github.com) (to connect repos)

---

## 2. Neon PostgreSQL Setup

1. Go to [Neon Console](https://console.neon.tech/) and sign in.
2. Click **"Create Project"**.
3. Name it (e.g., `college-erp-db`), select a region close to your Render deployment region, click **Create Project**.
4. Go to **Connection Details** in your project dashboard.
5. Copy the **Connection String** — it looks like:

```
postgresql://neondb_owner:PASSWORD@ep-xxx-yyyy.region.aws.neon.tech/neondb?sslmode=require
```

> ⚠️ **Save this string securely.** You'll need it for both local `.env` and Render environment variables.

---

## 3. Run Database Migrations

You must run `schema.sql` first, then `seed.sql` to create tables and insert sample data.

### Option A: Neon SQL Editor (Recommended)

1. Open your Neon project → go to the **SQL Editor** tab.
2. Copy the contents of [`database/schema.sql`](./database/schema.sql), paste into the editor, and click **Run**.
3. Copy the contents of [`database/seed.sql`](./database/seed.sql), paste into the editor, and click **Run**.

### Option B: Using `psql` CLI

```bash
psql "postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require" -f database/schema.sql
psql "postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require" -f database/seed.sql
```

---

## 4. Local Development Setup

### 4.1 Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/College_ERP_Management_System.git
cd College_ERP_Management_System
```

### 4.2 Setup Backend (Server)

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-xxx-yyyy.region.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=your_secret_jwt_key_here
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The server will run at `http://localhost:5000`.

Verify it's working:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{ "success": true, "message": "API is healthy" }
```

### 4.3 Setup Frontend (Client)

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will run at `http://localhost:5173`. Open it in your browser.

---

## 5. Deploy Backend to Render

### 5.1 Push Code to GitHub

Make sure your latest code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 5.2 Create a Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **"New +"** → **"Web Service"**.
3. Connect your GitHub repo.
4. Configure the service:

| Setting | Value |
|---|---|
| **Name** | `college-erp-backend` (or any name) |
| **Region** | Choose the region closest to your Neon DB |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free (or your preference) |

### 5.3 Set Environment Variables on Render

Go to your service → **Environment** tab → Add the following:

| Key | Value |
|---|---|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `postgresql://neondb_owner:PASSWORD@ep-xxx.region.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | `a_strong_random_secret_string` |
| `CLIENT_URL` | `https://your-app-name.vercel.app` *(update after Vercel deploy)* |

> 💡 **Tip**: For `JWT_SECRET`, generate a strong random string. You can use:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### 5.4 Deploy

Click **"Create Web Service"**. Render will build and deploy automatically.

Once deployed, note your backend URL — it will look like:
```
https://college-erp-backend.onrender.com
```

Verify the deployment:
```bash
curl https://college-erp-backend.onrender.com/api/health
```

---

## 6. Deploy Frontend to Vercel

### 6.1 Import Project on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New…"** → **"Project"**.
3. Import your GitHub repository.
4. Configure the project:

| Setting | Value |
|---|---|
| **Framework Preset** | `Vite` |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 6.2 Set Environment Variables on Vercel

Go to your project → **Settings** → **Environment Variables** → Add:

| Key | Value | Environments |
|---|---|---|
| `VITE_API_URL` | `https://college-erp-backend.onrender.com/api` | Production, Preview, Development |

> ⚠️ **Important**: Replace `college-erp-backend` with your actual Render service name/URL.

### 6.3 Deploy

Click **"Deploy"**. Vercel will build and deploy automatically.

Once deployed, note your frontend URL — it will look like:
```
https://your-app-name.vercel.app
```

### 6.4 Update Render's CLIENT_URL

**Go back to Render** → your Web Service → **Environment** tab.

Update the `CLIENT_URL` variable to your Vercel URL:

```
CLIENT_URL=https://your-app-name.vercel.app
```

Click **"Save Changes"** — Render will automatically redeploy.

---

## 7. Environment Variables Reference

### Backend (`server/.env`) — Set on Render

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `production` |
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Secret key for JWT token signing | `a_random_64_char_hex_string` |
| `CLIENT_URL` | Deployed frontend URL (for CORS) | `https://your-app.vercel.app` |

### Frontend (`client/.env`) — Set on Vercel

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `https://college-erp-backend.onrender.com/api` |

> 💡 **Note**: Vite only exposes env vars prefixed with `VITE_` to the client bundle.

---

## 8. Post-Deployment Verification

### 8.1 Test Backend Health

```bash
curl https://YOUR-RENDER-URL.onrender.com/api/health
```

### 8.2 Test Frontend

Open `https://your-app.vercel.app` in a browser. You should see the login/register page.

### 8.3 Register Your First Principal User

1. Navigate to the **Register** page on your frontend.
2. Register with role `principal` — this is the admin account.
3. Login with the registered credentials.

### 8.4 Verify Full Flow

- ✅ Login/Register works
- ✅ Dashboard loads with stats
- ✅ Students CRUD works
- ✅ Courses CRUD works
- ✅ Departments CRUD works
- ✅ Employee management works (Principal only)

---

## 9. Troubleshooting

### CORS Errors

**Problem**: `Access to XMLHttpRequest... has been blocked by CORS policy`

**Fix**: Make sure `CLIENT_URL` on Render matches your exact Vercel URL (no trailing slash):
```
✅ https://your-app.vercel.app
❌ https://your-app.vercel.app/
```

---

### Render Free Tier Cold Starts

**Problem**: First request after 15 minutes of inactivity takes 30-50 seconds.

**Fix**: This is normal on Render's free tier. The service spins down after inactivity. Options:
- Upgrade to a paid plan ($7/month)
- Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your `/api/health` endpoint every 14 minutes

---

### Database Connection Errors

**Problem**: `Error: connect ECONNREFUSED` or `SSL/TLS required`

**Fix**:
1. Verify your `DATABASE_URL` includes `?sslmode=require`
2. Check that your Neon project is active (not paused due to inactivity)
3. Test the connection string locally first

---

### Vercel Build Fails

**Problem**: Build error on Vercel

**Fix**:
1. Ensure `Root Directory` is set to `client` in Vercel settings
2. Check that `VITE_API_URL` env var is set in Vercel
3. Run `npm run build` locally to verify no TypeScript errors

---

### "API is healthy" works but frontend gets 404

**Problem**: API routes return 404

**Fix**: Make sure `VITE_API_URL` includes the `/api` suffix:
```
✅ https://college-erp-backend.onrender.com/api
❌ https://college-erp-backend.onrender.com
```

---

## Quick Deploy Checklist

- [ ] Neon database created and connection string copied
- [ ] `schema.sql` and `seed.sql` executed on Neon
- [ ] Code pushed to GitHub
- [ ] Render Web Service created with `server` as root directory
- [ ] All 5 env vars set on Render (`PORT`, `NODE_ENV`, `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`)
- [ ] Vercel project created with `client` as root directory
- [ ] `VITE_API_URL` env var set on Vercel
- [ ] `CLIENT_URL` on Render updated with actual Vercel URL
- [ ] First Principal user registered
- [ ] Full flow tested ✅
