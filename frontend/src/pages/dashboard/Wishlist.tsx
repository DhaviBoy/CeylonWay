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
  Trash2,
  Share2
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

const wishlistItems = [
  {
    id: "1",
    property: "Oceanfront Luxury Villa",
    location: "Maldives",
    image: villaLuxury,
    price: "$2,450/night",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "2",
    property: "Seaside Boutique Hotel",
    location: "Bali, Indonesia",
    image: hotelBoutique,
    price: "$1,850/night",
    rating: 4.7,
    reviews: 95,
  },
  {
    id: "3",
    property: "Mountain Resort Escape",
    location: "Swiss Alps",
    image: villaLuxury,
    price: "$3,200/night",
    rating: 4.8,
    reviews: 72,
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

export default function Wishlist() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(wishlistItems);
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

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Removed",
      description: "Item removed from your wishlist",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading wishlist...</p>
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
                <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
                <p className="text-muted-foreground">Save your favorite properties for later</p>
              </div>

              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={item.image}
                        alt={item.property}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-foreground p-2 rounded-full transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-1">{item.property}</h3>
                      <p className="text-muted-foreground flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </p>

                      <div className="flex items-center justify-between mb-6 py-4 border-y border-border">
                        <div>
                          <p className="text-2xl font-bold text-foreground">{item.price}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-golden fill-golden" />
                            <span className="font-semibold text-foreground">{item.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.reviews} reviews</p>
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <Link to="/stays">Book Now</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {items.length === 0 && (
                <div className="bg-card rounded-2xl shadow-card p-12 text-center">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                  <Button asChild className="mt-6">
                    <Link to="/stays">Explore Stays</Link>
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
