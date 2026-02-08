import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, MapPin, Building2, Globe, Compass, Sparkles, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { 
    name: "Home", 
    href: "/", 
    icon: Home,
    description: "Back to home"
  },
  { 
    name: "Destinations", 
    href: "/destinations", 
    icon: MapPin,
    description: "Explore amazing places"
  },
  { 
    name: "Hotels & Villas", 
    href: "/stays", 
    icon: Building2,
    description: "Find your perfect stay"
  },
  { 
    name: "About", 
    href: "/about", 
    icon: Compass,
    description: "Our story"
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 via-coral/5 to-ocean/5 backdrop-blur-xl border-b border-coral/20 shadow-lg shadow-coral/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-coral via-sunset to-golden shadow-lg shadow-coral/30 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-coral/40">
              <Sparkles className="w-5 h-5 text-white absolute -top-1 -right-1 animate-pulse" />
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-coral via-sunset to-golden bg-clip-text text-transparent">
                CeylonWay
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1">Discover Sri Lanka</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-coral to-sunset text-white shadow-lg shadow-coral/30 scale-105"
                      : "text-foreground/70 hover:text-foreground hover:bg-coral/10 hover:scale-105"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isActive ? "animate-pulse" : "group-hover:rotate-12"
                  )} />
                  <span className="text-sm font-semibold">{link.name}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white animate-bounce" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <User className="w-4 h-4" />
                Sign In
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-border space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
