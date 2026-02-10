# 🌍 CeylonWay - Sri Lanka Tourism Platform

<div align="center">
  <p><strong>Discover the Pearl of the Indian Ocean</strong></p>
  <p>A modern, full-stack travel platform for exploring Sri Lanka's destinations and booking accommodations</p>
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Frontend Architecture](#-frontend-architecture)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CeylonWay** is a comprehensive tourism web platform designed to help travelers explore Sri Lanka's diverse destinations and book accommodations seamlessly. Built with modern web technologies, it features an intuitive interface, interactive maps, detailed destination guides, and a robust search system for finding perfect stays.

The platform provides travelers with:
- In-depth destination information including overview, attractions, travel tips, and best visiting times
- Interactive maps powered by Leaflet/OpenStreetMap showing real geographic locations
- Property listings with detailed information, images, amenities, and pricing
- User authentication and personalized dashboard
- Responsive design for optimal experience across all devices

---

## ✨ Features

### 🗺️ **Destination Discovery**
- Browse 7+ curated destinations across Sri Lanka
- Detailed destination pages with comprehensive information:
  - Overview and city description
  - Best time to visit with seasonal insights
  - Getting there (transportation guides)
  - Local travel tips and recommendations
  - Popular attractions and activities
  - Interactive maps with precise coordinates
- High-quality destination imagery and hero sections

### 🏨 **Accommodation Booking**
- Search and filter properties (hotels & villas)
- Detailed property pages featuring:
  - Image galleries with multiple photos
  - Comprehensive amenities list
  - Pricing and ratings
  - Location maps with coordinates
  - Similar property recommendations
- Filter by location, property type, and price range

### 🔐 **User Authentication**
- Secure JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- Profile management
- Protected dashboard routes

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Fast loading times with Vite

### 🎨 **Modern UI/UX**
- Clean and intuitive interface
- Shadcn UI component library
- TailwindCSS for styling
- Smooth animations and transitions
- Loading states and error boundaries

### 🗺️ **Interactive Maps**
- Real-time map rendering with Leaflet
- Custom markers for destinations and properties
- Interactive popups with location details
- OpenStreetMap integration (no API key required)
- Coordinate-based location display

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.8.3 | Type-safe development |
| **Vite** | 5.4.19 | Build tool and dev server |
| **React Router** | 6.30.1 | Client-side routing |
| **TanStack Query** | 5.83.0 | Data fetching and caching |
| **TailwindCSS** | 3.4.17 | Utility-first CSS |
| **Shadcn UI** | Latest | Component library |
| **React Leaflet** | 4.2.1 | Map integration |
| **Leaflet** | 1.9.4 | Interactive maps |
| **Lucide React** | 0.462.0 | Icon library |
| **React Hook Form** | 7.61.1 | Form management |
| **Zod** | 3.25.76 | Schema validation |
| **Vitest** | 3.2.4 | Testing framework |

### **Backend**
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express** | 4.18.2 | Web framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 8.0.3 | ODM for MongoDB |
| **JWT** | 9.0.2 | Authentication tokens |
| **Bcrypt.js** | 2.4.3 | Password hashing |
| **Express Validator** | 7.0.1 | Input validation |
| **Multer** | 2.0.2 | File upload handling |
| **CORS** | 2.8.5 | Cross-origin support |
| **Dotenv** | 16.3.1 | Environment config |

### **Development Tools**
- **ESLint** - Code linting
- **Nodemon** - Auto-restart for backend
- **TypeScript** - Type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Project Structure

```
CeylonWay/
├── backend/                      # Backend API server
│   ├── config/
│   │   └── db.js                # MongoDB connection config
│   ├── controllers/
│   │   └── authController.js    # Authentication logic
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── upload.js            # File upload middleware
│   ├── models/
│   │   ├── Location.js          # Destination data model
│   │   ├── Property.js          # Property/accommodation model
│   │   └── User.js              # User account model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── dataRoutes.js        # Locations & properties routes
│   ├── seeds/
│   │   └── seed.js              # Database seeding script
│   ├── uploads/
│   │   └── profiles/            # User profile images
│   ├── .env.example             # Environment variables template
│   ├── package.json             # Backend dependencies
│   ├── README.md                # Backend documentation
│   └── server.js                # Express app entry point
│
├── frontend/                     # React frontend application
│   ├── public/
│   │   ├── robots.txt           # SEO robots file
│   │   └── video/               # Video assets
│   ├── src/
│   │   ├── assets/              # Static assets (images, fonts)
│   │   ├── components/
│   │   │   ├── cards/
│   │   │   │   ├── DestinationCard.tsx    # Destination preview card
│   │   │   │   └── PropertyCard.tsx       # Property preview card
│   │   │   ├── layout/
│   │   │   │   ├── Footer.tsx             # Site footer
│   │   │   │   ├── Layout.tsx             # Main layout wrapper
│   │   │   │   └── Navbar.tsx             # Navigation bar
│   │   │   ├── maps/
│   │   │   │   └── GoogleMap.tsx          # Leaflet map component
│   │   │   ├── search/
│   │   │   │   └── SearchBar.tsx          # Search functionality
│   │   │   ├── ui/                        # Shadcn UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   └── ... (40+ components)
│   │   │   ├── Loading.tsx                # Loading spinner
│   │   │   ├── NavLink.tsx                # Navigation link component
│   │   │   └── ErrorBoundary.tsx          # Error handling
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx             # Mobile detection hook
│   │   │   └── use-toast.ts               # Toast notification hook
│   │   ├── lib/
│   │   │   ├── api.ts                     # API client configuration
│   │   │   └── utils.ts                   # Utility functions
│   │   ├── pages/
│   │   │   ├── landing.tsx                # Home/landing page
│   │   │   ├── Destinations.tsx           # Destinations listing
│   │   │   ├── DestinationDetails.tsx     # Single destination view
│   │   │   ├── Stays.tsx                  # Properties listing
│   │   │   ├── PropertyDetails.tsx        # Single property view
│   │   │   ├── About.tsx                  # About page
│   │   │   ├── login&signup/
│   │   │   │   ├── Login.tsx              # Login page
│   │   │   │   └── Register.tsx           # Registration page
│   │   │   ├── dashboard/
│   │   │   │   ├── Profile.tsx            # User profile
│   │   │   │   ├── MyBookings.tsx         # Booking history
│   │   │   │   ├── Wishlist.tsx           # Saved items
│   │   │   │   ├── Reviews.tsx            # User reviews
│   │   │   │   └── Settings.tsx           # Account settings
│   │   │   ├── Dashboard.tsx              # Dashboard layout
│   │   │   └── NotFound.tsx               # 404 page
│   │   ├── test/
│   │   │   ├── example.test.ts            # Test examples
│   │   │   └── setup.ts                   # Test configuration
│   │   ├── App.tsx                        # Main app component
│   │   ├── main.tsx                       # App entry point
│   │   ├── index.css                      # Global styles
│   │   └── vite-env.d.ts                  # Vite type definitions
│   ├── .eslintrc.js                       # ESLint configuration
│   ├── components.json                    # Shadcn UI config
│   ├── index.html                         # HTML template
│   ├── package.json                       # Frontend dependencies
│   ├── postcss.config.js                  # PostCSS config
│   ├── tailwind.config.ts                 # TailwindCSS config
│   ├── tsconfig.json                      # TypeScript config
│   ├── vite.config.ts                     # Vite configuration
│   └── vitest.config.ts                   # Vitest test config
│
├── package.json                           # Root package.json
├── README.md                              # Main documentation (this file)
└── DESTINATION_SETUP_GUIDE.md            # Destination setup guide
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) - Comes with Node.js
- **MongoDB** (v6.x or higher) - [Download](https://www.mongodb.com/try/download/community)
  - Local installation OR MongoDB Atlas account
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version    # Should be v18.x or higher
npm --version     # Should be v9.x or higher
mongod --version  # Should be v6.x or higher (if using local MongoDB)
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ceylonway.git
cd ceylonway
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install --legacy-peer-deps
```

> **Note:** The `--legacy-peer-deps` flag resolves peer dependency conflicts with react-leaflet and React 18.

---

## ⚙️ Configuration

### Backend Configuration

1. **Create Environment File**

```bash
cd backend
cp .env.example .env
```

2. **Configure Environment Variables**

Edit `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Choose one:
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/ceylonway

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ceylonway

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8081
```

3. **Database Setup**

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `.env` file

4. **Seed Database**

```bash
cd backend
node seeds/seed.js
```

This will populate your database with:
- 7 destinations (Galle, Sigiriya, Mirissa, Ella, Kandy, Nuwara Eliya, Jaffna)
- 8 properties (hotels and villas) with real coordinates
- Sample user data

### Frontend Configuration

The frontend uses the backend API at `http://localhost:5000` by default. This is configured in `frontend/src/lib/api.ts`.

To change the API URL:

```typescript
// frontend/src/lib/api.ts
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on **http://localhost:5000**

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on **http://localhost:8081** (or the next available port)

### Verify Everything Works

1. **Check Backend Health:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"Ceylonway API is running"}`

2. **Open Frontend:**
   Navigate to `http://localhost:8081` in your browser

3. **Test Database:**
   - Visit `/destinations` to see location listings
   - Visit `/stays` to see property listings
   - Click on any destination to see details with map

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Location/Destination Endpoints

#### Get All Locations
```http
GET /locations
```

**Response:**
```json
[
  {
    "id": "galle",
    "name": "Galle",
    "country": "Sri Lanka",
    "image": "/api/placeholder/800/600",
    "rating": 4.8,
    "reviewCount": 1250,
    "propertyCount": 45,
    "category": "coastal",
    "lat": 6.0535,
    "lng": 80.2210,
    "description": "A historic coastal city...",
    "bestTimeToVisit": "December to March",
    "gettingThere": "...",
    "travelTips": "...",
    "attractions": [...],
    "activities": [...]
  }
]
```

#### Get Location by ID
```http
GET /locations/:id
```

Example: `GET /locations/galle`

### Property Endpoints

#### Get All Properties
```http
GET /properties
```

**Query Parameters:**
- `locationId` - Filter by location (e.g., `galle`, `sigiriya`)
- `type` - Filter by property type (`hotel`, `villa`, or `all`)
- `priceRange` - Filter by price range (`budget`, `mid`, `luxury`)

**Example:**
```http
GET /properties?locationId=galle&type=hotel&priceRange=mid
```

#### Get Property by ID
```http
GET /properties/:id
```

**Response:**
```json
{
  "id": "tamarind-hill",
  "name": "Tamarind Hill",
  "location": "Galle",
  "locationId": "galle",
  "image": "/api/placeholder/800/600",
  "images": ["...", "...", "..."],
  "price": 185,
  "rating": 4.8,
  "reviewCount": 342,
  "type": "hotel",
  "amenities": ["Free WiFi", "Pool", "Spa", "Restaurant"],
  "description": "...",
  "lat": 6.0535,
  "lng": 80.2210
}
```

### Health Check
```http
GET /health
```

Returns API status and timestamp.

---

## 🗄️ Database Schema

### Location Model
```javascript
{
  id: String,              // Unique identifier (e.g., "galle")
  name: String,            // Display name
  country: String,         // Default: "Sri Lanka"
  image: String,           // Main image URL
  images: [String],        // Additional images
  rating: Number,          // 0-5 rating
  reviewCount: Number,     // Number of reviews
  propertyCount: Number,   // Available properties
  category: String,        // e.g., "coastal", "cultural"
  lat: Number,             // Latitude
  lng: Number,             // Longitude
  description: String,     // Overview
  bestTimeToVisit: String, // Seasonal info
  gettingThere: String,    // Transportation guide
  travelTips: String,      // Local tips
  attractions: [String],   // Popular attractions
  activities: [String]     // Things to do
}
```

### Property Model
```javascript
{
  id: String,              // Unique identifier
  name: String,            // Property name
  location: String,        // City name
  locationId: String,      // Reference to Location.id
  image: String,           // Main image URL
  images: [String],        // Gallery images
  price: Number,           // Price per night
  rating: Number,          // 0-5 rating
  reviewCount: Number,     // Number of reviews
  type: String,            // "hotel" or "villa"
  amenities: [String],     // Available amenities
  description: String,     // Property description
  lat: Number,             // Latitude
  lng: Number              // Longitude
}
```

### User Model
```javascript
{
  name: String,            // Full name
  email: String,           // Unique email
  password: String,        // Hashed password
  profileImage: String,    // Profile picture URL
  phone: String,           // Contact number
  bio: String,             // User bio
  dateOfBirth: Date,       // Birth date
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  role: String,            // "user" or "admin"
  isEmailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Frontend Architecture

### Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | landing.tsx | Home page with hero and featured destinations |
| `/destinations` | Destinations.tsx | Browse all destinations |
| `/destinations/:id` | DestinationDetails.tsx | Detailed destination information with map |
| `/stays` | Stays.tsx | Browse properties with filters |
| `/stays/:id` | PropertyDetails.tsx | Property details with gallery and map |
| `/about` | About.tsx | About the platform |
| `/login` | Login.tsx | User login |
| `/register` | Register.tsx | User registration |
| `/dashboard` | Dashboard.tsx | User dashboard layout |
| `/dashboard/profile` | Profile.tsx | User profile management |
| `/dashboard/bookings` | MyBookings.tsx | Booking history |
| `/dashboard/wishlist` | Wishlist.tsx | Saved destinations/properties |
| `/dashboard/reviews` | Reviews.tsx | User reviews |
| `/dashboard/settings` | Settings.tsx | Account settings |

### Key Components

#### Maps
- **GoogleMap.tsx** - Reusable Leaflet map component with:
  - Custom marker icons
  - Interactive popups
  - Coordinate display
  - Responsive sizing
  - Client-side mounting (prevents SSR issues)

#### Cards
- **DestinationCard.tsx** - Preview card for destinations
- **PropertyCard.tsx** - Preview card for properties

#### Layout
- **Layout.tsx** - Main layout wrapper with navbar and footer
- **Navbar.tsx** - Responsive navigation with mobile menu
- **Footer.tsx** - Site footer with links

#### Search
- **SearchBar.tsx** - Search functionality for destinations and properties

### State Management
- **TanStack Query** for server state
- **React Context** for auth state
- **Local component state** with useState

### Styling
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Pre-built accessible components
- **Custom CSS** - Additional styles in index.css

---

## 🛠️ Development

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

#### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
```

### Code Organization Best Practices

1. **Component Structure**
   - One component per file
   - Use TypeScript interfaces for props
   - Keep components small and focused

2. **API Calls**
   - Centralize in `lib/api.ts`
   - Use TanStack Query for caching
   - Handle errors gracefully

3. **Styling**
   - Use TailwindCSS utilities first
   - Create custom classes for repeated patterns
   - Follow mobile-first approach

4. **Type Safety**
   - Define interfaces for all data models
   - Use type annotations
   - Avoid `any` type

### Testing

```bash
cd frontend
npm test
```

Tests are located in `frontend/src/test/`

---

## 🚢 Deployment

### Backend Deployment

#### Prerequisites
- MongoDB Atlas account
- Hosting service (Heroku, DigitalOcean, Railway, etc.)

#### Steps
1. Set production environment variables
2. Update CORS origins
3. Deploy to hosting platform
4. Run database migrations

#### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<strong-secret-key>
FRONTEND_URL=https://yourdomain.com
```

### Frontend Deployment

#### Prerequisites
- Hosting service (Vercel, Netlify, etc.)

#### Steps

1. **Build for Production**
```bash
cd frontend
npm run build
```

2. **Update API URL**
   - Change `API_BASE_URL` in `lib/api.ts` to production URL

3. **Deploy**
   - **Vercel:** `vercel deploy`
   - **Netlify:** Drag `dist` folder or use CLI

#### Vercel Deployment
```bash
npm install -g vercel
cd frontend
vercel
```

#### Netlify Deployment
```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**
```bash
git clone https://github.com/yourusername/ceylonway.git
cd ceylonway
git checkout -b feature/your-feature-name
```

2. **Make Changes**
   - Follow code style guidelines
   - Write clear commit messages
   - Add tests for new features

3. **Test Your Changes**
```bash
# Test backend
cd backend
npm start

# Test frontend
cd frontend
npm run dev
npm test
```

4. **Submit Pull Request**
   - Provide clear PR description
   - Reference related issues
   - Wait for review

### Code Style

- Use ESLint for JavaScript/TypeScript
- Follow React best practices
- Write meaningful comments
- Keep functions small and focused

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👥 Authors

- **Your Name** - Initial work - [GitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- **Shadcn UI** - Beautiful component library
- **Leaflet** - Open-source mapping library
- **OpenStreetMap** - Free map data
- **TailwindCSS** - Utility-first CSS framework
- **Sri Lanka Tourism** - Destination inspiration

---

## 📧 Contact & Support

For questions, issues, or suggestions:

- **Email:** support@ceylonway.com
- **GitHub Issues:** [Create an issue](https://github.com/yourusername/ceylonway/issues)
- **Documentation:** [Wiki](https://github.com/yourusername/ceylonway/wiki)

---

## 🗺️ Roadmap

### Current Version (v1.0)
- ✅ Destination browsing with detailed pages
- ✅ Property listings and details
- ✅ Interactive maps
- ✅ User authentication
- ✅ Basic dashboard

### Upcoming Features
- 🔄 Booking system
- 🔄 Payment integration
- 🔄 Reviews and ratings
- 🔄 Wishlist functionality
- 🔄 Email notifications
- 🔄 Advanced search filters
- 🔄 Admin dashboard
- 🔄 Multi-language support

---

<div align="center">
  <p>Made with ❤️ for Sri Lanka</p>
  <p><strong>Happy Traveling! 🌴</strong></p>
</div>