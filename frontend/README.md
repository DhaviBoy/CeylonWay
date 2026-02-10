# 🌍 CeylonWay Frontend

Modern React + TypeScript frontend application for the CeylonWay travel platform. Built with Vite, TailwindCSS, Shadcn UI, and React Leaflet for an exceptional user experience.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Setup & Installation](#-setup--installation)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Styling](#-styling)
- [Maps Integration](#-maps-integration)
- [Form Handling](#-form-handling)
- [Authentication](#-authentication)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Testing](#-testing)

---

## ✨ Features

### 🗺️ Destination Discovery
- Browse 7+ destinations across Sri Lanka
- Detailed destination pages with:
  - Hero images and photo galleries
  - Comprehensive descriptions
  - Best time to visit information
  - Travel tips and local advice
  - Popular attractions list
  - Available activities
  - Interactive Leaflet maps with real coordinates
  - Nearby property suggestions

### 🏨 Property Listings
- Search and browse hotels & villas
- Advanced filtering:
  - Location-based filtering
  - Property type (hotel/villa/all)
  - Price range (budget/mid/luxury)
- Property detail pages featuring:
  - Image galleries with lightbox
  - Amenities display with icons
  - Pricing and ratings
  - Location maps
  - Similar property recommendations

### 🔐 User Authentication
- Registration with validation
- Login with JWT token management
- Protected dashboard routes
- Profile management
- Password change functionality
- Profile image upload
- Booking history (UI ready)
- Wishlist functionality (UI ready)
- User reviews (UI ready)

### 🎨 UI/UX Features
- Responsive design (mobile-first)
- Loading states and skeletons
- Error boundaries for graceful failures
- Toast notifications
- Smooth page transitions
- Interactive components
- Accessible UI elements (Shadcn UI)
- Dark mode support ready

### 🗺️ Interactive Maps
- Real-time Leaflet map rendering
- Custom marker icons
- Interactive popups with location details
- Coordinate-based positioning
- Client-side mounting prevention for SSR compatibility
- OpenStreetMap tiles (no API key required)
- Responsive map sizing

---

## 🛠️ Technology Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library with hooks and concurrent features |
| **TypeScript** | 5.8.3 | Type-safe development |
| **Vite** | 5.4.19 | Build tool and dev server (ESBuild) |
| **React Router** | 6.30.1 | Client-side routing with v6 API |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| **TailwindCSS** | 3.4.17 | Utility-first CSS framework |
| **Shadcn UI** | Latest | Accessible component library (Radix UI) |
| **Lucide React** | 0.462.0 | Icon library with 1000+ icons |
| **TailwindCSS Animate** | 1.0.7 | Animation utilities |
| **class-variance-authority** | 0.7.1 | Component variants |
| **tailwind-merge** | 2.6.0 | Merge TailwindCSS classes |
| **clsx** | 2.1.1 | Conditional class names |

### Data Fetching & State
| Technology | Version | Purpose |
|------------|---------|---------|
| **TanStack Query** | 5.83.0 | Data fetching, caching, synchronization |
| **Axios** | (via api.ts) | HTTP client for API requests |

### Maps & Location
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Leaflet** | 4.2.1 | React components for Leaflet |
| **Leaflet** | 1.9.4 | Interactive mapping library |
| **@types/leaflet** | 1.9.21 | TypeScript definitions |

### Forms & Validation
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Hook Form** | 7.61.1 | Performance form library with hooks |
| **Zod** | 3.25.76 | Schema validation |
| **@hookform/resolvers** | 3.10.0 | Validation resolvers |

### UI Components (Radix UI)
- @radix-ui/react-accordion (1.2.11)
- @radix-ui/react-alert-dialog (1.1.14)
- @radix-ui/react-avatar (1.1.10)
- @radix-ui/react-checkbox (1.3.2)
- @radix-ui/react-dialog (1.1.14)
- @radix-ui/react-dropdown-menu (2.1.15)
- @radix-ui/react-popover (1.1.14)
- @radix-ui/react-select (2.2.5)
- @radix-ui/react-tabs (1.1.12)
- @radix-ui/react-toast (1.2.14)
- And 20+ more Radix UI primitives

### Additional Libraries
- **Embla Carousel** (8.6.0) - Touch-friendly carousels
- **Recharts** (2.15.4) - Chart library for analytics
- **Sonner** (1.7.4) - Toast notifications
- **Date-fns** (3.6.0) - Date manipulation
- **Vaul** (0.9.9) - Drawer component

### Development Tools
- **ESLint** (9.32.0) - Code linting
- **TypeScript ESLint** (8.38.0) - TypeScript linting
- **Vitest** (3.2.4) - Unit testing framework
- **@testing-library/react** (16.0.0) - React testing utilities
- **@testing-library/jest-dom** (6.6.0) - DOM matchers
- **jsdom** (20.0.3) - DOM testing environment
- **PostCSS** (8.5.6) - CSS processing
- **Autoprefixer** (10.4.21) - CSS vendor prefixes

---

## 🏗️ Project Architecture

### High-Level Structure
```
frontend/
├── public/                      # Static assets
├── src/                         # Source code
│   ├── assets/                 # Images, fonts, etc.
│   ├── components/             # React components
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities & config
│   ├── pages/                  # Page components
│   ├── test/                   # Test files
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite configuration
└── tailwind.config.ts           # TailwindCSS config
```

### Architectural Patterns

**1. Component-Based Architecture**
- Atomic design principles
- Reusable UI components
- Composition over inheritance
- Props-based configuration

**2. Route-Based Code Splitting**
- Lazy loading for routes
- Smaller initial bundle size
- Improved performance

**3. Custom Hooks Pattern**
- Reusable stateful logic
- Separation of concerns
- Cleaner components

**4. API Layer Abstraction**
- Centralized API client (lib/api.ts)
- Consistent error handling
- Easy endpoint management

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Backend API running on port 5000

### Step 1: Install Dependencies

```bash
cd frontend
npm install --legacy-peer-deps
```

**Note:** `--legacy-peer-deps` resolves peer dependency conflicts with react-leaflet and React 18.

**What Gets Installed:**
- 72 production dependencies
- 19 development dependencies
- Total ~495 packages including sub-dependencies

### Step 2: Configure Environment

Create `.env` file (if needed):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** Vite exposes env variables prefixed with `VITE_`

### Step 3: Start Development Server

```bash
npm run dev
```

**Output:**
```
  VITE v5.4.19  ready in 2.1s

  ➜  Local:   http://localhost:8081/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Features Enabled:**
- Hot Module Replacement (HMR)
- Instant TypeScript compilation
- Fast refresh for React components
- Error overlay
- Source maps

### Step 4: Verify Installation

1. Open http://localhost:8081
2. Navigate to /destinations
3. Click on a destination
4. Verify map renders correctly
5. Check console for errors (should be none)

---