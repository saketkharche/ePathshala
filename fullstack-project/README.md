# Student ERP System – Fullstack Project

This repository contains a **full‑stack web application** designed for managing academic and administrative workflows for educational institutions.  The backend is built with **ASP.NET Core Web API** and **Entity Framework Core**, while the frontend is developed using **React** (JavaScript).  The system supports multiple roles — **Admin**, **Teacher**, **Student** and **Parent** — each with their own dashboards and permissions.

> **Note**: This project skeleton does not include compiled binaries.  You will need to install the .NET SDK and Node.js tooling on your own machine and update the configuration files (for example, the MySQL connection string in `appsettings.json`) before running the application.

## Backend Setup (ASP.NET Core)

The backend lives in the `backend` folder and exposes a RESTful API.  It uses **JWT** for authentication and **role‑based authorization**.  The data layer is powered by Entity Framework Core targeting a MySQL database.

### Prerequisites

* [.NET 6 SDK](https://dotnet.microsoft.com/download) or later installed locally.
* A MySQL server instance.  Create a database (e.g. `erp_db`) and note its connection details.

### Configuring MySQL

Update the `ConnectionStrings:DefaultConnection` entry in `backend/appsettings.json` with your MySQL server information.  For example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=erp_db;user=youruser;password=yourpassword"
  },
  ...
}
```

### Running the Backend

1. Navigate to the `backend` directory:

   ```bash
   cd fullstack-project/backend
   ```
2. Restore dependencies and build the project:

   ```bash
   dotnet restore
   dotnet build
   ```
3. Apply EF Core migrations (the `ApplicationDbContext` is set up for MySQL).  Create an initial migration and update the database:

   ```bash
   dotnet tool install --global dotnet-ef   # first time only
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
4. Run the API:

   ```bash
   dotnet run
   ```

The API will start listening on the configured port (by default `http://localhost:5000`).  You can interact with it using tools such as Postman or via the React frontend.

### Authentication

The application uses **JWT tokens** issued by the `AuthController` during login.  Admins can create new users (students, teachers, parents).  Each user receives a unique account number on creation.  Tokens should be supplied in the `Authorization` header when calling protected endpoints.

### Project Structure (Backend)

```
backend/
│   Program.cs             # Configures services, authentication, and routing
│   appsettings.json       # Application configuration (database & JWT settings)
└───Models/                # Entity classes for EF Core
└───Data/                  # ApplicationDbContext for EF Core
└───Services/              # Utility services (e.g. JWT token generation)
└───DTOs/                  # Data Transfer Objects for requests/responses
└───Controllers/           # API controllers for authentication and each role
```

## Frontend Setup (React)

The frontend lives in the `frontend` directory.  It is a simple React application (without TypeScript) that interacts with the backend via HTTP.  It uses [React Router](https://reactrouter.com/) for routing between pages and [Axios](https://axios-http.com/) for API requests.

### Prerequisites

* [Node.js](https://nodejs.org/) (version 16 or later recommended) installed locally.

### Running the Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd fullstack-project/frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm start
   ```

The application will run on `http://localhost:3000` by default.  The React app includes pages for login, dashboards for each role, an about page, and a contact page.  Most of the logic is stubbed out; you can enhance the UI and connect the API endpoints as needed.

### Project Structure (Frontend)

```
frontend/
│   package.json            # Frontend dependencies and scripts
└───public/
│   └── index.html          # Entry point HTML document
└───src/
    ├── index.js           # Root of the React application
    ├── App.js             # Defines routing and layout
    ├── api/               # Axios configuration and API utilities
    ├── components/        # Shared UI components (Navbars, cards)
    └── pages/             # Individual pages for roles (Login, Admin, Student, Teacher, Parent, About, Contact, Profile)
```

## Next Steps

This skeleton is intended as a starting point.  You should flesh out the controllers with full CRUD operations, implement role‑based UI in React, handle file uploads (for assignments), and add proper validation/error handling.  The goal is to provide a robust foundation upon which you can build your Student ERP system.