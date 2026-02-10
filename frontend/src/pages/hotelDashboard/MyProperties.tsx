import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Building2, Plus, Edit, Trash2, Eye, MapPin, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

import villaLuxury from "@/assets/villa-luxury.jpg";
import hotelBoutique from "@/assets/hotel-boutique.jpg";
import villaOverwater from "@/assets/villa-overwater.jpg";

const mockProperties = [
  {
    id: "1",
    name: "Luxury Beachfront Villa",
    location: "Mirissa, Sri Lanka",
    image: villaLuxury,
    status: "active",
    rooms: 4,
    rating: 4.9,
    bookings: 12,
    revenue: "$4,500",
  },
  {
    id: "2",
    name: "Mountain Boutique Hotel",
    location: "Kandy, Sri Lanka",
    image: hotelBoutique,
    status: "active",
    rooms: 20,
    rating: 4.7,
    bookings: 8,
    revenue: "$3,200",
  },
  {
    id: "3",
    name: "Oceanview Luxury Resort",
    location: "Galle, Sri Lanka",
    image: villaOverwater,
    status: "draft",
    rooms: 15,
    rating: 0,
    bookings: 0,
    revenue: "$0",
  },
];

interface UserData {
  id: string;
  role: string;
}

export default function MyProperties() {
  const [properties, setProperties] = useState(mockProperties);
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

  const handleDelete = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Property deleted successfully.",
    });
  };

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
              <Building2 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">My Properties</h1>
            </div>
            <p className="text-muted-foreground">Manage and track all your properties</p>
          </div>

          <Button className="mb-8" asChild>
            <Link to="/hotel-dashboard/properties/new">
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {properties.map((property) => (
              <div key={property.id} className="bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    property.status === "active"
                      ? "bg-ocean/20 text-ocean"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {property.status}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{property.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4" />
                    {property.location}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-border">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Rooms</p>
                      <p className="text-lg font-bold text-foreground">{property.rooms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Rating</p>
                      <p className="text-lg font-bold text-foreground">{property.rating > 0 ? property.rating : "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Bookings</p>
                      <p className="text-lg font-bold text-foreground">{property.bookings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Revenue</p>
                      <p className="text-lg font-bold text-foreground">{property.revenue}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to={`/hotel-dashboard/properties/${property.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to={`/hotel-dashboard/properties/${property.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
