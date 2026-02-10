# CeylonWay Frontend - Complete Documentation (Part 2 of 2)

This file contains sections to be appended to the main frontend README.md

---

## 📡 API Integration

### API Client Configuration (`lib/api.ts`)

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (add auth token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Using TanStack Query

**Example: Fetching Destinations**
```typescript
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api';

function Destinations() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const response = await apiClient.get('/locations');
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading destinations</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((dest) => (
        <DestinationCard key={dest.id} {...dest} />
      ))}
    </div>
  );
}
```

**Benefits:**
- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states

---

## 🎨 Styling System

### TailwindCSS Configuration

**tailwind.config.ts:**
```typescript
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... more colors
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
```

### CSS Variables (index.css)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

### Component Styling Examples

**Using TailwindCSS Utilities:**
```tsx
<div className="container mx-auto px-4 py-8">
 <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
    Title
  </h1>
  <p className="mt-4 text-gray-600 dark:text-gray-300">
    Description
  </p>
</div>
```

**Using Shadcn UI Components:**
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button variant="default">Action</Button>
  </CardFooter>
</Card>
```

**Using cn() Utility:**
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  'conditional-classes'
)}>
  Content
</div>
```

### Responsive Design

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Example:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>
```

---

## 🗺️ Maps Integration

### Leaflet Implementation

**GoogleMap Component (`components/maps/GoogleMap.tsx`):**

```typescript
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  destinationName: string;
  height?: string;
  zoom?: number;
}

// Custom marker icon
const markerIcon = icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function GoogleMap({ latitude, longitude, destinationName, height = '400px', zoom = 13 }: GoogleMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const position: LatLngExpression = [latitude, longitude];

  // Client-side mounting to prevent SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', borderRadius: '12px' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border" style={{ height }}>
      <MapContainer
        key={`${latitude}-${longitude}`}
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            <div style={{ textAlign: 'center', padding: '4px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                <span style={{ fontWeight: '600', fontSize: '13px' }}>{destinationName}</span>
              </div>
              <p style={{ fontSize: '11px', color: '#555', margin: '0' }}>
                {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
```

**Usage:**
```tsx
<GoogleMap
  latitude={6.0535}
  longitude={80.2210}
  destinationName="Galle"
  height="500px"
  zoom={15}
/>
```

**Key Implementation Details:**
1. **Client-Side Mounting:** Prevents Leaflet initialization before DOM is ready
2. **Custom Icons:** CDN-hosted marker icons with proper sizing
3. **Key Prop:** Forces re-render when coordinates change
4. **OpenStreetMap:** Free map tiles, no API key required
5. **TypeScript:** Proper type imports for LatLngExpression

---

## 📝 Form Handling

### React Hook Form + Zod

**Login Form Example:**

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await apiClient.post('/auth/login', values);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
```

**Benefits:**
- Type-safe forms
- Schema-based validation
- Automatic error handling
- Performance optimized (uncontrolled inputs)
- Easy integration with UI libraries

---

## 🔐 Authentication Implementation

### Auth Flow

**1. Login/Register:**
```typescript
// Login
const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  const { token, user } = response.data;
  
  // Store token
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  
  // Redirect
  navigate('/dashboard');
};

// Register
const register = async (name: string, email: string, password: string) => {
  const response = await apiClient.post('/auth/register', { name, email, password });
  const { token, user } = response.data;
  
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  
  navigate('/dashboard');
};
```

**2. Protected Routes:**
```typescript
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Usage in App.tsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

**3. Logout:**
```typescript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/login');
  toast.success('Logged out successfully');
};
```

**4. Auth Context (Recommended):**
```typescript
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.NodeNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev
# Output: http://localhost:8081

# Build for production
npm run build
# Output: dist/

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Development Workflow

**1. Hot Module Replacement (HMR):**
- Changes reflect instantly
- State preserved during updates
- No full page reload needed

**2. TypeScript Checking:**
- Real-time type checking in IDE
- Build-time type validation
- Better IntelliSense

**3. ESLint Integration:**
```bash
npm run lint
```

**4. Component Development:**
```bash
# Create new component
touch src/components/MyComponent.tsx

# Import and use
import { MyComponent } from '@/components/MyComponent';
```

### Common Development Tasks

**Adding a Shadcn UI Component:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

**Adding a New Page:**
1. Create file: `src/pages/NewPage.tsx`
2. Add route in `App.tsx`:
```typescript
<Route path="/new-page" element={<NewPage />} />
```
3. Add navigation link in `Navbar.tsx`

**Adding a New API Endpoint:**
1. Update `lib/api.ts` if needed
2. Create query in component:
```typescript
const { data } = useQuery({
  queryKey: ['endpoint'],
  queryFn: () => apiClient.get('/endpoint'),
});
```

---

## 📦 Building for Production

### Build Process

```bash
npm run build
```

**What Happens:**
1. TypeScript compilation
2. Code bundling with Vite/Rollup
3. Minification and tree-shaking
4. Asset optimization
5. Output to `dist/` directory

**Build Output:**
```
dist/
├──index.html
├── assets/
│   ├── index-[hash].js    # Main bundle
│   ├── index-[hash].css   # Styles
│   └── [images/fonts]     # Optimized assets
```

### Build Optimization

**Code Splitting:**
- Automatic route-based splitting
- Lazy loading for better performance
- Smaller initial bundle

**Asset Optimization:**
- Image compression
- CSS purging (unused styles removed)
- Font subsetting

### Environment Variables

**.env.production:**
```env
VITE_API_BASE_URL=https://api.ceylonway.com/api
VITE_APP_NAME=CeylonWay
```

**Usage:**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Deployment

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm run build
drag dist/ folder to netlify.com
```

**Build Settings:**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

---

## 🧪 Testing

### Test Setup

**vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
});
```

**test/setup.ts:**
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

### Example Tests

**Component Test:**
```typescript
import { render, screen } from '@testing-library/react';
import { DestinationCard } from '@/components/cards/DestinationCard';

describe('DestinationCard', () => {
  it('renders destination name', () => {
    render(
      <DestinationCard
        id="galle"
        name="Galle"
        image="/image.jpg"
        rating={4.8}
        propertyCount={12}
        category="coastal"
      />
    );
    
    expect(screen.getByText('Galle')).toBeInTheDocument();
  });
});
```

**Hook Test:**
```typescript
import { renderHook } from '@testing-library/react';
import { useMobile } from '@/hooks/use-mobile';

describe('useMobile', () => {
  it('returns true on mobile viewport', () => {
    global.innerWidth = 500;
    const { result } = renderHook(() => useMobile());
    expect(result.current).toBe(true);
  });
});
```

### Running Tests

```bash
# Run once
npm test

# Watch mode
npm run test: watch

# Coverage
npm run test -- --coverage
```

---

## 🔧 Configuration Files

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8081,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### components.json (Shadcn UI)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 📚 Additional Resources

### Useful Commands

```bash
# Install new dependencynpm install <package>

# Install as dev dependency
npm install -D <package>

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Path Aliases

```typescript
// Instead of: import Button from '../../../components/ui/button'
// Use:
import { Button } from '@/components/ui/button';
```

### Performance Tips

1. **Lazy Loading:**
```typescript
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

2. **Image Optimization:**
```tsx
<img loading="lazy" alt="..." />
```

3. **Memoization:**
```typescript
const memoizedValue = useMemo(() => expensiveCalc(), [deps]);
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Module not found:**
```
Error: Cannot find module '@/components/...'
```
Solution: Check tsconfig.json paths configuration

**2. Leaflet not rendering:**
```
Error: Map container not found
```
Solution: Ensure client-side mounting (useState + useEffect)

**3. Build failing:**
```
Error: TypeScript compilation errors
```
Solution: Run `npm run lint` and fix type errors

**4. HMR not working:**
Solution: Restart dev server (`npm run dev`)

**5. Token not persisting:**
Solution: Check localStorage and API interceptors

---

## 📞 Support & Documentation

### Official Documentation Links

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Vite: https://vitejs.dev
- TailwindCSS: https://tailwindcss.com
- Shadcn UI: https://ui.shadcn.com
- React Router: https://reactrouter.com
- TanStack Query: https://tanstack.com/query
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev
- Leaflet: https://leafletjs.com

### Project Information

**Last Updated:** February 10, 2026  
**Frontend Version:** 1.0.0  
**React Version:** 18.3.1  
**TypeScript Version:** 5.8.3  
**Node Version Required:** 18+

---

**Note:** This documentation covers the complete frontend implementation. For backend API documentation, see `backend/README.md`. For overall project information, see root `README.md`.