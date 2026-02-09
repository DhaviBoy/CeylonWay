import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { DestinationsMap } from "@/components/maps/DestinationsMap";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, Grid, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import hotels from "@/assets/home-banner-frame-1_531b0a49e14ce11ce2833cb243642c1b.jpg";

const categories = [
  { id: "all", label: "All", icon: Grid },
  { id: "beach", label: "Beach", icon: MapPin },
  { id: "mountain", label: "Mountain", icon: MapPin },
  { id: "cultural", label: "Cultural", icon: MapPin },
  { id: "city", label: "City", icon: MapPin },
];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locations");
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" ||
      destination.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Header */}
      <section
        className="py-16 md:py-24 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hotels})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Explore Sri Lanka
            </h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Discover the beauty of Sri Lanka - from ancient cultural sites to pristine beaches and misty mountains.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b border-border bg-background">
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
