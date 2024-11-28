# Respond.io Assessment

## Note-Taking App

## Running the Application

### Using Docker Compose
This application is containerized and uses Docker Compose for easy deployment. Follow these steps to run it:

1. **Ensure Docker and Docker Compose are installed**:
   - [Docker Installation Guide](https://docs.docker.com/get-docker/)
   - [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

2. **Clone the repository**:
   ```bash
   git clone https://github.com/agb-assessment/respond_io_assesment.git
   cd RESPOND_IO_ASSESMENT
   ```

3. **Run Docker Compose**:
   ```bash
   docker-compose up --build
   ```

4. The application will be available at `http://localhost:8080`.

---

## Introduction
This project is a note-taking app developed as part of the **Respond.io Assessment**. The application provides RESTful APIs for user authentication and managing notes. Users can register, log in, and perform CRUD operations on notes.

Additionally, the project incorporates the **Singleton Pattern** for managing the Redis client and the **Factory Method Pattern** for creating new note categories. These design patterns enhance the application's efficiency, scalability, and maintainability.

---

## Table of Contents
- [Endpoints](#endpoints)
- [Design Patterns Used](#design-patterns-used)
- [Sample cURL Commands](#sample-curl-commands)
- [Notes](#notes)

---

### Endpoints
Below is a list of endpoints provided by this application:

1. **User Registration**: `POST /api/users/register`
2. **User Login**: `POST /api/users/login`
3. **Add New Note**: `POST /api/notes/`
4. **Get All Notes**: `GET /api/notes`
5. **Get Note by ID**: `GET /api/notes/{id}`
6. **Update Note by ID**: `PUT /api/notes/{id}`
7. **Delete Note by ID**: `DELETE /api/notes/{id}`

---

## Design Patterns Used

### Singleton Pattern
The **Singleton Pattern** is used for managing the Redis client. By restricting the instantiation of the Redis client to a single object, this design ensures:
- Controlled access to the Redis cache.
- Improved performance by reusing the same client instance.
- Simplified resource management and connection handling.

### Factory Method Pattern
The **Factory Method Pattern** is applied when creating new categories for notes. This design provides:
- Flexibility to add new types of categories dynamically.
- Decoupled logic, making it easy to extend or modify category creation logic without changing existing code.

---

## Sample cURL Commands
Use these commands to interact with the API.

### Register
```bash
curl -X POST http://localhost:8080/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "username": "joe",
  "password": "123"
}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "username": "joe",
  "password": "123"
}'
```

### Add New Note
```bash
curl -X POST http://localhost:8080/api/notes/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "content": "I will get the job at respond.io",
  "category": "Work"
}'
```

### Get All Notes
```bash
curl -X GET http://localhost:8080/api/notes \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Note by ID
```bash
curl -X GET http://localhost:8080/api/notes/{id} \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Note by ID
```bash
curl -X PUT http://localhost:8080/api/notes/{id} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-d '{
  "content": "Updated note content",
  "category": "Work"
}'
```

### Delete Note by ID
```bash
curl -X DELETE http://localhost:8080/api/notes/{id} \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Notes
- Replace `YOUR_TOKEN_HERE` with a valid JWT obtained from the **Login** endpoint.
- Replace `{id}` with the actual note ID when using endpoints that require an ID.