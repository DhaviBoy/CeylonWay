import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "./components/Loading";
import Index from "./pages/landing";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import PropertyDetails from "./pages/PropertyDetails";
import Stays from "./pages/Stays";
import About from "./pages/About";
import Login from "./pages/login&signup/Login";
import Register from "./pages/login&signup/Register";
import Dashboard from "./pages/travelerDashboard";
import Profile from "./pages/travelerDash/Profile";
import MyBookings from "./pages/travelerDash/MyBookings";
import Wishlist from "./pages/travelerDash/Wishlist";
import Reviews from "./pages/travelerDash/Reviews";
import Settings from "./pages/travelerDash/Settings";
import HotelOwnerDashboard from "./pages/HotelOwnerDashboard";
import MyProperties from "./pages/hotelDashboard/MyProperties";
import PropertyBookings from "./pages/hotelDashboard/PropertyBookings";
import HotelReviews from "./pages/hotelDashboard/Reviews";
import Analytics from "./pages/hotelDashboard/Analytics";
import HotelSettings from "./pages/hotelDashboard/Settings";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization (e.g., fetching initial data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={
              <ErrorBoundary>
                <DestinationDetails />
              </ErrorBoundary>
            } />
            <Route path="/stays" element={<Stays />} />
            <Route path="/stays/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Traveller Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/bookings" element={<MyBookings />} />
            <Route path="/dashboard/wishlist" element={<Wishlist />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            
            {/* Hotel Owner Dashboard Routes */}
            <Route path="/hotel-dashboard" element={<HotelOwnerDashboard />} />
            <Route path="/hotel-dashboard/properties" element={<MyProperties />} />
            <Route path="/hotel-dashboard/bookings" element={<PropertyBookings />} />
            <Route path="/hotel-dashboard/reviews" element={<HotelReviews />} />
            <Route path="/hotel-dashboard/analytics" element={<Analytics />} />
            <Route path="/hotel-dashboard/settings" element={<HotelSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
