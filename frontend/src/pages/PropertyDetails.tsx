import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { GoogleMap } from "@/components/maps/GoogleMap";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Car,
  ChevronLeft,
  Eye,
  GlassWater,
  Heart,
  Leaf,
  Loader2,
  MapPin,
  Mountain,
  Sparkles,
  Star,
  Sun,
  Tag,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";

import villaLuxury from "@/assets/villa-luxury.jpg";
import hotelBoutique from "@/assets/hotel-boutique.jpg";
import villaOverwater from "@/assets/villa-overwater.jpg";
import heroBeach from "@/assets/hero-beach.jpg";

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  pool: Waves,
  spa: Sparkles,
  restaurant: Utensils,
  "beach access": Sun,
  view: Eye,
  nature: Leaf,
  adventure: Mountain,
  "roof top bar": GlassWater,
};

const fallbackGallery = [villaLuxury, hotelBoutique, villaOverwater, heroBeach];

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [nearbyProperties, setNearbyProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);

        if (!response.ok) {
          throw new Error("Property not found");
        }

        const data = await response.json();
        setProperty(data);

        if (data?.locationId) {
          const nearbyResponse = await fetch(
            `http://localhost:5000/api/properties?locationId=${data.locationId}`
          );
          const nearbyData = await nearbyResponse.json();
          setNearbyProperties(nearbyData.filter((item: any) => item.id !== data.id));
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast({
          title: "Error",
          description: "Failed to load property details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, toast]);

  const gallery = useMemo(() => {
    if (!property) return [];
    const images = [property.image, ...fallbackGallery];
    return Array.from(new Set(images.filter(Boolean)));
  }, [property]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading property details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-4">Property not found</p>
            <Button asChild>
              <Link to="/stays">Back to Stays</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />

        <Link
          to="/stays"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>

        <button
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-foreground" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-card/80 mb-2">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-card mb-4">
              {property.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-golden text-golden" />
                <span className="font-semibold text-card">{property.rating}</span>
                <span className="text-card/70">({property.reviewCount} reviews)</span>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-card/80 text-foreground capitalize">
                {property.type}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery + Details */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={gallery[0]}
                  alt={`${property.name} main view`}
                  className="w-full h-[280px] md:h-[320px] object-cover rounded-2xl"
                />
                <div className="grid grid-cols-2 gap-4">
                  {gallery.slice(1, 5).map((image, index) => (
                    <img
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${property.name} gallery ${index + 1}`}
                      className="w-full h-[130px] md:h-[150px] object-cover rounded-xl"
                    />
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description ||
                    "Enjoy a relaxing stay with curated amenities, scenic views, and easy access to local attractions."}
                </p>
              </div>

              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities?.map((amenity: string) => {
                    const Icon = amenityIcons[amenity.toLowerCase()] || Tag;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 rounded-xl border border-border"
                      >
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-foreground capitalize">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Location Highlights</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                  {property.locationId && (
                    <Link
                      to={`/destinations/${property.locationId}`}
                      className="inline-flex items-center gap-2 text-primary font-medium"
                    >
                      Explore destination details
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Plan Your Stay</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium text-foreground capitalize">{property.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <Star className="w-4 h-4 fill-golden text-golden" />
                      {property.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nightly Rate</span>
                    <span className="font-medium text-foreground">${property.price}</span>
                  </div>
                </div>
                <Button className="w-full mb-3" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Contact Property
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {nearbyProperties.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              More Stays Nearby
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyProperties.slice(0, 3).map((item) => (
                <PropertyCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
