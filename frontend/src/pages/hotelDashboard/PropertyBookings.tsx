import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Calendar, Clock, User, MapPin, CheckCircle, Clock3, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const mockBookings = [
  {
    id: "1",
    guestName: "John Doe",
    guestEmail: "john@example.com",
    property: "Luxury Beachfront Villa",
    checkIn: "Feb 15, 2026",
    checkOut: "Feb 20, 2026",
    nights: 5,
    totalPrice: "$1,250",
    status: "confirmed",
    guestPhone: "+1 234 567 8900",
  },
  {
    id: "2",
    guestName: "Jane Smith",
    guestEmail: "jane@example.com",
    property: "Mountain Boutique Hotel",
    checkIn: "Feb 18, 2026",
    checkOut: "Feb 25, 2026",
    nights: 7,
    totalPrice: "$1,050",
    status: "pending",
    guestPhone: "+44 123 456 7890",
  },
  {
    id: "3",
    guestName: "Mike Johnson",
    guestEmail: "mike@example.com",
    property: "Luxury Beachfront Villa",
    checkIn: "Mar 1, 2026",
    checkOut: "Mar 5, 2026",
    nights: 4,
    totalPrice: "$1,000",
    status: "confirmed",
    guestPhone: "+61 287 654 3210",
  },
  {
    id: "4",
    guestName: "Sarah Williams",
    guestEmail: "sarah@example.com",
    property: "Mountain Boutique Hotel",
    checkIn: "Jan 10, 2026",
    checkOut: "Jan 15, 2026",
    nights: 5,
    totalPrice: "$750",
    status: "cancelled",
    guestPhone: "+1 555 123 4567",
  },
];

interface UserData {
  id: string;
  role: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-ocean/20 text-ocean";
    case "pending":
      return "bg-golden/20 text-golden";
    case "cancelled":
      return "bg-destructive/20 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return CheckCircle;
    case "pending":
      return Clock3;
    case "cancelled":
      return XCircle;
    default:
      return Clock;
  }
};

export default function PropertyBookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState("all");
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

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter(b => b.status === filter);

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
              <Calendar className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
            </div>
            <p className="text-muted-foreground">Manage your property bookings</p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Total</p>
              <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-ocean">{bookings.filter(b => b.status === 'confirmed').length}</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <p className="text-2xl font-bold text-golden">{bookings.filter(b => b.status === 'pending').length}</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-muted-foreground">{bookings.filter(b => b.status === 'cancelled').length}</p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", "confirmed", "pending", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
                  filter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Bookings List - Simplified */}
          <div className="space-y-3">
            {filteredBookings.length === 0 ? (
              <div className="bg-card rounded-xl shadow-sm p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">No bookings found</p>
              </div>
            ) : (
              filteredBookings.map((booking) => {
                const StatusIcon = getStatusIcon(booking.status);
                return (
                  <div key={booking.id} className="bg-card rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-foreground">{booking.guestName}</h3>
                          <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium capitalize flex items-center gap-1", getStatusColor(booking.status))}>
                            <StatusIcon className="w-3 h-3" />
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.property}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{booking.totalPrice}</p>
                        <p className="text-xs text-muted-foreground">{booking.nights} nights</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.checkIn}</span>
                      </div>
                      <span className="text-muted-foreground">→</span>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{booking.checkOut}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                      <span>📧 {booking.guestEmail}</span>
                      <span>📱 {booking.guestPhone}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
