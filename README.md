# Car Dealership Inventory System

A full-stack Car Dealership Inventory System that enables customers to browse, search, and purchase vehicles while providing administrators with a secure dashboard for inventory management. Built using **React**, **Express.js**, **Prisma ORM**, **PostgreSQL**, and **JWT Authentication**, with development following a **Test-Driven Development (TDD)** workflow.

---

## 📸 Application Preview

<table>
<tr>
<td align="center"><b>🏠 Home Page</b></td>
<td align="center"><b>🛠️ Admin Dashboard</b></td>
</tr>

<tr>
<td>
<img src="screenshots/home.png" width="500"/>
</td>

<td>
<img src="screenshots/admin-dashboard.png" width="500"/>
</td>
</tr>

<tr>
<td align="center"><b>🔐 Login</b></td>
<td align="center"><b>📝 Register</b></td>
</tr>

<tr>
<td>
<img src="screenshots/login.png" width="500"/>
</td>

<td>
<img src="screenshots/register.png" width="500"/>
</td>
</tr>

</table>

---

## 🚀 Features

### 🚗 Dealership Marketplace

- Browse all available vehicles.
- Search vehicles by:
  - Make
  - Model
  - Category
  - Minimum Price
  - Maximum Price
- Dynamic inventory cards with category-specific vehicle silhouettes.
- Indian Rupee price formatting.
- Stock status badges with dynamic colors.
- Purchase vehicles with real-time stock updates.
- Purchase button automatically disables when stock reaches zero.

### 🛡️ Administrative Portal

- Secure Admin Dashboard.
- Add new vehicles.
- Update existing vehicles.
- Delete vehicles.
- Restock inventory.
- Delete confirmation dialog to prevent accidental deletion.
- Compact inventory management table for improved readability.

---

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Admin-only Dashboard
- Persistent Login using Local Storage

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Context API
- Vitest
- React Testing Library

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

### Development Tools

- Git
- GitHub
- Prisma Studio

---

## 📂 Project Structure

```text
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests/
│   │   └── app.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── tests/
│   │   └── App.jsx
│   │
│   ├── vercel.json
│   └── package.json
│
├── screenshots/
│   ├── home.png
│   ├── admin-dashboard.png
│   ├── login.png
│   └── register.png
│
├── README.md
├── PROMPTS.md
└── .gitignore
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Vehicles

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/vehicles` | Get all vehicles |
| GET | `/api/vehicles/search` | Search vehicles |
| POST | `/api/vehicles` | Add vehicle |
| PUT | `/api/vehicles/:id` | Update vehicle |
| DELETE | `/api/vehicles/:id` | Delete vehicle |
| POST | `/api/vehicles/:id/purchase` | Purchase vehicle |
| POST | `/api/vehicles/:id/restock` | Restock vehicle |

---

## ⚙️ Setup and Installation

### 1. Database Setup

The backend requires a PostgreSQL database.

You can use PostgreSQL locally or a cloud-hosted database such as **Neon**.

1. Create a PostgreSQL database.
2. Obtain the database connection string.

Example:

```text
postgresql://username:password@host:5432/database?sslmode=require
```

---

### 2. Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000
DATABASE_URL="YOUR_DATABASE_URL"
JWT_SECRET="YOUR_SECRET_KEY"
```

Push the Prisma schema.

```bash
npx prisma db push
```

(Optional) Open Prisma Studio.

```bash
npx prisma studio
```

Start the backend.

```bash
npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

Navigate to the frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create `.env`.

```env
VITE_API_URL=http://localhost:5000
```

Run the frontend.

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🏗 Application Workflow

```text
User
   │
   ▼
React Frontend
   │
Axios
   │
Express REST API
   │
Service Layer
   │
Repository Layer
   │
Prisma ORM
   │
PostgreSQL
```

Authentication Flow

```text
JWT Token
      │
      ▼
Protected Routes
      │
      ▼
Admin Dashboard
```

---

## 🧪 Test Suite

The project was developed using **Test-Driven Development (TDD)**.

Frontend tests cover:

- Authentication
- Route Protection
- Navbar
- Vehicle Listing
- Search Filters
- Purchase Flow
- Admin Dashboard
- CRUD Operations

Run the frontend tests.

```bash
cd frontend
npm run test:run
```

Example output:

```text
✓ AdminProtectedRoute.test.jsx
✓ AdminDashboard.test.jsx
✓ Home.test.jsx
✓ Login.test.jsx
✓ Register.test.jsx
✓ Navbar.test.jsx
✓ ProtectedRoute.test.jsx
✓ AuthContext.test.jsx

Test Files  8 passed
Tests       28 passed
```

---

## 🔴🟢 Development Approach

The project followed a strict **Test-Driven Development (TDD)** workflow.

Each feature was implemented using the following cycle:

1. Write a failing test (RED)
2. Commit the failing test
3. Implement the minimum code required
4. Commit the working implementation (GREEN)
5. Repeat for the next feature

This ensured every feature was backed by automated tests before implementation.

---

## 🤖 AI Usage

### How AI was Used

AI was used as a development assistant throughout the project.

It assisted with:

- Generating TDD test cases.
- Reviewing application architecture.
- Suggesting UI improvements.
- Refactoring React components.
- Explaining implementation approaches.
- Reviewing API design.
- Identifying potential issues.
- Deployment guidance.

All generated suggestions were manually reviewed, integrated, tested, and verified before being committed.

---

### Example Prompts

- "I want a feature of searching by price also and I will commit about red and green using TDD."
- "Redesign the frontend UI of this Car Dealership Inventory System to look like a clean automotive inventory marketplace."
- "Refine the home layout, reduce hero height, format prices using Indian Rupee notation, and improve vehicle cards."
- "Improve the admin dashboard UI while keeping all functionality unchanged."
- "Help deploy the frontend on Vercel and backend on Render."

For the complete prompt history, see **PROMPTS.md**.

---

## 📌 Future Improvements

- Vehicle image uploads.
- Pagination.
- Sorting by price and category.
- User purchase history.
- Vehicle details page.
- Email notifications.
- Docker support.
- CI/CD pipeline.

---

## 📄 License

This project was developed as part of the **Incubyte TDD Assessment** for educational and evaluation purposes.