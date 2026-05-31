# TaskPilot – Project Management Backend

A production-grade collaborative task management backend built
with Spring Boot microservices, deployed on Microsoft Azure.

![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoftazure&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=jsonwebtokens)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 📌 About

TaskPilot is a backend system for managing projects and tasks
across teams with multiple user roles. Built with a focus on
security, performance, and clean API design.

🔗 **Live Demo:** https://project-management-app-h9su.vercel.app/login


> ⚠️ Note: Backend hosted on Render free tier.
> First request may take 30-50 seconds to wake up.
> Subsequent requests will be fast.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot |
| Security | Spring Security · JWT · RBAC |
| Database | MySQL · JPA/Hibernate |
| Containerization | Docker |
| Deployment | Microsoft Azure App Service |
| Build Tool | Maven |

---

## ✨ Features

- JWT-based stateless authentication
- Role-Based Access Control (Admin / Manager / Developer)
- Project creation, assignment, and tracking
- Task management with status updates
- Secure REST APIs with proper error handling
- Multi-stage Dockerfile for optimized builds
- Health check endpoints for uptime monitoring
- Deployed live — Frontend on Vercel, Backend on Render

---

## 🏗️ Architecture

```
Client / Vercel Frontend
        ↓
Render Backend (Spring Boot)
        ↓
Spring Security Filter
(JWT Token Validation + Role Check)
        ↓
REST Controller Layer
(AuthController / ProjectController / TaskController)
        ↓
Service Layer
(AuthService / ProjectService / TaskService)
        ↓
Repository Layer (JPA / Hibernate)
        ↓
MySQL Database
```

---

## 👤 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| Admin | Full access — manage users, projects, tasks |
| Manager | Create and assign projects and tasks |
| Developer | View and update assigned tasks only |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and receive JWT token |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create new project |
| GET | /api/projects/{id} | Get project by ID |
| PUT | /api/projects/{id} | Update project |
| DELETE | /api/projects/{id} | Delete project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/{id} | Update task status |
| DELETE | /api/tasks/{id} | Delete task |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /actuator/health | Application health check |

---

## ⚙️ How to Run Locally

### Prerequisites
- Java 17+
- MySQL 8+
- Docker (optional)
- Maven

### Setup

```bash
# Clone the repository
git clone https://github.com/Harryyy24/project-management-app.git

# Navigate to project
cd project-management-app

# Configure environment
cp src/main/resources/application.properties.example \
   src/main/resources/application.properties

# Edit application.properties with your credentials
# Then run:
./mvnw spring-boot:run
```

### Run with Docker

```bash
docker build -t taskpilot .
docker run -p 8080:8080 taskpilot
```

---

## 🔐 Environment Configuration

Create your `application.properties` from the example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskpilot_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
server.port=8080
```

---

## 🙋‍♂️ Author

**Harish Thube**
[LinkedIn](https://linkedin.com/in/harish-thube) ·
[GitHub](https://github.com/Harryyy24)