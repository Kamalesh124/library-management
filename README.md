# Library Management System

A simple library management system built with a Spring Boot backend and React frontend, allowing users to manage books by performing CRUD operations (Create, Read, Update, Delete). This project is designed for managing books in a library and is deployed on Render with the frontend hosted on Vercel.

## Features

- View a list of books in the library
- Add a new book
- Update an existing book's details
- Delete a book
- Responsive and user-friendly UI

## Live Demo

You can check out the live demo of the application [here](https://library-management-ten-kappa.vercel.app).

## Technologies Used

- **Frontend**: React, TailwindCSS
- **Backend**: Spring Boot
- **Database**: H2 Database (for local storage)
- **Deployment**: Render (Backend), Vercel (Frontend)

## Project Structure

```
├── backend
│   ├── src
│   ├── target
│   └── pom.xml
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
```

### Backend

- Spring Boot application
- Handles CRUD operations for managing books
- H2 in-memory database for storing book information

### Frontend

- React application
- Allows users to interact with the library system, perform CRUD operations, and view the list of books

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/library-management.git
   cd library-management/backend
   ```

2. Install dependencies:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

4. The backend will be available at `http://localhost:9090`.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the React application:
   ```bash
   npm start
   ```

4. The frontend will be available at `http://localhost:3000`.

## API Endpoints

- `GET /getAllBooks`: Fetch all books
- `POST /addBook`: Add a new book
- `POST /updateBookById/{id}`: Update book details by ID
- `DELETE /deleteBookById/{id}`: Delete book by ID

## Deployment

- **Frontend**: Hosted on Vercel (Live link: [https://library-management-ten-kappa.vercel.app](https://library-management-ten-kappa.vercel.app))
- **Backend**: Hosted on Render (Live API)
