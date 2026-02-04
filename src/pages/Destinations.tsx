import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { DestinationsMap } from "@/components/maps/DestinationsMap";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Grid, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import sigiriya from "@/assets/BW4YPnXzX3u1.jpg";
import mirissa from "@/assets/coconut-tree-hill-2.jpg";
import ella from "@/assets/Ella42.jpg";
import kandy from "@/assets/Kandy.jpg";
import galle from "@/assets/galle-fort-1050x700-1.jpg";
import jaffna from "@/assets/LK61120100-03-E-1280-720.jpg";
import polonnaruwa from "@/assets/f991ffa5d12203de2fa6e201392b017b.jpg";

const categories = [
  { id: "all", label: "All", icon: Grid },
  { id: "beach", label: "Beach", icon: MapPin },
  { id: "mountain", label: "Mountain", icon: MapPin },
  { id: "cultural", label: "Cultural", icon: MapPin },
  { id: "city", label: "City", icon: MapPin },
];

const allDestinations = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    country: "Sri Lanka",
    image: sigiriya,
    rating: 4.9,
    propertyCount: 85,
    category: "Cultural Heritage",
    lat: 7.9428,
    lng: 80.7613,
  },
  {
    id: "mirissa",
    name: "Mirissa",
    country: "Sri Lanka",
    image: mirissa,
    rating: 4.8,
    propertyCount: 120,
    category: "Beach Paradise",
    lat: 5.9271,
    lng: 80.4765,
  },
  {
    id: "ella",
    name: "Ella",
    country: "Sri Lanka",
    image: ella,
    rating: 4.9,
    propertyCount: 95,
    category: "Mountain",
    lat: 6.8612,
    lng: 81.0430,
  },
  {
    id: "kandy",
    name: "Kandy",
    country: "Sri Lanka",
    image: kandy,
    rating: 4.7,
    propertyCount: 150,
    category: "Cultural",
    lat: 6.9271,
    lng: 80.6366,
  },
  {
    id: "galle",
    name: "Galle",
    country: "Sri Lanka",
    image: galle,
    rating: 4.8,
    propertyCount: 110,
    category: "Beach & Historical",
    lat: 6.0535,
    lng: 80.2197,
  },
  {
    id: "jaffna",
    name: "Jaffna",
    country: "Sri Lanka",
    image: jaffna,
    rating: 4.6,
    propertyCount: 65,
    category: "Beach & Cultural",
    lat: 9.6615,
    lng: 80.7740,
  },
  {
    id: "polonnaruwa",
    name: "Polonnaruwa",
    country: "Sri Lanka",
    image: polonnaruwa,
    rating: 4.8,
    propertyCount: 72,
    category: "Cultural Heritage",
    lat: 7.9408,
    lng: 81.0022,
  },
];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const filteredDestinations = allDestinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || 
      destination.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-coral py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Explore Sri Lanka
            </h1>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Discover the beauty of Sri Lanka - from ancient cultural sites to pristine beaches and misty mountains.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-secondary rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === "grid"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === "map"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <MapIcon className="w-4 h-4" />
                Map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredDestinations.length}</span> destinations
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDestinations.map((destination, index) => (
                  <DestinationCard
                    key={destination.id}
                    {...destination}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="h-[600px] rounded-2xl bg-secondary overflow-hidden">
              <DestinationsMap
                destinations={filteredDestinations}
                onDestinationClick={(destination) => {
                  console.log("Clicked destination:", destination);
                }}
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
