import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { BarChart3, TrendingUp, Calendar, DollarSign, Users } from "lucide-react";
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
  { month: "Jan", revenue: 2400, bookings: 8, occupancy: 65 },
  { month: "Feb", revenue: 3400, bookings: 12, occupancy: 72 },
  { month: "Mar", revenue: 2800, bookings: 10, occupancy: 68 },
  { month: "Apr", revenue: 3900, bookings: 14, occupancy: 85 },
];

const propertyPerformance = [
  {
    name: "Luxury Beachfront Villa",
    revenue: "$7,200",
    bookings: 18,
    occupancy: 82,
    rating: 4.9,
  },
  {
    name: "Mountain Boutique Hotel",
    revenue: "$5,250",
    bookings: 10,
    occupancy: 74,
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

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.totalRevenue}</p>
                  <p className="text-xs text-ocean mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {analyticsData.revenueGrowth} this month
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.totalBookings}</p>
                  <p className="text-xs text-ocean mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {analyticsData.bookingsGrowth} this month
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.occupancyRate}</p>
                  <p className="text-xs text-ocean mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {analyticsData.occupancyGrowth} this month
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.averageRating}</p>
                  <p className="text-xs text-ocean mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {analyticsData.ratingGrowth} this month
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Monthly Trends</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
                <div className="flex items-end justify-around h-48 gap-4 px-4">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-gradient-coral rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(data.revenue / 4000) * 100}%` }}
                        title={`$${data.revenue}`}
                      ></div>
                      <p className="text-sm text-muted-foreground mt-2">{data.month}</p>
                      <p className="text-xs font-semibold text-foreground">${data.revenue / 100}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Bookings Trend</h3>
                <div className="flex items-end justify-around h-48 gap-4 px-4">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-ocean rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(data.bookings / 14) * 100}%` }}
                        title={`${data.bookings} bookings`}
                      ></div>
                      <p className="text-sm text-muted-foreground mt-2">{data.month}</p>
                      <p className="text-xs font-semibold text-foreground">{data.bookings}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Occupancy Rate Trend</h3>
                <div className="flex items-end justify-around h-48 gap-4 px-4">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-golden rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${data.occupancy}%` }}
                        title={`${data.occupancy}%`}
                      ></div>
                      <p className="text-sm text-muted-foreground mt-2">{data.month}</p>
                      <p className="text-xs font-semibold text-foreground">{data.occupancy}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Property Performance */}
          <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Property Performance</h2>
            <div className="space-y-4">
              {propertyPerformance.map((property, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{property.name}</h3>
                    <span className="text-sm font-bold text-foreground">⭐ {property.rating}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Revenue</p>
                      <p className="font-semibold text-foreground">{property.revenue}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Bookings</p>
                      <p className="font-semibold text-foreground">{property.bookings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Occupancy</p>
                      <p className="font-semibold text-foreground">{property.occupancy}%</p>
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
