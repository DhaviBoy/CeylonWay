import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Calendar, 
  Heart, 
  Star, 
  Settings, 
  LogOut,
  MapPin,
  Edit,
  Trash2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getCurrentUser, logoutUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

import villaLuxury from "@/assets/villa-luxury.jpg";

const sidebarLinks = [
  { name: "Profile", icon: User, href: "/dashboard/profile" },
  { name: "My Bookings", icon: Calendar, href: "/dashboard/bookings" },
  { name: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
  { name: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const initialReviews = [
  {
    id: "1",
    property: "Oceanfront Luxury Villa",
    location: "Maldives",
    image: villaLuxury,
    rating: 5,
    date: "Feb 20, 2025",
    review: "Absolutely amazing experience! The villa was beyond our expectations. The view was breathtaking and the staff was incredibly helpful.",
    visitDate: "Feb 15 - Feb 20, 2025",
  },
  {
    id: "2",
    property: "Seaside Boutique Hotel",
    location: "Bali, Indonesia",
    image: villaLuxury,
    rating: 4,
    date: "Jan 15, 2025",
    review: "Great location and beautiful rooms. The only downside was the breakfast could have been more varied.",
    visitDate: "Jan 10 - Jan 15, 2025",
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

export default function Reviews() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState(initialReviews);
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

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
    toast({
      title: "Review Deleted",
      description: "Your review has been removed.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading reviews...</p>
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
                <h1 className="text-3xl font-bold text-foreground mb-2">My Reviews</h1>
                <p className="text-muted-foreground">Share your travel experiences with other guests</p>
              </div>

              {/* Reviews Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-card rounded-xl shadow-card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{reviews.length}</div>
                  <p className="text-muted-foreground">Total Reviews</p>
                </div>
                <div className="bg-card rounded-xl shadow-card p-6 text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-6 h-6 text-golden fill-golden" />
                    <span className="text-3xl font-bold text-foreground">4.5</span>
                  </div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
                <div className="bg-card rounded-xl shadow-card p-6 text-center">
                  <div className="text-3xl font-bold text-ocean mb-2">125</div>
                  <p className="text-muted-foreground">Helpful Votes</p>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card rounded-2xl shadow-card p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={review.image}
                        alt={review.property}
                        className="w-full md:w-32 h-32 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{review.property}</h3>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {review.location}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-destructive hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4 py-4 border-y border-border">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-5 h-5",
                                  i < review.rating ? "text-golden fill-golden" : "text-muted-foreground"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">Visited: {review.visitDate}</span>
                          <span className="text-sm text-muted-foreground">Reviewed: {review.date}</span>
                        </div>

                        <p className="text-foreground leading-relaxed">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {reviews.length === 0 && (
                <div className="bg-card rounded-2xl shadow-card p-12 text-center">
                  <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                  <p className="text-muted-foreground">No reviews yet. Share your experience!</p>
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
