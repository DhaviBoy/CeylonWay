import { useState } from "react";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  className?: string;
}

export function SearchBar({ variant = "hero", className }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "bg-card rounded-2xl shadow-xl",
        isHero ? "p-2 md:p-3" : "p-2",
        className
      )}
    >
      <div className={cn(
        "grid gap-2 md:gap-0",
        isHero 
          ? "grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto]" 
          : "grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto]"
      )}>
        {/* Location */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 md:bg-transparent md:rounded-none",
          isHero && "md:border-r md:border-border"
        )}>
          <MapPin className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs text-muted-foreground font-medium">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 md:bg-transparent md:rounded-none",
          isHero && "md:border-r md:border-border"
        )}>
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs text-muted-foreground font-medium">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 md:bg-transparent md:rounded-none",
          isHero && "md:border-r md:border-border"
        )}>
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs text-muted-foreground font-medium">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* Guests - only on hero */}
        {isHero && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 md:bg-transparent md:rounded-none">
            <Users className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-muted-foreground font-medium">
                Guests
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="flex-1 bg-transparent text-foreground focus:outline-none text-sm font-medium appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <Button 
          size={isHero ? "xl" : "lg"} 
          className={cn(
            "rounded-xl",
            isHero ? "md:px-8" : "md:px-6"
          )}
        >
          <Search className="w-5 h-5" />
          <span className={cn(isHero ? "md:inline" : "hidden md:inline")}>
            Search
          </span>
        </Button>
      </div>
    </div>
  );
}
