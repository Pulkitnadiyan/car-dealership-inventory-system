# PROMPTS.md

# AI Prompt Log

This document summarizes the prompts used during the development of the **Car Dealership Inventory System**.

The project was developed using a **Test-Driven Development (TDD)** workflow where each feature followed the RED → GREEN → REFACTOR process. AI assistance was used to generate tests, suggest implementations, improve the UI, assist with deployment, and review code while the developer validated, modified, tested, and integrated the generated code.

---

# Prompt 1 – Continue Existing Project

## Objective

Continue an existing full-stack Car Dealership Inventory System without redesigning the architecture.

### Instructions

- Continue the existing React + Tailwind CSS frontend.
- Continue the existing Express + Prisma backend.
- Reuse existing backend APIs.
- Do not add unnecessary libraries.
- Follow strict Test-Driven Development.
- Implement one feature at a time.
- Wait for RED and GREEN commits before continuing.

---

# Prompt 2 – Improve Development Workflow

Requested improvements:

- Remove unnecessary features.
- Keep implementation aligned with the assignment.
- Reuse existing backend APIs only.
- Prevent feature creep.
- Require Git commits after every RED and GREEN phase.
- Run the complete test suite after every implementation.

---

# Prompt 3 – Preserve Existing Architecture

Additional constraints:

- Preserve the existing folder structure.
- Do not rename files.
- Do not move components.
- Do not create new backend endpoints.
- Do not modify working components unless required by the failing test.

---

# Prompt 4 – Vehicle Listing (TDD)

### Goal

Implement vehicle listing.

### AI Assistance

- Write failing tests first.
- Fetch vehicles using the existing API.
- Display loading and error states.
- Render responsive vehicle cards.
- Ensure previous tests continue to pass.

---

# Prompt 5 – Vehicle Search

### Goal

Implement search functionality.

### AI Assistance

Search vehicles using:

- Make
- Model
- Category

Reuse the existing backend search endpoint.

---

# Prompt 6 – Vehicle Purchase

### Goal

Implement purchasing.

### AI Assistance

- Purchase button
- Call purchase endpoint
- Update inventory after successful purchase
- Disable purchase when stock reaches zero

---

# Prompt 7 – Admin Dashboard

### Goal

Create an administrative inventory management panel.

### AI Assistance

Implement:

- View Inventory
- Add Vehicle
- Edit Vehicle
- Delete Vehicle
- Restock Vehicle

Reuse existing backend endpoints only.

---

# Prompt 8 – Authentication & Authorization

### Goal

Implement authentication features.

### AI Assistance

- Logout functionality
- Protected Routes
- Admin Protected Route
- Navbar visibility based on authentication
- Admin Dashboard visible only to administrators

---

# Prompt 9 – UI Redesign

### Goal

Improve usability while preserving existing functionality.

### Prompt

> Redesign the frontend UI of this Car Dealership Inventory System to look like a clean, practical automotive inventory marketplace inspired by AutoTrader and Cars24—not a startup landing page.

AI helped redesign:

- Compact search bar
- Vehicle cards
- Responsive layout
- Modern navigation
- Admin dashboard layout

---

# Prompt 10 – Price Filter

### Prompt

> I want a feature of searching by price also and I will commit about red and green using TDD.

Implemented:

- Minimum Price filter
- Maximum Price filter
- Existing search endpoint reused

---

# Prompt 11 – UI Improvements

### Prompt

> Refine home layout: reduce hero height, format price in rupee notation with commas, and render different silhouettes by category.

Implemented:

- Reduced hero height
- ₹ Indian currency formatting
- Category-based SVG vehicle illustrations
- Improved spacing
- Stock indicators

---

# Prompt 12 – Admin Improvements

### Prompt

> Add delete confirmation prompt on admin panel, compact row heights, and title-case labels.

Implemented:

- Delete confirmation dialog
- Compact inventory table
- Inline restocking
- Improved admin form layout

---

# Prompt 13 – Deployment

### Prompt

> I want to deploy it on Vercel and Render, please provide deployment setup.

AI assisted with:

- Environment variables
- Build configuration
- Vercel frontend deployment
- Render backend deployment
- Production API configuration

---

# Prompt 14 – Security Review

AI reviewed the project and suggested:

- Remove `.env` from Git tracking
- Protect database credentials
- Validate JWT handling
- Verify environment configuration before deployment

---

# Prompt 15 – Debugging

AI helped troubleshoot:

- Authentication (401 Unauthorized)
- Registration (400 Bad Request)
- Route protection
- API integration
- Test failures
- Prisma configuration
- Frontend-backend communication

---

# Test-Driven Development Workflow

Every feature followed the same process:

1. Write failing tests (RED)
2. Commit failing tests
3. Implement the minimum code (GREEN)
4. Run the full test suite
5. Commit working implementation
6. Proceed to the next feature only after confirmation

---

# AI Contributions

AI assisted with:

- Test generation
- React components
- Express API integration
- Prisma queries
- Authentication logic
- Route protection
- UI improvements
- Responsive design
- Debugging
- Deployment guidance
- Documentation
- Code review
- Git workflow recommendations

---

# Human Contributions

The developer was responsible for:

- Designing the application architecture
- Implementing and integrating the generated code
- Validating AI-generated suggestions
- Running tests
- Managing Git commits
- Reviewing and modifying generated code
- Debugging runtime issues
- Making final implementation decisions
- Deploying the application