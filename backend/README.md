# 🚀 CeylonWay Backend API

RESTful API backend for the CeylonWay travel platform, built with Node.js, Express, and MongoDB. Provides endpoints for authentication, destinations/locations, and property/accommodation management.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Setup & Installation](#-setup--installation)
- [Environment Configuration](#-environment-configuration)
- [Database Models](#-database-models)
- [API Endpoints](#-api-endpoints)
- [Authentication Flow](#-authentication-flow)
- [Middleware](#-middleware)
- [Error Handling](#-error-handling)
- [Database Seeding](#-database-seeding)
- [Testing](#-testing)

---

## ✨ Features

### Authentication & User Management
- User registration with email validation
- Secure login with JWT token generation
- Password hashing using bcrypt (salt rounds: 10)
- Profile management (update name, email, bio, etc.)
- Profile image upload with Multer
- Password change functionality
- Admin role-based access control
- Token-based protected routes

### Destination Management
- Retrieve all Sri Lankan destinations
- Get individual destination by ID
- Detailed destination information including:
  - Coordinates (latitude/longitude)
  - Ratings and review counts
  - Category classification
  - Travel tips and best visiting times
  - Attractions and activities lists

### Property/Accommodation Management
- List all properties (hotels & villas)
- Filter by location, type, and price range
- Individual property details
- Property ratings and reviews
- Amenities listing
- Image galleries
- Coordinate-based location data

### System Features
- CORS enabled for frontend communication
- Health check endpoint for monitoring
- Comprehensive error handling
- Input validation using express-validator
- Static file serving for uploads

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express** | 4.18.2 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 8.0.3 | MongoDB ODM with schema validation |
| **JWT** | 9.0.2 | Token-based authentication |
| **bcryptjs** | 2.4.3 | Password hashing algorithm |
| **Multer** | 2.0.2 | File upload middleware |
| **express-validator** | 7.0.1 | Request validation |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **dotenv** | 16.3.1 | Environment variable management |
| **Nodemon** | 3.0.2 | Development auto-reload (dev dependency) |

---

## 🏗️ Project Architecture

```
backend/
├── config/
│   └── db.js                    # MongoDB connection configuration
│
├── controllers/
│   └── authController.js        # Authentication & user controller
│                                # - register, login, getMe
│                                # - updateProfile, changePassword
│                                # - updateProfileImage, getAllUsers
│
├── middleware/
│   ├── auth.js                  # JWT authentication middleware
│   │                            # - protect: Verify JWT token
│   │                            # - admin: Check admin role
│   └── upload.js                # Multer file upload configuration
│                                # - Handles profile image uploads
│
├── models/
│   ├── User.js                  # User schema & model
│   │                            # Fields: name, email, password, 
│   │                            # profileImage, phone, bio, DOB,
│   │                            # address, role, isEmailVerified
│   ├── Location.js              # Destination/location schema
│   │                            # Fields: id, name, country, images,
│   │                            # rating, category, coordinates,
│   │                            # description, attractions, activities
│   └── Property.js              # Property/accommodation schema
│                                # Fields: id, name, location, images,
│                                # price, rating, type, amenities,
│                                # coordinates, description
│
├── routes/
│   ├── auth.js                  # Authentication routes
│   │                            # - POST /register, /login
│   │                            # - GET /me, /users
│   │                            # - PUT /update-profile, /change-password
│   │                            # - POST /profile-image
│   └── dataRoutes.js            # Data routes (locations & properties)
│                                # - GET /locations, /locations/:id
│                                # - GET /properties, /properties/:id
│
├── seeds/
│   └── seed.js                  # Database seeding script
│                                # Seeds: 7 locations, 8 properties
│
├── uploads/
│   └── profiles/                # User profile image storage
│
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies & scripts
├── server.js                    # Express app entry point
└── README.md                    # This documentation
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install all dependencies listed in `package.json`:
- Production: express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv, multer, express-validator
- Development: nodemon

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ceylonway
JWT_SECRET=your_secret_key_min_32_characters_recommended
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8081
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
1. Create cluster at mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGODB_URI in .env

### Step 4: Seed Database (Optional but Recommended)

```bash
node seeds/seed.js
```

This populates the database with:
- **7 Destinations:** Galle (6.0535°N, 80.2210°E), Sigiriya (7.9568°N, 80.7597°E), Mirissa (5.9450°N, 80.4697°E), Ella (6.8667°N, 81.0467°E), Kandy (7.2906°N, 80.6337°E), Nuwara Eliya (6.9497°N, 80.7891°E), Jaffna (9.6615°N, 80.0255°E)
- **8 Properties:** Includes Tamarind Hill, Heritage Villa, Sigiriya Rock View, Whale Watching Resort, Ella Jungle Villa, The Secret Ella, White Monkey Temple Hotel, Jaffna Heritage Hotel

### Step 5: Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start at: **http://localhost:5000**

### Step 6: Verify Installation

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"Ceylonway API is running","timestamp":"2026-02-10T..."}
```

---

## ⚙️ Environment Configuration

### Required Environment Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PORT` | Server port number | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/ceylonway` |
| `JWT_SECRET` | Secret key for JWT signing | Min 32 characters recommended |
| `JWT_EXPIRE` | Token expiration time | `7d`, `24h`, `30m` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:8081` |

### .env.example Template

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ceylonway
# For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/ceylonway

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8081
```

---

## 🗄️ Database Models

### User Model (`models/User.js`)

**Schema Definition:**
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase, validated),
  password: String (required, min 6 chars, not returned in queries),
  profileImage: String (default: placeholder URL),
  phone: String (validated format),
  bio: String (max 500 chars),
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  role: String (enum: ['user', 'admin'], default: 'user'),
  isEmailVerified: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Methods:**
- `matchPassword(enteredPassword)` - Compare hashed password
- `getSignedJwtToken()` - Generate JWT token

**Hooks:**
- Pre-save: Hash password if modified (bcrypt, 10 salt rounds)

### Location Model (`models/Location.js`)

**Schema Definition:**
```javascript
{
  id: String (required, unique) - e.g., 'galle', 'sigiriya',
  name: String (required) - Display name,
  country: String (default: 'Sri Lanka'),
  image: String (required) - Main hero image,
  images: [String] - Gallery images,
  rating: Number (0-5, default: 0),
  reviewCount: Number (default: 0),
  propertyCount: Number (default: 0),
  category: String (required) - e.g., 'coastal', 'cultural', 'hill_country',
  lat: Number (required) - Latitude coordinate,
  lng: Number (required) - Longitude coordinate,
  description: String - Overview text,
  bestTimeToVisit: String - Seasonal information,
  gettingThere: String - Transportation guide,
  travelTips: String - Local tips and advice,
  attractions: [String] - Array of attraction names,
  activities: [String] - Array of activity descriptions,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Property Model (`models/Property.js`)

**Schema Definition:**
```javascript
{
  id: String (required, unique) - e.g., 'tamarind-hill',
  name: String (required) - Property name,
  location: String (required) - City name,
  locationId: String (required) - Reference to Location.id,
  image: String (required) - Main property image,
  images: [String] - Gallery images,
  price: Number (required) - Price per night in USD,
  rating: Number (0-5, default: 0),
  reviewCount: Number (default: 0),
  type: String (enum: ['hotel', 'villa'], required),
  amenities: [String] - e.g., ['Free WiFi', 'Pool', 'Spa'],
  description: String - Property description,
  lat: Number (default: 7.8731) - Latitude,
  lng: Number (default: 80.7718) - Longitude,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints (`/api/auth`)

#### 1. Register New User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Success Response (201):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "profileImage": "https://via.placeholder.com/150?text=User"
  }
}

Error Response (400):
{
  "success": false,
  "message": "User already exists"
}
```

**Validation Rules:**
- Name: Required, trimmed
- Email: Valid email format, unique
- Password: Minimum 6 characters

**Implementation Details:**
- Password is hashed using bcrypt with 10 salt rounds
- JWT token generated with 7-day expiration
- User created with default role 'user'

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Success Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

Error Response (401):
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Implementation:**
- Password compared using bcrypt.compare()
- JWT token generated on successful authentication
- Password field excluded from response

#### 3. Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>

Success Response (200):
{
  "success": true,
  "user": {
    "id": "65f1234567890abcdef12345",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImage": "https://via.placeholder.com/150?text=User",
    "phone": "+94771234567",
    "bio": "Travel enthusiast",
    "role": "user",
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
}

Error Response (401):
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Middleware:** `protect` - Verifies JWT token from Authorization header

#### 4. Update Profile (Protected)
```http
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "name": "John Updated",
  "email": "john.new@example.com",
  "phone": "+94771234567",
  "bio": "Love traveling around Sri Lanka",
  "dateOfBirth": "1990-05-15",
  "address": {
    "street": "123 Main St",
    "city": "Colombo",
    "state": "Western",
    "country": "Sri Lanka",
    "zipCode": "00100"
  }
}

Success Response (200):
{
  "success": true,
  "message": "Profile updated successfully",
  "user": { /* updated user object */ }
}
```

**Implementation:**
- All fields are optional
- Email uniqueness validated if changed
- Password field never updated through this endpoint

#### 5. Change Password (Protected)
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}

Success Response (200):
{
  "success": true,
  "message": "Password changed successfully"
}

Error Response (400):
{
  "success": false,
  "message": "Current password is incorrect"
}
```

**Implementation:**
- Current password verified using bcrypt
- New password hashed before saving
- New JWT token not issued (existing tokens remain valid)

#### 6. Upload Profile Image (Protected)
```http
POST /api/auth/profile-image
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
profileImage: <file>

Success Response (200):
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "filePath": "/uploads/profiles/1234567890-profile.jpg"
}
```

**Implementation:**
- Uses Multer middleware for file handling
- Stores in `uploads/profiles/` directory
- Filename: timestamp + sanitized original name
- Accepted formats: jpg, jpeg, png, gif
- Max file size: 5MB

#### 7. Get All Users (Admin Only)
```http
GET /api/auth/users
Authorization: Bearer <admin_token>

Success Response (200):
{
  "success": true,
  "count": 42,
  "users": [
    {
      "id": "...",
      "name": "User 1",
      "email": "user1@example.com",
      "role": "user",
      "createdAt": "..."
    },
    // ... more users
  ]
}

Error Response (403):
{
  "success": false,
  "message": "Not authorized as admin"
}
```

**Middleware:** `protect` + `admin` - User must have role='admin'

---

### Location/Destination Endpoints (`/api`)

#### 8. Get All Locations
```http
GET /api/locations

Success Response (200):
[
  {
    "_id": "65f...",
    "id": "galle",
    "name": "Galle",
    "country": "Sri Lanka",
    "image": "/api/placeholder/800/600",
    "images": ["img1.jpg", "img2.jpg"],
    "rating": 4.8,
    "reviewCount": 1250,
    "propertyCount": 12,
    "category": "coastal",
    "lat": 6.0535,
    "lng": 80.2210,
    "description": "Historic coastal city with Dutch fort...",
    "bestTimeToVisit": "December to March for best weather",
    "gettingThere": "3 hours by train from Colombo...",
    "travelTips": "Visit the fort at sunset...",
    "attractions": ["Galle Fort", "Lighthouse", "Dutch Museum"],
    "activities": ["Fort Walk", "Beach Activities", "Shopping"]
  },
  // ... 6 more locations
]
```

**Implementation:**
- Returns all locations from database
- No authentication required (public endpoint)
- Sorted by name (ascending)

#### 9. Get Location by ID
```http
GET /api/locations/:id

Example: GET /api/locations/galle

Success Response (200):
{
  "_id": "65f...",
  "id": "galle",
  "name": "Galle",
  // ... all location fields
}

Error Response (404):
{
  "msg": "Location not found"
}
```

**Implementation:**
- Queries by custom `id` field (not MongoDB _id)
- Returns 404 if location doesn't exist

---

### Property/Accommodation Endpoints (`/api`)

#### 10. Get All Properties
```http
GET /api/properties

Query Parameters (all optional):
- locationId: Filter by location (e.g., ?locationId=galle)
- type: Filter by type (e.g., ?type=hotel or ?type=villa)
- priceRange: Filter by price (budget/mid/luxury)

Examples:
GET /api/properties
GET /api/properties?locationId=galle
GET /api/properties?type=hotel
GET /api/properties?locationId=galle&type=hotel&priceRange=mid

Success Response (200):
[
  {
    "_id": "65f...",
    "id": "tamarind-hill",
    "name": "Tamarind Hill",
    "location": "Galle",
    "locationId": "galle",
    "image": "/api/placeholder/800/600",
    "images": ["img1.jpg", "img2.jpg", "img3.jpg"],
    "price": 185,
    "rating": 4.8,
    "reviewCount": 342,
    "type": "hotel",
    "amenities": ["Free WiFi", "Pool", "Spa", "Restaurant", "Beach Access"],
    "description": "Luxury hotel overlooking Galle Fort...",
    "lat": 6.0535,
    "lng": 80.2210
  },
  // ... more properties
]
```

**Price Range Logic:**
- `budget`: price < $100
- `mid`: price $100-$300
- `luxury`: price > $300

**Implementation:**
- Dynamic query building based on parameters
- No authentication required
- Returns empty array if no matches

#### 11. Get Property by ID
```http
GET /api/properties/:id

Example: GET /api/properties/tamarind-hill

Success Response (200):
{
  "_id": "65f...",
  "id": "tamarind-hill",
  "name": "Tamarind Hill",
  // ... all property fields
}

Error Response (404):
{
  "msg": "Property not found"
}
```

---

### System Endpoints

#### 12. Health Check
```http
GET /api/health

Success Response (200):
{
  "status": "OK",
  "message": "Ceylonway API is running",
  "timestamp": "2026-02-10T12:34:56.789Z"
}
```

**Purpose:** Monitor API availability, used for uptime checks

---
---

## 🔐 Authentication Flow

### JWT Token Structure

```javascript
// Token Payload
{
  id: "user_mongodb_id",
  iat: 1707566400,  // Issued at (timestamp)
  exp: 1708171200   // Expiration (iat + 7 days)
}

// Token Header
{
  alg: "HS256",
  typ: "JWT"
}
```

### How Authentication Works

1. **User Registration/Login:**
   - User sends credentials to `/auth/register` or `/auth/login`
   - Server validates input using express-validator
   - Password hashed with bcrypt (10 salt rounds)
   - JWT token generated using user ID and JWT_SECRET
   - Token sent to client in response

2. **Making Authenticated Requests:**
   - Client includes token in Authorization header:
     ```
     Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```

3. **Token Verification (protect middleware):**
   - Extract token from Authorization header
   - Verify token signature using JWT_SECRET
   - Decode payload to get user ID
   - Query database for user
   - Attach user object to `req.user`
   - Continue to route handler

4. **Admin Check (admin middleware):**
   - Runs after `protect` middleware
   - Checks if `req.user.role === 'admin'`
   - Returns 403 if not admin

### Token Storage Recommendations

**Frontend Implementation:**
```javascript
// Store token after login
localStorage.setItem('token', response.data.token);

// Include in requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Remove on logout
localStorage.removeItem('token');
```

---

## 🔧 Middleware

### 1. Authentication Middleware (`middleware/auth.js`)

#### protect
- **Purpose:** Verify JWT token and authenticate user
- **Usage:** Apply to protected routes
- **Process:**
  1. Extract token from `Authorization: Bearer <token>`
  2. Verify token with `jwt.verify(token, JWT_SECRET)`
  3. Find user by decoded ID
  4  Attach user to `req.user`
  5. Call `next()` or return 401 error

**Code Structure:**
```javascript
exports.protect = async (req, res, next) => {
  let token;
  
  // Check authorization header
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ 
      message: 'Not authorized to access this route' 
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    req.user = await User.findById(decoded.id).select('-password');
    
    next();
  } catch (err) {
    return res.status(401).json({ 
      message: 'Not authorized to access this route' 
    });
  }
};
```

#### admin
- **Purpose:** Ensure user has admin role
- **Usage:** Chain after `protect` middleware
- **Process:**
  1. Check if `req.user.role === 'admin'`
  2. Call `next()` or return 403 error

**Code Structure:**
```javascript
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'Not authorized as admin' 
    });
  }
};
```

### 2. Upload Middleware (`middleware/upload.js`)

**Purpose:** Handle multipart/form-data file uploads using Multer

**Configuration:**
```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});
```

**Usage:**
```javascript
router.post('/profile-image', 
  protect, 
  upload.single('profileImage'), 
  updateProfileImage
);
```

---

## ⚠️ Error Handling

### Error Response Format

All errors follow this structure:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Error Handling Middleware (`server.js`)

```javascript
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

### Common Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Invalid/missing JWT token |
| 403 | Forbidden | Non-admin accessing admin route |
| 404 | Not Found | Location/Property doesn't exist |
| 500 | Server Error | Database connection failure |

### Input Validation Errors

Express-validator provides detailed error messages:
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## 🌱 Database Seeding

### Seed Script (`seeds/seed.js`)

**Purpose:** Populate database with initial data for development/testing

**What it Seeds:**

**7 Locations:**
1. **Galle** (6.0535°N, 80.2210°E) - Coastal, Historic fort city
2. **Sigiriya** (7.9568°N, 80.7597°E) - Cultural, Ancient rock fortress
3. **Mirissa** (5.9450°N, 80.4697°E) - Coastal, Beach & whale watching
4. **Ella** (6.8667°N, 81.0467°E) - Hill Country, Tea plantations & hiking
5. **Kandy** (7.2906°N, 80.6337°E) - Cultural, Sacred city with temple
6. **Nuwara Eliya** (6.9497°N, 80.7891°E) - Hill Country, Tea country
7. **Jaffna** (9.6615°N, 80.0255°E) - Cultural, Northern heritage city

**8 Properties:**
1. **Tamarind Hill** (Galle) - Hotel, $185/night
2. **Heritage Villa** (Galle) - Villa, $320/night
3. **Sigiriya Rock View** (Sigiriya) - Hotel, $240/night
4. **Mirissa Whale Watching Resort** (Mirissa) - Hotel, $165/night
5. **Ella Jungle Villa** (Ella) - Villa, $145/night
6. **The Secret Ella** (Ella) - Hotel, $198/night
7. **White Monkey Temple Hotel** (Kandy) - Hotel, $175/night
8. **Jaffna Heritage Hotel** (Jaffna) - Hotel, $95/night

### Running the Seed

```bash
cd backend
node seeds/seed.js
```

**Output:**
```
🚀 Starting database seed...
✅ MongoDB Connected: localhost
🗑️  Cleared existing data
✅ Seeded 7 locations
✅ Seeded 8 properties
✅ Database seeded successfully!
```

**Important Notes:**
- Clears existing Location and Property data before seeding
- Does NOT affect User collection
- Safe to run multiple times (idempotent)
- Uses same MongoDB connection as main app

---

## 🧪 Testing

### Manual Testing with cURL

**Test Registration:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Test Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Test Protected Route:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Test Locations:**
```bash
curl http://localhost:5000/api/locations
curl http://localhost:5000/api/locations/galle
```

**Test Properties:**
```bash
curl http://localhost:5000/api/properties
curl "http://localhost:5000/api/properties?locationId=galle&type=hotel"
curl http://localhost:5000/api/properties/tamarind-hill
```

### Testing with Postman

1. Import collection (create JSON file):
```json
{
  "info": { "name": "CeylonWay API", "schema": "..." },
  "item": [
    {
      "name": "Auth",
      "item": [
        { "name": "Register", "request": { "method": "POST", "url": "{{base_url}}/auth/register" } },
        { "name": "Login", "request": { "method": "POST", "url": "{{base_url}}/auth/login" } }
      ]
    }
  ],
  "variable": [
    { "key": "base_url", "value": "http://localhost:5000/api" }
  ]
}
```

2. Set up environment variables in Postman:
   - `base_url`: http://localhost:5000/api
   - `token`: (paste JWT token after login)

---

## 🔒 Security Best Practices

### Current Implementation

✅ **Password Security:**
- Bcrypt hashing with 10 salt rounds
- Passwords never returned in API responses
- Separate endpoint for password changes

✅ **JWT Security:**
- Tokens signed with strong secret
- 7-day expiration
- Token verification on protected routes

✅ **Input Validation:**
- Express-validator on all input fields
- Email format validation
- Password strength requirements
- XSS protection through sanitization

✅ **CORS Configuration:**
- Restricted to specific frontend origins
- Credentials support enabled
- Prevents unauthorized API access

✅ **Error Handling:**
- No sensitive data in error messages
- Stack traces only in development
- Consistent error response format

### Recommended Enhancements

🔄 **For Production:**
- Add rate limiting (express-rate-limit)
- Implement refresh tokens
- Add helmet for security headers
- Enable HTTPS only
- Add request logging (morgan)
- Implement email verification
- Add password reset functionality
- Use environment-specific CORS origins
- Implement API versioning
- Add input sanitization for NoSQL injection

---

## 🚀 Deployment

### Preparation

1. **Environment Variables**
   - Set production MONGODB_URI (MongoDB Atlas)
   - Generate strong JWT_SECRET (min 32 characters)
   - Set NODE_ENV=production
   - Configure production FRONTEND_URL

2. **Database**
   - Create MongoDB Atlas cluster
   - Whitelist deployment server IP
   - Run seed script on production DB (optional)

3. **Build**
```bash
npm install --production
```

### Deployment Platforms

**Option 1: Heroku**
```bash
heroku create ceylonway-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

**Option 2: Railway**
- Connect GitHub repository
- Set environment variables in dashboard
- Deploy automatically on push

**Option 3: DigitalOcean App Platform**
- Create app from GitHub
- Configure environment variables
- Set run command: `npm start`

### Post-Deployment

1. **Verify Health:**
```bash
curl https://your-api-domain.com/api/health
```

2. **Test Endpoints:**
```bash
curl https://your-api-domain.com/api/locations
```

3. **Monitor Logs:**
- Check application logs for errors
- Monitor database connections
- Set up uptime monitoring

---

## 📚 Additional Resources

### Useful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Seed database
node seeds/seed.js

# Check MongoDB connection
mongosh "mongodb://localhost:27017/ceylonway"
```

### File Upload Path

Profile images are stored at:
```
backend/uploads/profiles/1234567890-filename.jpg
```

Accessible via:
```
http://localhost:5000/uploads/profiles/1234567890-filename.jpg
```

### Database Connection String Formats

**Local:**
```
mongodb://localhost:27017/ceylonway
```

**Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/ceylonway?retryWrites=true&w=majority
```

**With Auth:**
```
mongodb://username:password@localhost:27017/ceylonway?authSource=admin
```

---

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
```
Error: MongoNetworkError: failed to connect to server
```
Solution: Ensure MongoDB is running (`net start MongoDB` on Windows)

**2. JWT Token Invalid**
```
Error: Not authorized to access this route
```
Solution: Check JWT_SECRET matches between token generation and verification

**3. CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
Solution: Add frontend URL to CORS whitelist in server.js

**4. File Upload Error**
```
Error: ENOENT: no such file or directory, open 'uploads/profiles/...'
```
Solution: Create uploads/profiles directory manually

**5. Validation Error**
```
Error: User validation failed: email: Path `email` is required
```
Solution: Ensure all required fields are provided in request body

---

## 📞 Support

For issues, questions, or contributions:
- Check existing issues in GitHub
- Create new issue with detailed description
- Include error messages and environment details
- See main project README for contact information

---

**Last Updated:** February 10, 2026  
**API Version:** 1.0.0  
**Node.js Version:** 18+  
**MongoDB Version:** 6+
