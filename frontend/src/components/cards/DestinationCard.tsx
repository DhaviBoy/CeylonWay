import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  propertyCount: number;
  category: string;
  className?: string;
  style?: React.CSSProperties;
}

export function DestinationCard({
  id,
  name,
  country,
  image,
  rating,
  propertyCount,
  category,
  className,
  style,
}: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${id}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover-lift",
        className
      )}
      style={style}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-card/90 backdrop-blur-sm text-foreground">
          {category}
        </span>
      </div>

      {/* Rating */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm">
        <Star className="w-3 h-3 fill-golden text-golden" />
        <span className="text-xs font-medium text-foreground">{rating}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-xl font-bold text-card mb-1">{name}</h3>
        <div className="flex items-center gap-1 text-card/80 text-sm mb-2">
          <MapPin className="w-3 h-3" />
          {country}
        </div>
        <p className="text-card/70 text-sm">
          {propertyCount} properties
        </p>
      </div>
    </Link>
  );
}
