import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  Heart, 
  Star, 
  Settings as SettingsIcon, 
  LogOut,
  Bell,
  Lock,
  Globe,
  Shield,
  Check
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
  { name: "Settings", icon: SettingsIcon, href: "/dashboard/settings" },
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

export default function Settings() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bookingUpdates: true,
    reviewReminders: true,
    promotions: false,
  });
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

  const toggleSetting = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
    toast({
      title: "Setting Updated",
      description: "Your preference has been saved.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Success",
      description: "All settings have been saved successfully.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading settings...</p>
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences</p>
              </div>

              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="bg-card rounded-2xl shadow-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bell className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Notification Settings</h2>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {key === 'emailNotifications' && 'Receive email updates about your account'}
                            {key === 'bookingUpdates' && 'Get updates about your bookings'}
                            {key === 'reviewReminders' && 'Reminders to leave reviews'}
                            {key === 'promotions' && 'Receive promotional offers and deals'}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleSetting(key as keyof typeof notificationSettings)}
                          className={cn(
                            "relative w-14 h-8 rounded-full transition-all",
                            value ? "bg-primary" : "bg-muted"
                          )}
                        >
                          <div
                            className={cn(
                              "absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform",
                              value && "translate-x-6"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-card rounded-2xl shadow-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-ocean/10 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-ocean" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Security</h2>
                  </div>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-5 h-5 mr-3" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-5 h-5 mr-3" />
                      Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-card rounded-2xl shadow-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-sunset/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-sunset" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Privacy</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                      <div>
                        <p className="font-semibold text-foreground">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Let others see your reviews and profile</p>
                      </div>
                      <button className="relative w-14 h-8 rounded-full bg-primary">
                        <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
                      <div>
                        <p className="font-semibold text-foreground">Activity Status</p>
                        <p className="text-sm text-muted-foreground">Show when you're online</p>
                      </div>
                      <button className="relative w-14 h-8 rounded-full bg-muted">
                        <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-3 justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Check className="w-4 h-4 mr-2" />
                    Save All Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
