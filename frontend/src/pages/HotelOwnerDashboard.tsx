import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Calendar, 
  Star, 
  Settings, 
  LogOut,
  BarChart3,
  Plus,
  Clock,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getCurrentUser, logoutUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

import villaLuxury from "@/assets/villa-luxury.jpg";
import hotelBoutique from "@/assets/hotel-boutique.jpg";

const sidebarLinks = [
  { name: "My Properties", icon: Building2, href: "/hotel-dashboard/properties" },
  { name: "Bookings", icon: Calendar, href: "/hotel-dashboard/bookings" },
  { name: "Reviews", icon: Star, href: "/hotel-dashboard/reviews" },
  { name: "Analytics", icon: BarChart3, href: "/hotel-dashboard/analytics" },
  { name: "Settings", icon: Settings, href: "/hotel-dashboard/settings" },
];

const mockProperties = [
  {
    id: "1",
    name: "Luxury Beachfront Villa",
    location: "Mirissa, Sri Lanka",
    image: villaLuxury,
    status: "active",
    bookings: 12,
    revenue: "$4,500",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Mountain Boutique Hotel",
    location: "Kandy, Sri Lanka",
    image: hotelBoutique,
    status: "active",
    bookings: 8,
    revenue: "$3,200",
    rating: 4.7,
  },
];

const upcomingBookings = [
  {
    id: "1",
    guestName: "John Doe",
    property: "Luxury Beachfront Villa",
    checkIn: "Feb 15, 2026",
    checkOut: "Feb 20, 2026",
    status: "confirmed",
  },
  {
    id: "2",
    guestName: "Jane Smith",
    property: "Mountain Boutique Hotel",
    checkIn: "Feb 18, 2026",
    checkOut: "Feb 25, 2026",
    status: "pending",
  },
];

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function HotelOwnerDashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch current user data from backend
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        
        // Redirect if user is not a hotel owner
        if (userData.role !== 'hotelOwner') {
          navigate('/dashboard');
          return;
        }
        
        setUser(userData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user data. Please log in again.",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate, toast]);

  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">Failed to load user data</p>
            <Button asChild>
              <Link to="/login">Go to Login</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Format the date to show when user joined
  const memberSinceDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
                {/* User Info */}
                <div className="text-center mb-6 pb-6 border-b border-border">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean to-primary flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-2">Hotel Owner</p>
                  <p className="text-xs text-muted-foreground">Member since {memberSinceDate}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        link.href === "/hotel-dashboard"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-border">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Welcome */}
              <div className="bg-gradient-to-r from-ocean to-primary rounded-2xl p-6 md:p-8 text-primary-foreground">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
                <p className="text-primary-foreground/90">
                  Manage your properties and track bookings all in one place.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Properties", value: "2", icon: Building2 },
                  { label: "Total Bookings", value: "20", icon: Calendar },
                  { label: "Revenue", value: "$7,700", icon: TrendingUp },
                  { label: "Avg Rating", value: "4.8", icon: Star },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card rounded-xl p-4 shadow-card">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Properties */}
              <div className="bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Your Properties</h2>
                  <Button size="sm" asChild>
                    <Link to="/hotel-dashboard/properties">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Property
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full md:w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{property.name}</h3>
                            <p className="text-sm text-muted-foreground">{property.location}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-ocean/20 text-ocean capitalize">
                            {property.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Bookings</p>
                            <p className="font-semibold text-foreground">{property.bookings}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Revenue</p>
                            <p className="font-semibold text-foreground">{property.revenue}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <p className="font-semibold text-foreground flex items-center gap-1">
                              <Star className="w-3 h-3 fill-golden text-golden" />
                              {property.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="self-start md:self-center" asChild>
                        <Link to={`/hotel-dashboard/properties/${property.id}`}>
                          Manage
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Upcoming Bookings</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/hotel-dashboard/bookings">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{booking.guestName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.property}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {booking.checkIn} - {booking.checkOut}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium capitalize",
                            booking.status === "confirmed"
                              ? "bg-ocean/20 text-ocean"
                              : "bg-golden/20 text-golden"
                          )}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
