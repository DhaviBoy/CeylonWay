import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Headphones, Star, ArrowRight, Compass, Building2 } from "lucide-react";

import heroImage from "@/assets/hero-beach.jpg";
import sigiriya from "@/assets/BW4YPnXzX3u1.jpg";
import galle from "@/assets/galle-fort-1050x700-1.jpg";
import ella from "@/assets/Ella42.jpg";
import kandy from "@/assets/Kandy.jpg";
import villaLuxury from "@/assets/villa-luxury.jpg";
import hotelBoutique from "@/assets/hotel-boutique.jpg";
import villaOverwater from "@/assets/villa-overwater.jpg";
import tourism from "@/assets/TAL-header-surfing-hiriketiya-sri-lanka-SURFSRILANKA0225-d53a7360601d415bbf9dfa1bd52a17bc.jpg";

const featuredDestinations = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    country: "Sri Lanka",
    image: sigiriya,
    rating: 4.9,
    propertyCount: 85,
    category: "Cultural Heritage",
  },
  {
    id: "galle",
    name: "Galle",
    country: "Sri Lanka",
    image: galle,
    rating: 4.8,
    propertyCount: 120,
    category: "Beach & Historical",
  },
  {
    id: "ella",
    name: "Ella",
    country: "Sri Lanka",
    image: ella,
    rating: 4.9,
    propertyCount: 95,
    category: "Mountain",
  },
  {
    id: "kandy",
    name: "Kandy",
    country: "Sri Lanka",
    image: kandy,
    rating: 4.7,
    propertyCount: 150,
    category: "Cultural",
  },
];

const popularProperties = [
  {
    id: "ocean-villa-1",
    name: "Oceanfront Luxury Villa",
    location: "Galle, Sri Lanka",
    image: villaLuxury,
    price: 350,
    rating: 4.9,
    reviewCount: 128,
    type: "villa" as const,
    amenities: ["wifi", "pool", "parking"],
  },
  {
    id: "boutique-hotel-1",
    name: "Heritage Boutique Hotel",
    location: "Kandy, Sri Lanka",
    image: hotelBoutique,
    price: 120,
    rating: 4.7,
    reviewCount: 256,
    type: "hotel" as const,
    amenities: ["wifi", "pool", "parking"],
  },
  {
    id: "beach-villa-1",
    name: "Tropical Beach Bungalow",
    location: "Mirissa, Sri Lanka",
    image: villaOverwater,
    price: 280,
    rating: 4.9,
    reviewCount: 89,
    type: "villa" as const,
    amenities: ["wifi", "pool"],
  },
];

const features = [
  {
    icon: Shield,
    title: "Trusted Stays",
    description: "Every property is verified for quality and safety standards.",
  },
  {
    icon: Clock,
    title: "Easy Booking",
    description: "Book in minutes with instant confirmation and flexible cancellation.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our travel experts are always here to help, day or night.",
  },
  {
    icon: Star,
    title: "Best Prices",
    description: "Guaranteed best rates with price match promise.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Travelers" },
  { value: "2,000+", label: "Properties" },
  { value: "150+", label: "Destinations" },
  { value: "4.9", label: "Average Rating" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover animate-zoom-in"
            poster={heroImage}
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            <source src="/videos/hero-background.webm" type="video/webm" />
            {/* Fallback image if video doesn't load */}
            <img
              src={heroImage}
              alt="Beautiful tropical beach destination"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-10 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-card/20 backdrop-blur-sm text-card text-sm font-medium mb-6 animate-fade-up">
              ✨ Discover the Pearl of the Indian Ocean
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-card mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Explore Sri Lanka,{" "}
              <span className="text-gradient-coral">Your Way</span>
            </h1>
            <p className="text-lg md:text-xl text-card/90 mb-10 max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Discover ancient temples, pristine beaches, lush tea plantations, 
              and book trusted accommodations across Sri Lanka with CeylonWay.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-card">{stat.value}</div>
                <div className="text-card/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Compass className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Destinations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Featured Destinations
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Explore our handpicked collection of the world's most breathtaking destinations.
              </p>
            </div>
            <Button variant="ghost" asChild className="self-start md:self-auto">
              <Link to="/destinations">
                View All Destinations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                {...destination}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Properties */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Accommodations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Popular Hotels & Villas
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                From luxury resorts to cozy boutique hotels, find your perfect stay.
              </p>
            </div>
            <Button variant="ghost" asChild className="self-start md:self-auto">
              <Link to="/stays">
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                {...property}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Wanderlust?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to making your travel experience seamless, secure, and unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-coral flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 relative bg-cover bg-center bg-no-repeat w-screen -mx-[calc((100vw-100%)/2)] mb-0"style={{ backgroundImage: `url(${tourism})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Explore Sri Lanka?
          </h2>
          <p className="text-primary-foreground/90 mb-10 max-w-xl mx-auto text-lg">
            Join thousands of travelers who've discovered the beauty of Sri Lanka with CeylonWay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/destinations">
                Explore Destinations
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/register">
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
