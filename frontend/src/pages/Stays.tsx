import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { PropertyCard } from "@/components/cards/PropertyCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import hotels from "@/assets/98-Acres-Resort--Spa-to-spearhead-luxury-tourism-to-Sri-Lanka-via-recent-award-Top-20-Best-Romantic-Hotels-in-Asia-2022.jpg";
import { SearchBar } from "@/components/search/SearchBar";

const propertyTypes = [
  { id: "all", label: "All" },
  { id: "hotel", label: "Hotels" },
  { id: "villa", label: "Villas" },
];

const priceRanges = [
  { id: "all", label: "Any Price" },
  { id: "budget", label: "$ Under $100" },
  { id: "mid", label: "$$ $100-$300" },
  { id: "luxury", label: "$$$ $300+" },
];

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
];

export default function Stays() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeType, setActiveType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesType = activeType === "all" || property.type === activeType;
    let matchesPrice = true;
    if (priceRange === "budget") matchesPrice = property.price < 100;
    else if (priceRange === "mid") matchesPrice = property.price >= 100 && property.price <= 300;
    else if (priceRange === "luxury") matchesPrice = property.price > 300;
    return matchesType && matchesPrice;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviewCount - a.reviewCount; // popular
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
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Hotels & Villas
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Find your perfect stay from our curated collection of luxury hotels and private villas.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SearchBar variant="compact" />
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-6 border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
            {/* Type Tabs */}
            <div className="flex items-center gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeType === type.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Filters Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 rounded-2xl bg-secondary/50 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filter by Price</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-background rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setPriceRange(range.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      priceRange === range.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-card/80 border border-border"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{sortedProperties.length}</span> properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                {...property}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
              />
            ))}
          </div>

          {sortedProperties.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No properties found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
