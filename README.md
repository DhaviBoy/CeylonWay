# 🌍 CeylonWay - Sri Lanka Tourism Platform

<div align="center">
  <p><strong>Discover the Pearl of the Indian Ocean</strong></p>
  <p>A modern, full-stack travel platform for exploring Sri Lanka's destinations and booking accommodations</p>
  
  ![React](https://img.shields.io/badge/React-18.3.1-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
  ![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
  ![License](https://img.shields.io/badge/License-MIT-yellow)
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Demo](#-demo)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**CeylonWay** is a comprehensive tourism web platform designed to help travelers explore Sri Lanka's diverse destinations and book accommodations seamlessly. Built with modern web technologies, it features an intuitive interface, interactive maps, detailed destination guides, and a robust search system.

**Key Highlights:**
- 🗺️ Interactive maps with real geographic locations using Leaflet/OpenStreetMap
- 🏨 7+ curated destinations with detailed information and 8+ property listings
- 🔐 Secure JWT-based authentication with protected routes
- 📱 Fully responsive design optimized for all devices
- ⚡ Fast and smooth experience with React + Vite + TypeScript

---

## 🎬 Demo

> **Live Demo:** [Coming Soon](#)

> **Note:** This is a portfolio project showcasing full-stack development skills with modern web technologies.

---

## ✨ Features

### 🗺️ **Destination Discovery**
- Browse curated destinations across Sri Lanka (Galle, Sigiriya, Mirissa, Ella, Kandy, Nuwara Eliya, Jaffna)
- Comprehensive destination information:
  - Detailed descriptions and travel guides
  - Best time to visit with seasonal insights
  - Transportation guides and local tips
  - Popular attractions and activities
  - Interactive maps with precise coordinates
  - High-quality imagery and hero sections

### 🏨 **Accommodation Listings**
- Search and filter properties (hotels & villas)
- Detailed property pages:
  - Image galleries
  - Amenities and pricing information
  - Location maps with coordinates
  - Ratings and reviews
  - Similar property recommendations
- Advanced filtering by location, type, and price range

### 🔐 **User System**
- Secure authentication and authorization
- User registration and login
- Personalized dashboard
- Profile management
- Protected routes

### 🎨 **Modern UI/UX**
- Clean and intuitive interface built with Shadcn UI
- TailwindCSS for beautiful, responsive styling
- Smooth animations and transitions
- Loading states and error boundaries
- Mobile-first responsive design

---

## 📸 Screenshots

> Add your application screenshots here to showcase the UI/UX

```
[Home Page] [Destinations] [Property Details] [Interactive Map]
```

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful component library
- **React Leaflet** - Interactive maps integration
- **Leaflet** - Open-source mapping library
- **React Hook Form + Zod** - Form management and validation
- **Lucide React** - Icon library

### **Backend**
- **Node.js + Express** - REST API server
- **MongoDB + Mongoose** - NoSQL database and ODM
- **JWT** - Secure authentication tokens
- **Bcrypt.js** - Password hashing
- **Express Validator** - Input validation
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- ESLint - Code quality
- Vitest - Unit testing
- Nodemon - Development auto-reload
- PostCSS + Autoprefixer - CSS processing

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

## � Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ceylonway.git
cd ceylonway
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install --legacy-peer-deps
```

4. **Configure environment variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8081
```

5. **Seed the database**
```bash
cd backend
node seeds/seed.js
```

6. **Run the application**

Backend:
```bash
cd backend
npm run dev
```

Frontend (in a new terminal, from project root):
```bash
npm run dev
```

Note: The root `npm run dev` command delegates to the `frontend` app, so running it from `CeylonWay/` or from `CeylonWay/frontend` starts the same frontend codebase.

7. **Access the application**
- Frontend: `http://localhost:8081`
- Backend API: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Locations/Destinations
- `GET /api/locations` - Get all destinations
- `GET /api/locations/:id` - Get destination by ID

### Properties/Accommodations
- `GET /api/properties` - Get all properties
  - Query params: `locationId`, `type`, `priceRange`
- `GET /api/properties/:id` - Get property by ID

### System
- `GET /api/health` - API health check

> **Note:** For detailed API documentation with request/response examples, refer to the API documentation in the codebase.

---

## 🗄️ Database Models

### Location Model
```javascript
{
  id: String,              // Unique identifier
  name: String,            // Destination name
  country: String,         // Country
  image: String,           // Main image
  images: [String],        // Gallery images
  rating: Number,          // Average rating (0-5)
  category: String,        // Category (e.g., "coastal", "cultural")
  lat: Number,             // Latitude
  lng: Number,             // Longitude
  description: String,     // Overview
  bestTimeToVisit: String, // Best visiting season
  attractions: [String],   // Popular attractions
  activities: [String]     // Available activities
}
```

### Property Model
```javascript
{
  id: String,              // Unique identifier
  name: String,            // Property name
  location: String,        // City name
  locationId: String,      // Reference to Location
  image: String,           // Main image
  images: [String],        // Gallery images
  price: Number,           // Price per night
  rating: Number,          // Average rating (0-5)
  type: String,            // "hotel" or "villa"
  amenities: [String],     // Available amenities
  lat: Number,             // Latitude
  lng: Number              // Longitude
}
```

### User Model
```javascript
{
  name: String,            // Full name
  email: String,           // Unique email (hashed)
  password: String,        // Hashed password
  profileImage: String,    // Profile picture URL
  role: String,            // User role
  createdAt: Date,         // Registration date
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

Please ensure your code follows the existing style and includes appropriate tests.

### Development Guidelines
- Follow ESLint rules for code quality
- Write meaningful commit messages
- Update documentation for new features
- Test your changes before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) - Beautiful component library
- [Leaflet](https://leafletjs.com/) - Open-source mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) - Free map data
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- Sri Lanka Tourism - Destination inspiration

---

## 📧 Contact

**Project Link:** [https://github.com/yourusername/ceylonway](https://github.com/yourusername/ceylonway)

For questions or suggestions, please [open an issue](https://github.com/yourusername/ceylonway/issues).

---

## 🗺️ Roadmap

### ✅ Implemented
- Destination browsing with detailed information
- Property listings and search
- Interactive maps integration
- User authentication system
- Responsive design
- Dashboard functionality

### 🔄 Planned Features
- Real booking system
- Payment gateway integration
- User reviews and ratings system
- Wishlist functionality
- Email notifications
- Advanced search and filters
- Admin dashboard
- Multi-language support
- Social media integration

---

<div align="center">
  <p>Made with ❤️ for Sri Lanka</p>
  <p><strong>⭐ Star this repo if you find it useful!</strong></p>
</div>