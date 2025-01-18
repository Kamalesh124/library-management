# Library Management System

## Overview

The **Library Management System** is a full-stack web application built with **Spring Boot** (for the backend) and **React** (for the frontend). The application allows users to manage books by performing actions such as adding, updating, deleting, and viewing the list of books in the library.

The backend is powered by a Spring Boot application, while the frontend is a React-based application. The system uses an H2 database for storing book details in the backend.

---

## Features

- **Add a Book**: Add new books to the library by providing the title and author name.
- **Update a Book**: Edit existing book details.
- **Delete a Book**: Remove a book from the library.
- **View All Books**: Display a list of all books in the library.

---

## Tech Stack

- **Backend**: Spring Boot, Java
- **Frontend**: React.js
- **Database**: H2 (in-memory)
- **Docker**: For containerizing the application
- **Render**: Cloud hosting service

---

## Prerequisites

- **JDK 17** or later (for backend)
- **Node.js** and **npm** (for frontend)
- **Docker** (optional, for containerization)

---

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Run the backend locally**:
   ```bash
   ./mvnw spring-boot:run
   ```
   By default, the backend runs on `http://localhost:8080`.

### Frontend Setup

1. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend locally**:
   ```bash
   npm start
   ```
   By default, the frontend runs on `http://localhost:3000` and connects to the backend at `http://localhost:8080`.

---

## Docker Setup

If you want to run the application using Docker:

1. **Build the Docker image**:
   ```bash
   docker build -t library-management-system .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -p 8080:8080 library-management-system
   ```
   This will make the backend accessible at `http://localhost:8080`.

---

## Deployment on Render

The application can be deployed on **Render** as a web service. Ensure that the backend and frontend are configured properly and deployed using Render’s service settings.

---

## Endpoints

### Backend API Endpoints

- `GET /getAllBooks`: Fetch all books.
- `POST /addBook`: Add a new book.
- `POST /updateBookById/{id}`: Update the details of an existing book.
- `DELETE /deleteBookById/{id}`: Delete a book.
