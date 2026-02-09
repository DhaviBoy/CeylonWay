import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  Heart, 
  Star, 
  Settings, 
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getCurrentUser, logoutUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { name: "Profile", icon: User, href: "/dashboard/profile" },
  { name: "My Bookings", icon: Calendar, href: "/dashboard/bookings" },
  { name: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
  { name: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
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
        {/* User Info */}
        <div className="text-center mb-6 pb-6 border-b border-border">
          <div className="w-20 h-20 rounded-full bg-gradient-coral flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                pathname === link.href || (link.href === "/dashboard/profile" && pathname === "/dashboard")
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

export default function Profile() {
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
            <p className="text-muted-foreground">Loading profile...</p>
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

  const memberSinceDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <DashboardSidebar user={user} handleLogout={handleLogout} />

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
                </div>

                {/* Profile Header */}
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="flex items-start gap-6">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-coral flex items-center justify-center flex-shrink-0">
                      <User className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">{user.name}</h2>
                      <p className="text-muted-foreground mb-4">{user.email}</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Member Since</p>
                          <p className="text-sm font-semibold text-foreground">{memberSinceDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Account Type</p>
                          <p className="text-sm font-semibold text-foreground capitalize">{user.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email Address</p>
                    <p className="text-lg font-medium text-foreground mt-1">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">User ID</p>
                    <p className="text-lg font-medium text-foreground mt-1 break-all">{user.id}</p>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-card rounded-xl shadow-card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">12</div>
                  <p className="text-muted-foreground">Total Trips</p>
                </div>
                <div className="bg-card rounded-xl shadow-card p-6 text-center">
                  <div className="text-3xl font-bold text-ocean mb-2">2</div>
                  <p className="text-muted-foreground">Upcoming Bookings</p>
                </div>
                <div className="bg-card rounded-xl shadow-card p-6 text-center">
                  <div className="text-3xl font-bold text-sunset mb-2">4.8</div>
                  <p className="text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
