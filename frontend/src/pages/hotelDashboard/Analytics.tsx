import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { BarChart3, TrendingUp, Calendar, DollarSign, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  role: string;
}

const analyticsData = {
  totalRevenue: "$12,450",
  revenueGrowth: "+12.5%",
  totalBookings: 28,
  bookingsGrowth: "+8.2%",
  occupancyRate: "78%",
  occupancyGrowth: "+5.1%",
  averageRating: 4.8,
  ratingGrowth: "+0.3",
};

const monthlyData = [
  { month: "Jan", revenue: 2400, bookings: 8 },
  { month: "Feb", revenue: 3400, bookings: 12 },
  { month: "Mar", revenue: 2800, bookings: 10 },
  { month: "Apr", revenue: 3900, bookings: 14 },
];

const propertyPerformance = [
  {
    name: "Luxury Beachfront Villa",
    revenue: "$7,200",
    bookings: 18,
    rating: 4.9,
  },
  {
    name: "Mountain Boutique Hotel",
    revenue: "$5,250",
    bookings: 10,
    rating: 4.7,
  },
];

export default function Analytics() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        
        if (userData.role !== 'hotelOwner') {
          navigate('/dashboard');
          return;
        }
        
        setUser(userData);
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-secondary/30 min-h-screen py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            </div>
            <p className="text-muted-foreground">Track your property performance and earnings</p>
          </div>

          {/* Key Metrics - Simplified */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.totalRevenue}</p>
                </div>
              </div>
              <p className="text-xs text-ocean flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {analyticsData.revenueGrowth}
              </p>
            </div>

            <div className="bg-card rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.totalBookings}</p>
                </div>
              </div>
              <p className="text-xs text-ocean flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {analyticsData.bookingsGrowth}
              </p>
            </div>

            <div className="bg-card rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Occupancy</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.occupancyRate}</p>
                </div>
              </div>
              <p className="text-xs text-ocean flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {analyticsData.occupancyGrowth}
              </p>
            </div>

            <div className="bg-card rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.averageRating}</p>
                </div>
              </div>
              <p className="text-xs text-ocean flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {analyticsData.ratingGrowth}
              </p>
            </div>
          </div>

          {/* Monthly Performance - Simplified */}
          <div className="bg-card rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Monthly Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Revenue</h3>
                <div className="flex items-end gap-3 h-40">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gradient-coral/20 rounded-t flex items-end" style={{ height: '100%' }}>
                        <div
                          className="w-full bg-gradient-coral rounded-t transition-all hover:opacity-80"
                          style={{ height: `${(data.revenue / 4000) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{data.month}</p>
                      <p className="text-xs font-semibold text-foreground">${(data.revenue / 100).toFixed(0)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Bookings</h3>
                <div className="flex items-end gap-3 h-40">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-ocean/20 rounded-t flex items-end" style={{ height: '100%' }}>
                        <div
                          className="w-full bg-ocean rounded-t transition-all hover:opacity-80"
                          style={{ height: `${(data.bookings / 14) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{data.month}</p>
                      <p className="text-xs font-semibold text-foreground">{data.bookings}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Property Performance - Simplified */}
          <div className="bg-card rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Top Properties</h2>
            <div className="space-y-3">
              {propertyPerformance.map((property, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{property.name}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          <span className="font-semibold text-foreground">{property.revenue}</span> Revenue
                        </span>
                        <span className="text-muted-foreground">
                          <span className="font-semibold text-foreground">{property.bookings}</span> Bookings
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-golden font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      {property.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
