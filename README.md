# School Management System - NestJS API

**Comprehensive backend solution** for educational institution management, providing modular architecture for handling academic operations, user management, facility organization, and administrative workflows. Built with scalability and maintainability in mind.

## Technologies Used

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typeorm)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## Core Modules

### 1. Dashboard Stats
- System-wide analytics and key performance indicators

### 2. Institution Management
#### Institution
- **Campus**
  - Location tracking
- **Principal Management**
  - Name
  - Date appointed
  - Date resigned

### 3. User Management
#### Staff
- **Academic Staff**
  - Teachers
    - Qualifications/Credentials
    - Speciality tracking
- **Non-academic Staff**
  - Administrative personnel
  - **Essential Services**
    - Medical (Doctors, Nurses)
    - Cleaners
    - Librarian
    - Security

#### Students/Parents
- **Enrollment Management**
  - Student enrollment
  - Enrollment history view

### 4. Facilities Management
#### Site
- Site-level resource tracking
#### Building
- Name identification
- Unique codes
- **Room Management**
  - Room coding system
  - Designation (e.g., Classroom, Lab)

### 5. Subject Management
- Subject title catalog
- Grade/class associations
- **Term Structure**
  - Curriculum planning
  - Academic period organization

### 6. Facility Structure Management
#### Building
- **Floor Organization**
  - **Room Allocation**
    - Physical space mapping
    - Capacity planning

## Development Features
- **TypeORM Integration**: Database-agnostic ORM for entity management
- **Swagger UI**: Interactive API documentation at `/api`
- **Validation Pipes**: Built-in request validation
- **Modular Architecture**: Decoupled feature modules
- **Role-based Access Control**: Secure endpoint authorization