import { Link } from "react-router-dom";
import { Star, MapPin, Heart, Wifi, Car, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  type: "hotel" | "villa";
  amenities: string[];
  className?: string;
  style?: React.CSSProperties;
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  pool: Waves,
};

export function PropertyCard({
  id,
  name,
  location,
  image,
  price,
  rating,
  reviewCount,
  type,
  amenities,
  className,
  style,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link
      to={`/stays/${id}`}
      className={cn(
        "group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift",
        className
      )}
      style={style}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Add to favorites"
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isFavorite ? "fill-primary text-primary" : "text-foreground"
            )}
          />
        </button>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-ocean text-accent-foreground capitalize">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-golden text-golden" />
            <span className="font-semibold text-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Name & Location */}
        <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <MapPin className="w-3 h-3" />
          {location}
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 mb-4">
          {amenities.slice(0, 3).map((amenity) => {
            const Icon = amenityIcons[amenity.toLowerCase()];
            return Icon ? (
              <div
                key={amenity}
                className="flex items-center gap-1 text-muted-foreground text-xs"
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{amenity}</span>
              </div>
            ) : null;
          })}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-foreground">${price}</span>
            <span className="text-muted-foreground text-sm"> /night</span>
          </div>
          <span className="text-sm font-medium text-primary">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
