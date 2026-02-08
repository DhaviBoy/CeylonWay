# Ceylonway Backend API

Backend API for the Ceylonway travel platform with authentication functionality.

## Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- MongoDB database
- Input validation
- Error handling

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values in `.env`:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     FRONTEND_URL=http://localhost:5173
     ```

3. **Start MongoDB:**
   - Make sure MongoDB is running locally, or
   - Use MongoDB Atlas (cloud database)

4. **Run the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

#### Update Profile (Protected)
```
PUT /api/auth/update-profile
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

### Health Check
```
GET /api/health
```

## Response Format

Success response:
```json
{
  "success": true,
  "message": "Operation successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  }
}
```

Error response:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   └── authController.js  # Authentication logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   └── User.js            # User model
├── routes/
│   └── auth.js            # Authentication routes
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
├── server.js             # Main server file
└── README.md             # This file
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Input validation on all routes
- Protected routes require valid JWT token
- CORS configured for frontend access
- Passwords not returned in API responses

## Next Steps

To integrate with your frontend:

1. Install axios in frontend: `npm install axios`
2. Create an API service to call these endpoints
3. Store JWT token in localStorage or cookies
4. Include token in Authorization header for protected routes
