import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  Heart, 
  Star, 
  Settings, 
  LogOut,
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getCurrentUser, logoutUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

import villaLuxury from "@/assets/villa-luxury.jpg";
import hotelBoutique from "@/assets/hotel-boutique.jpg";

const sidebarLinks = [
  { name: "Profile", icon: User, href: "/dashboard/profile" },
  { name: "My Bookings", icon: Calendar, href: "/dashboard/bookings" },
  { name: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
  { name: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const upcomingBookings = [
  {
    id: "1",
    property: "Oceanfront Luxury Villa",
    location: "Maldives",
    image: villaLuxury,
    checkIn: "Feb 15, 2026",
    checkOut: "Feb 20, 2026",
    status: "confirmed",
  },
  {
    id: "2",
    property: "Seaside Boutique Hotel",
    location: "Bali, Indonesia",
    image: hotelBoutique,
    checkIn: "Mar 5, 2026",
    checkOut: "Mar 10, 2026",
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

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch current user data from backend
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
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
            <p className="text-muted-foreground">Loading your profile...</p>
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
                  <div className="w-20 h-20 rounded-full bg-gradient-coral flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-2">Member since {memberSinceDate}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        link.href === "/dashboard/profile"
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
              <div className="bg-gradient-coral rounded-2xl p-6 md:p-8 text-primary-foreground">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
                <p className="text-primary-foreground/90">
                  Ready for your next adventure? You have 2 upcoming trips.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Trips", value: "12", icon: MapPin },
                  { label: "Upcoming", value: "2", icon: Calendar },
                  { label: "Wishlist", value: "8", icon: Heart },
                  { label: "Reviews", value: "5", icon: Star },
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

              {/* Upcoming Bookings */}
              <div className="bg-card rounded-2xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Upcoming Trips</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard/bookings">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <img
                        src={booking.image}
                        alt={booking.property}
                        className="w-full md:w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{booking.property}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {booking.location}
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
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {booking.checkIn} - {booking.checkOut}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="self-start md:self-center">
                        View Details
                      </Button>
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
