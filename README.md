# E-Commerce Project

A simple e-commerce application built with Spring Boot (backend) and React (frontend).

## Features

- User registration and login
- Product browsing and management
- Shopping cart functionality
- JWT authentication
- Material-UI interface

## Tech Stack

- **Backend**: Spring Boot, PostgreSQL, Redis, JWT
- **Frontend**: React, TypeScript, Material-UI, Vite

## Setup

### Prerequisites
- Java 17+
- Node.js 18+
- Docker (for database)

### Quick Start

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd e-commerce-project-emt
   ```

2. **Backend:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   docker-compose up -d
   ./mvnw spring-boot:run
   ```

3. **Frontend:**
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```

4. **Access:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080
   - API Docs: http://localhost:8080/swagger-ui.html

## Environment Variables

### Backend (.env)
```env
DATASOURCE_URL=jdbc:postgresql://localhost:5432/emt
DATASOURCE_USERNAME=postgres
DATASOURCE_PASSWORD=root
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
```

## Project Structure

```
├── backend/          # Spring Boot API
├── frontend/         # React app
└── README.md
```

## Development

- Backend runs on port 8080
- Frontend runs on port 5173
- Database: PostgreSQL (port 2345)
- Cache: Redis (port 6379)
- 
