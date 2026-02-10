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
  Download,
  X
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

const bookings = [
  {
    id: "1",
    property: "Oceanfront Luxury Villa",
    location: "Maldives",
    image: villaLuxury,
    checkIn: "Feb 15, 2026",
    checkOut: "Feb 20, 2026",
    status: "confirmed",
    price: "$2,450",
    nights: 5,
  },
  {
    id: "2",
    property: "Seaside Boutique Hotel",
    location: "Bali, Indonesia",
    image: hotelBoutique,
    checkIn: "Mar 5, 2026",
    checkOut: "Mar 10, 2026",
    status: "pending",
    price: "$1,850",
    nights: 5,
  },
  {
    id: "3",
    property: "Mountain Resort Escape",
    location: "Swiss Alps",
    image: villaLuxury,
    checkIn: "Apr 10, 2026",
    checkOut: "Apr 15, 2026",
    status: "confirmed",
    price: "$3,200",
    nights: 5,
  },
];

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

function DashboardSidebar({ user, handleLogout }: { user: UserData | null; handleLogout: () => void }) {
  const { pathname } = window.location;
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
        <div className="text-center mb-6 pb-6 border-b border-border">
          <div className="w-20 h-20 rounded-full bg-gradient-coral flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>

        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                pathname === link.href
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
  );
}

export default function MyBookings() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
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
            <p className="text-muted-foreground">Loading bookings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <DashboardSidebar user={user} handleLogout={handleLogout} />

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
                <p className="text-muted-foreground">Manage and view all your trip reservations</p>
              </div>

              {/* Booking List */}
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <img
                        src={booking.image}
                        alt={booking.property}
                        className="w-full md:w-48 h-48 object-cover"
                      />
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{booking.property}</h3>
                            <p className="text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-4 h-4" />
                              {booking.location}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-semibold capitalize",
                              booking.status === "confirmed"
                                ? "bg-ocean/20 text-ocean"
                                : "bg-golden/20 text-golden"
                            )}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-4 border-y border-border">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">Check In</p>
                            <p className="font-semibold text-foreground">{booking.checkIn}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">Check Out</p>
                            <p className="font-semibold text-foreground">{booking.checkOut}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">Nights</p>
                            <p className="font-semibold text-foreground">{booking.nights} nights</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">Total Price</p>
                            <p className="font-semibold text-foreground">{booking.price}</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Invoice
                          </Button>
                          {booking.status === "pending" && (
                            <Button variant="destructive" size="sm">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {bookings.length === 0 && (
                <div className="bg-card rounded-2xl shadow-card p-12 text-center">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <p className="text-muted-foreground">No bookings yet. Start exploring!</p>
                  <Button asChild className="mt-6">
                    <Link to="/stays">Browse Stays</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
