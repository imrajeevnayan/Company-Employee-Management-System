# Company Employee Management System

A full-stack web application for managing employees and related company data.
It includes a React frontend, a Spring Boot REST API, JWT authentication, and an
in-memory H2 database.

## Features

- User registration and login
- JWT-based authentication
- Employee management
- Country, state, district, and language management
- Search and pagination
- Image upload
- CSV export
- Responsive React interface
- H2 database console for development

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Bootstrap
- React Three Fiber

### Backend

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- Maven

### Database

- H2 in-memory database

No MySQL installation or database setup is required.

## Project Structure

```text
Company-Employee-Management-System/
|-- Backend/
|   |-- src/main/java/       # Controllers, services, entities, and repositories
|   |-- src/main/resources/  # Spring Boot configuration
|   |-- pom.xml              # Backend dependencies
|   `-- mvnw.cmd             # Maven wrapper for Windows
|-- Frontend/
|   |-- src/                 # React application source
|   |-- public/              # Static files
|   `-- package.json         # Frontend dependencies and scripts
`-- README.md
```

## Requirements

Install the following tools:

- Java Development Kit (JDK) 17 or newer
- Node.js 20 or newer
- npm

Maven does not need to be installed separately because the project includes the
Maven wrapper.

Check the installed versions:

```powershell
java -version
node --version
npm --version
```

## Run the Application

The backend and frontend must run in separate terminals.

### 1. Start the Backend

Open PowerShell in the project folder:

```powershell
cd Backend
.\mvnw.cmd spring-boot:run
```

Wait until the terminal reports that the application has started.

The backend is available at:

```text
http://localhost:8080
```

### 2. Start the Frontend

Open another PowerShell terminal in the project folder:

```powershell
cd Frontend
npm install
npm run dev
```

Open the URL displayed by Vite:

```text
http://localhost:5173
```

`npm install` is normally required only the first time or after dependencies
change.

## Using the Application

1. Open `http://localhost:5173`.
2. Select **Register** and create an account.
3. Sign in with the registered email and password.
4. Use the navigation menu to access the protected pages.
5. The JWT token is stored in browser local storage and included automatically
   in API requests.

## H2 Database Console

The application uses an in-memory H2 database. While the backend is running,
open:

```text
http://localhost:8080/h2-console
```

Use these connection details:

| Field | Value |
|---|---|
| Driver Class | `org.h2.Driver` |
| JDBC URL | `jdbc:h2:mem:employee_db` |
| User Name | `sa` |
| Password | Leave blank |

Click **Connect** to view the tables and data.

> The database is stored in memory. Its data is deleted when the backend stops.

## Main API Endpoints

Base URL:

```text
http://localhost:8080
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Log in and receive a JWT |

### Employees

| Method | Endpoint | Description |
|---|---|---|
| POST | `/employees/add` | Add an employee |
| GET | `/employees/all` | Get all employees |
| PUT | `/employees/update/{id}` | Update an employee |
| DELETE | `/employees/delete/{id}` | Delete an employee |

### Other Resources

| Resource | Base endpoint |
|---|---|
| Languages | `/language` |
| States | `/states` |
| Districts | `/district` |
| Customers | `/customers` |
| Students | `/students` |
| Employee dropdown data | `/employeesddl` |

These resources provide create, read, update, and delete endpoints. See the
controller classes in `Backend/src/main/java/com/nt/controler` for the complete
route list and request formats.

## Run Tests

### Backend Tests

```powershell
cd Backend
.\mvnw.cmd test
```

### Frontend Checks

```powershell
cd Frontend
npm run lint
npm run build
```

## Build for Production

### Backend

```powershell
cd Backend
.\mvnw.cmd clean package
```

The generated JAR file will be placed in `Backend/target`.

### Frontend

```powershell
cd Frontend
npm run build
```

The production frontend files will be placed in `Frontend/dist`.

## Configuration

Backend settings are stored in:

```text
Backend/src/main/resources/application.properties
```

Frontend API settings are stored in:

```text
Frontend/src/api/axiosConfig.ts
```

The frontend currently sends API requests to:

```text
http://localhost:8080
```

The backend allows browser requests from:

```text
http://localhost:5173
```

Update both configurations if either port or host changes.

## Common Problems

### Port 8080 is already in use

Stop the program using port `8080`, or add another port to
`application.properties`:

```properties
server.port=8081
```

Then update the frontend API URL in `Frontend/src/api/axiosConfig.ts`.

### Port 5173 is already in use

Vite may automatically choose another port. If that happens, update the allowed
origin in `Backend/src/main/java/com/nt/config/SecurityConfig.java`.

### Frontend cannot connect to the backend

Confirm that:

- The backend is running on `http://localhost:8080`.
- The frontend API base URL is correct.
- The browser origin is allowed by the backend CORS configuration.

### Data disappears after restarting

This is expected because H2 is configured as an in-memory database. Use a
file-based H2 URL or another database if permanent storage is required.

## Stop the Application

Press `Ctrl+C` in both terminals to stop the frontend and backend.

## License

This project is intended for learning and development purposes.
