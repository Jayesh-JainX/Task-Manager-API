# Task Manager API

A RESTful API for managing tasks with user authentication using Express.js, TypeScript, and Swagger documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Server

Start the development server:

```bash
npm start
```

The server will start on `http://localhost:3000`

### Running Tests

Execute the test suite:

```bash
npm test
```

## 📚 API Documentation (Swagger)

### Step 1: Access Swagger UI

1. Start your server:

```bash
npm run dev
```

2. Open your browser and navigate to:

```
http://localhost:3000/api-docs
```

### Step 2: Register a New User

1. In the Swagger UI, locate the Users section and click on `POST /users`
2. Click "Try it out"
3. Enter the request body:

```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

4. Click "Execute"
5. Verify response status is 201 (User registered successfully)

### Step 3: Login and Get JWT Token

1. Go to `POST /login`
2. Click "Try it out"
3. Enter the same credentials:

```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

4. Click "Execute"
5. Copy the JWT token from the response

### Step 4: Authorize with JWT Token

1. Click the "Authorize" button at the top
2. Enter the token with format:

```
Bearer YOUR_JWT_TOKEN
```

3. Click "Authorize" and "Close"

### Step 5: Create a Task

1. Go to `POST /tasks`
2. Click "Try it out"
3. Enter task details:

```json
{
  "title": "First Task",
  "description": "Complete the project",
  "userId": "USER_ID_FROM_STEP_2",
  "status": "pending"
}
```

4. Click "Execute"
5. Verify response status is 201

### Step 6: Get User Tasks

1. Go to `GET /tasks`
2. Click "Try it out"
3. Enter your user ID as query parameter
4. Click "Execute"
5. View the list of tasks in response

### Step 7: Update Task Status

1. Go to `PATCH /tasks/{id}/status`
2. Enter the task ID
3. Update status:

```json
{
  "status": "in-progress"
}
```

4. Click "Execute"

### Step 8: Delete a Task

1. Go to `DELETE /tasks/{id}`
2. Enter the task ID
3. Click "Execute"
4. Verify response status is 200

## 🚨 Common Issues

- **401 Unauthorized**: Ensure you've properly authorized with the JWT token
- **409 Conflict**: Check for duplicate task titles
- **400 Bad Request**: Verify all required fields are provided

## 🔐 Security

- All endpoints except registration and login require JWT authentication
- Tokens expire after 1 hour
- Passwords should be properly hashed in production environment

## 📝 API Endpoints

### Users

- `POST /users` - Register new user
- `POST /login` - User login

### Tasks

- `POST /tasks` - Create new task
- `GET /tasks` - Get user's tasks
- `PATCH /tasks/{id}/status` - Update task status
- `DELETE /tasks/{id}` - Delete task
