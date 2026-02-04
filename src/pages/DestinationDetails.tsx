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
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

import sigiriya from "@/assets/BW4YPnXzX3u1.jpg";
import mirissa from "@/assets/coconut-tree-hill-2.jpg";
import ella from "@/assets/Ella42.jpg";
import kandy from "@/assets/Kandy.jpg";
import villaLuxury from "@/assets/villa-luxury.jpg";
import hotelBoutique from "@/assets/hotel-boutique.jpg";
import villaOverwater from "@/assets/villa-overwater.jpg";

const destinationData: Record<string, any> = {
  sigiriya: {
    name: "Sigiriya",
    country: "Sri Lanka",
    description: "Sigiriya, the ancient fortress and UNESCO World Heritage Site, is one of Sri Lanka's most iconic destinations. Perched atop a 200-meter rock, this archaeological marvel offers breathtaking views, ancient gardens, and a fascinating glimpse into Sri Lanka's rich cultural heritage.",
    image: sigiriya,
    rating: 4.9,
    reviewCount: 1850,
    bestTime: "November to April (dry season)",
    tips: [
      "Start climbing early in the morning to avoid crowds",
      "Bring plenty of water and wear comfortable hiking shoes",
      "Don't miss the ancient frescoes and mirror walls",
      "The views from the top are spectacular in clear weather",
    ],
    attractions: [
      "Ancient Rock Fortress",
      "Sigiriya Frescoes",
      "Royal Gardens",
      "Pigeon Rock",
    ],
  },
  mirissa: {
    name: "Mirissa",
    country: "Sri Lanka",
    description: "Mirissa is a charming beach town on Sri Lanka's southern coast, known for its pristine sandy beaches, vibrant coral reefs, and excellent whale watching opportunities. Perfect for relaxation, water sports, and experiencing authentic coastal Sri Lankan culture.",
    image: mirissa,
    rating: 4.8,
    reviewCount: 2100,
    bestTime: "November to April (dry season)",
    tips: [
      "Go whale watching between November and April for best sightings",
      "Explore the vibrant night markets for local cuisine",
      "The best sunsets are from the beach bars",
      "Snorkeling and diving spots are nearby",
    ],
    attractions: [
      "Mirissa Beach",
      "Whale Watching Cruises",
      "Coral Reefs",
      "Matara Fort",
    ],
  },
  ella: {
    name: "Ella",
    country: "Sri Lanka",
    description: "Ella is a picturesque mountain village nestled in the misty highlands of Sri Lanka. Famous for its stunning views, tea plantations, and adventure activities, Ella offers a perfect blend of natural beauty and tranquility for travelers seeking to escape the hustle and bustle.",
    image: ella,
    rating: 4.9,
    reviewCount: 2250,
    bestTime: "December to March (dry season)",
    tips: [
      "Don't miss the Nine Arch Bridge - a architectural marvel",
      "Visit tea plantations and enjoy fresh tea with mountain views",
      "The train journey to Ella is scenic and worth experiencing",
      "Hike to Little Adam's Peak for panoramic views",
    ],
    attractions: [
      "Nine Arch Bridge",
      "Tea Plantations",
      "Little Adam's Peak",
      "Ravana Falls",
    ],
  },
  kandy: {
    name: "Kandy",
    country: "Sri Lanka",
    description: "Kandy, the cultural heart of Sri Lanka, is a UNESCO World Heritage Site famous for the sacred Temple of the Tooth and its stunning location on a hill surrounded by lush greenery. The city is rich in history, art, and spiritual significance.",
    image: kandy,
    rating: 4.7,
    reviewCount: 2700,
    bestTime: "December to February (dry season)",
    tips: [
      "Visit the Temple of the Tooth during the evening ceremony",
      "The Kandy Lake offers beautiful walks and photo opportunities",
      "Explore the Royal Botanic Gardens in nearby Peradeniya",
      "Try local cuisine at the Central Market",
    ],
    attractions: [
      "Temple of the Tooth",
      "Kandy Lake",
      "Royal Botanic Gardens",
      "National Museum",
    ],
  },
};

const getPropertiesByDestination = (destinationId: string) => {
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
};

export default function DestinationDetails() {
  const { id = "sigiriya" } = useParams<{ id: string }>();
  const destination = destinationData[id] || destinationData.sigiriya;
  const nearbyProperties = getPropertiesByDestination(id || "sigiriya");

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
                <p className="text-muted-foreground leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Best Time to Visit */}
              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-golden" />
                  Best Time to Visit
                </h2>
                <p className="text-muted-foreground">{destination.bestTime}</p>
              </div>

              {/* Travel Tips */}
              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Plane className="w-6 h-6 text-ocean" />
                  Travel Tips for Visitors
                </h2>
                <ul className="space-y-3">
                  {destination.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Attractions */}
              <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Top Attractions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.attractions.map((attraction, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                    >
                      <span className="w-10 h-10 rounded-lg bg-gradient-coral flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-card rounded-2xl shadow-card p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Plan Your Visit</h3>
                <Button className="w-full mb-4" size="lg">
                  <Calendar className="w-5 h-5" />
                  Check Availability
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Building2 className="w-5 h-5" />
                  View All Stays
                </Button>
              </div>

              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl shadow-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Location</h3>
                <div className="aspect-square rounded-xl bg-secondary flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Properties */}
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
    </Layout>
  );
}
