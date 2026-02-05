import { Link } from "react-router-dom";
import { Globe, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  discover: [
    { name: "Popular Destinations", href: "/destinations" },
    { name: "Featured Hotels", href: "/stays" },
    { name: "Travel Guides", href: "/guides" },
    { name: "Last Minute Deals", href: "/deals" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Youtube", icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-coral flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
            <span className="text-xl font-bold text-background">
              CeylonWay
            </span>
          </Link>
          <p className="text-background/70 mb-6 max-w-sm">
            Discover Sri Lanka with ease. Book trusted hotels, explore stunning 
            destinations, and create memories that last a lifetime.
          </p>
          <div className="space-y-3">
            <a href="mailto:hello@ceylonway.lk" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
              <Mail className="w-4 h-4" />
              hello@ceylonway.lk
            </a>
            <a href="tel:+94112345678" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
              <Phone className="w-4 h-4" />
              +94 11 234 5678
            </a>
            <p className="flex items-center gap-2 text-background/70">
              <MapPin className="w-4 h-4" />
              Colombo, Sri Lanka
            </p>
          </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold text-background mb-4">Discover</h3>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-background mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-background mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} CeylonWay. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 text-background" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
