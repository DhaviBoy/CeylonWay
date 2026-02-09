import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Sun, 
  Plane, 
  Info, 
  Building2,
  ChevronLeft,
  Star,
  Heart,
  Loader2,
  Navigation
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import villaLuxury from "@/assets/villa-luxury.jpg";
import hotelBoutique from "@/assets/hotel-boutique.jpg";
import villaOverwater from "@/assets/villa-overwater.jpg";

// Mock properties data (will be replaced with API call later)
function getPropertiesByDestination(destinationId: string) {
  const properties: Record<string, any[]> = {
    sigiriya: [
      {
        id: "sigiriya-villa-1",
        name: "Ancient Rock Luxury Villa",
        location: "Sigiriya, Sri Lanka",
        image: villaLuxury,
        price: 280,
        rating: 4.8,
        reviewCount: 156,
        type: "villa" as const,
        amenities: ["wifi", "pool", "parking"],
      },
      {
        id: "sigiriya-hotel-1",
        name: "Heritage Sigiriya Hotel",
        location: "Sigiriya, Sri Lanka",
        image: hotelBoutique,
        price: 140,
        rating: 4.7,
        reviewCount: 289,
        type: "hotel" as const,
        amenities: ["wifi", "pool", "parking"],
      },
      {
        id: "sigiriya-villa-2",
        name: "Scenic View Villa",
        location: "Sigiriya, Sri Lanka",
        image: villaOverwater,
        price: 320,
        rating: 4.9,
        reviewCount: 198,
        type: "villa" as const,
        amenities: ["wifi", "pool"],
      },
    ],
    mirissa: [
      {
        id: "mirissa-villa-1",
        name: "Beachfront Paradise Villa",
        location: "Mirissa, Sri Lanka",
        image: villaLuxury,
        price: 300,
        rating: 4.9,
        reviewCount: 234,
        type: "villa" as const,
        amenities: ["wifi", "pool", "parking"],
      },
      {
        id: "mirissa-hotel-1",
        name: "Coastal Boutique Hotel",
        location: "Mirissa, Sri Lanka",
        image: hotelBoutique,
        price: 160,
        rating: 4.8,
        reviewCount: 312,
        type: "hotel" as const,
        amenities: ["wifi", "pool"],
      },
      {
        id: "mirissa-villa-2",
        name: "Tropical Beach Bungalow",
        location: "Mirissa, Sri Lanka",
        image: villaOverwater,
        price: 280,
        rating: 4.9,
        reviewCount: 89,
        type: "villa" as const,
        amenities: ["wifi", "pool"],
      },
    ],
    ella: [
      {
        id: "ella-villa-1",
        name: "Mountain View Retreat",
        location: "Ella, Sri Lanka",
        image: villaLuxury,
        price: 200,
        rating: 4.8,
        reviewCount: 145,
        type: "villa" as const,
        amenities: ["wifi", "parking"],
      },
      {
        id: "ella-hotel-1",
        name: "Highland Boutique Hotel",
        location: "Ella, Sri Lanka",
        image: hotelBoutique,
        price: 110,
        rating: 4.7,
        reviewCount: 267,
        type: "hotel" as const,
        amenities: ["wifi", "parking"],
      },
      {
        id: "ella-villa-2",
        name: "Tea Garden Luxury Villa",
        location: "Ella, Sri Lanka",
        image: villaOverwater,
        price: 240,
        rating: 4.9,
        reviewCount: 176,
        type: "villa" as const,
        amenities: ["wifi", "pool", "parking"],
      },
    ],
    kandy: [
      {
        id: "kandy-villa-1",
        name: "Royal Lake View Villa",
        location: "Kandy, Sri Lanka",
        image: villaLuxury,
        price: 250,
        rating: 4.8,
        reviewCount: 198,
        type: "villa" as const,
        amenities: ["wifi", "pool", "parking"],
      },
      {
        id: "kandy-hotel-1",
        name: "Cultural Heritage Hotel",
        location: "Kandy, Sri Lanka",
        image: hotelBoutique,
        price: 120,
        rating: 4.7,
        reviewCount: 256,
        type: "hotel" as const,
        amenities: ["wifi", "pool", "parking"],
      },
      {
        id: "kandy-villa-2",
        name: "Temple View Luxury Villa",
        location: "Kandy, Sri Lanka",
        image: villaOverwater,
        price: 300,
        rating: 4.9,
        reviewCount: 212,
        type: "villa" as const,
        amenities: ["wifi", "pool", "parking"],
      },
    ],
  };

  return properties[destinationId] || [];
}

export default function DestinationDetails() {
  const { id = "galle" } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const nearbyProperties = getPropertiesByDestination(id || "galle");

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/locations/${id}`);
        
        if (!response.ok) {
          throw new Error('Destination not found');
        }
        
        const data = await response.json();
        setDestination(data);
      } catch (error: any) {
        console.error("Error fetching destination:", error);
        toast({
          title: "Error",
          description: "Failed to load destination details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading destination details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!destination) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-4">Destination not found</p>
            <Button asChild>
              <Link to="/destinations">Back to Destinations</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Back Button */}
        <Link
          to="/destinations"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Favorite Button */}
        <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
          <Heart className="w-5 h-5 text-foreground" />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-card/80 mb-2">
              <MapPin className="w-4 h-4" />
              {destination.country}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-card mb-4">
              {destination.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-golden text-golden" />
                <span className="font-semibold text-card">{destination.rating}</span>
                <span className="text-card/70">({destination.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" />
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {destination.description}
                </p>
                {destination.longDescription && (
                  <p className="text-muted-foreground leading-relaxed">
                    {destination.longDescription}
                  </p>
                )}
              </div>

              {/* Best Time to Visit */}
              {destination.bestTimeToVisit && (
                <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Sun className="w-6 h-6 text-golden" />
                    Best Time to Visit
                  </h2>
                  <p className="text-muted-foreground">{destination.bestTimeToVisit}</p>
                </div>
              )}

              {/* Getting There */}
              {destination.gettingThere && (
                <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Navigation className="w-6 h-6 text-ocean" />
                    Getting There
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{destination.gettingThere}</p>
                </div>
              )}

              {/* Travel Tips */}
              {destination.tips && destination.tips.length > 0 && (
                <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Plane className="w-6 h-6 text-ocean" />
                    Travel Tips for Visitors
                  </h2>
                  <ul className="space-y-3">
                    {destination.tips.map((tip: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Attractions */}
              {destination.attractions && destination.attractions.length > 0 && (
                <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Top Attractions
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {destination.attractions.map((attraction: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <span className="w-8 h-8 rounded-lg bg-gradient-coral flex items-center justify-center text-primary-foreground font-bold shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-medium text-foreground leading-relaxed">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities */}
              {destination.activities && destination.activities.length > 0 && (
                <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Things to Do
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.activities.map((activity: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary transition-colors"
                      >
                        <span className="text-primary">•</span>
                        <span className="text-foreground">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Plan Your Visit</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">{destination.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <Star className="w-4 h-4 fill-golden text-golden" />
                      {destination.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Accommodations</span>
                    <span className="font-medium text-foreground">{destination.propertyCount}+</span>
                  </div>
                </div>
                <Button className="w-full mb-3" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Building2 className="w-5 h-5 mr-2" />
                  View All Stays
                </Button>
              </div>

              {/* Map Preview */}
              <div className="bg-card rounded-2xl shadow-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Location</h3>
                <div className="aspect-square rounded-xl bg-secondary flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">Coordinates:</p>
                  <p>Latitude: {destination.lat}</p>
                  <p>Longitude: {destination.lng}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Properties */}
      {nearbyProperties.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Building2 className="w-7 h-7 text-primary" />
              Nearby Hotels & Villas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
