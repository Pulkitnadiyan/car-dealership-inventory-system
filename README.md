# Car Dealership Inventory System

A full-stack vehicle inventory management and search application built with a **React + Tailwind CSS** frontend and an **Express + Prisma + PostgreSQL** backend. The system features user authentication, a public dealership marketplace with price filtering and vehicle purchasing, and a protected administrative control panel for CRUD inventory management and restocking.

---

## Final UI Redesign Preview

![Dealership Marketplace Mockup](screenshot.png)
*(Save a screenshot of your local running application as `screenshot.png` in this root directory to render it here)*

---

## Features

### 🚗 Dealership Marketplace (Home)
- **Compact Filter Panel**: Instantly search cars by Make, Model, Category, and Min/Max Price Range on a single row.
- **Automotive UI Cards**: Cards dynamically render category-based SVG silhouettes (Sedan, SUV, Sports cars) instead of boring placeholders.
- **Price Formatting**: Prices are displayed in standard Indian Rupee format (e.g., `₹45,00,000` / `₹20,000`).
- **Dynamic Stock Indicators**: Stock levels change colors dynamically based on availability.
- **One-Click Purchase**: Authenticated users can buy vehicles instantly, which decrements stock in real-time.

### 🛡️ Administrative Portal
- **Internal Panel Styling**: Styled as a clean control panel focusing on data density and usability.
- **Dual-Column Layout**: Left-aligned Title Case forms for Add/Edit actions and right-aligned inventory tables.
- **Compact Management Rows**: Reduced vertical spacing (`py-2`) to maximize visibility.
- **Restock Controls**: Add stock directly inline.
- **Delete Safe-Guards**: Triggers a confirmation dialog (`window.confirm`) to prevent accidental clicks.

---

## Project Structure

```text
├── backend/
│   ├── prisma/             # Database schemas & migrations
│   ├── src/
│   │   ├── controllers/    # API Request handlers
│   │   ├── middlewares/    # Authentication & admin filters
│   │   ├── repositories/   # Prisma query layer
│   │   └── services/       # Business logic layer
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # Route guards and navigation
    │   ├── context/        # Token & session auth context
    │   ├── pages/          # Home, Admin, Login, and Register views
    │   └── services/       # Axios API integration
    ├── vercel.json         # Vercel SPA routing rewrites
    └── package.json
```

---

## Setup and Installation

### 1. Database Setup
The backend requires a PostgreSQL database. You can host one locally or on the cloud (e.g., [Neon.tech](https://neon.tech/)):
1. Create a PostgreSQL database.
2. Note down the connection URL string:
   `postgresql://<username>:<password>@<host>:<port>/<dbname>?sslmode=require`

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   DATABASE_URL="YOUR_POSTGRESQL_CONNECTION_STRING"
   JWT_SECRET="YOUR_SECURE_JWT_SECRET_KEY"
   ```
4. Push the schema to initialize tables:
   ```bash
   npx prisma db push
   ```
5. Start the backend:
   ```bash
   npm start
   ```
   *(Running on `http://localhost:5000`)*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```
   *(Running on `http://localhost:5173`)*

---

## Test Suite Report

All features were developed under a strict Test-Driven Development (TDD) cycle. The application has **100% passing tests** covering protected routing, auth context, form submits, and search filters.

Run the test suite using:
```bash
cd frontend
npm run test:run
```

### Test Execution Output:
```text
 RUN  v4.1.10 C:/Users/nadiy/OneDrive/Desktop/car-dealership/frontend

 ✓ src/tests/components/AdminProtectedRoute.test.jsx (3 tests) 162ms
 ✓ src/tests/pages/AdminDashboard.test.jsx (5 tests) 2222ms
     ✓ allows admin to add a new vehicle  1278ms
     ✓ allows admin to edit a vehicle  375ms
 ✓ src/tests/pages/Login.test.jsx (4 tests) 3195ms
     ✓ should call login service with entered credentials  1203ms
     ✓ should store token after successful login  680ms
     ✓ should navigate to home after successful login  670ms
     ✓ should display error message on login failure  637ms
 ✓ src/tests/pages/Home.test.jsx (7 tests) 1920ms
     ✓ should call searchVehicles service and render filtered results when user searches  1008ms
     ✓ should filter results by min and max price range  418ms
 ✓ src/tests/pages/Register.test.jsx (1 test) 1325ms
     ✓ should call register service and navigate to login on success  1326ms
 ✓ src/tests/components/Navbar.test.jsx (4 tests) 634ms
     ✓ displays Home, Login, and Register links when unauthenticated  437ms
 ✓ src/tests/components/ProtectedRoute.test.jsx (1 test) 84ms
 ✓ src/tests/context/AuthContext.test.jsx (3 tests) 38ms

 Test Files  8 passed (8)
      Tests  28 passed (28)
```

---

## My AI Usage

### 1. How AI was used to write code
- **TDD Workflow**: The AI assistant helped write failing tests first (RED phase) for price filters, username validation, route guards, and UI renders. Once committed, the minimal clean code was written to satisfy those assertions (GREEN phase).
- **Security Audit**: Staged and untracked the `backend/.env` configuration from Git tracking index to ensure cloud database credentials were not pushed to public repositories.
- **Redesign & Refactoring**: Streamlined the layout to replicate modern, usable dealer portals (AutoTrader/Cars24) by crafting inline search grid structures, category-specific SVGs, and adding delete confirmations.

### 2. Prompts Used
- *\"I want a feature of searching by price also and I will commit about red and green using TDD\"*
- *\"Redesign the frontend UI of this Car Dealership Inventory System to look like a clean, practical automotive inventory marketplace inspired by AutoTrader and Cars24—not a startup landing page.\"*
- *\"Refine home layout: reduce hero height, format price in rupee notation with commas, and render different silhouettes by category.\"*
- *\"Add delete confirmation prompt on admin panel, compact row heights, and title-case labels.\"*
- *\"I want to deploy it on Vercel and Render, please provide deployment setup.\"*

For the full detailed prompt log, check the root folder's **`PROMPTS.md`** file.
