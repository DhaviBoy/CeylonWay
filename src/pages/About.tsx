import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Award, Users, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import heroBg from "@/assets/hero-beach.jpg";

const stats = [
  { value: "50K+", label: "Happy Travelers" },
  { value: "2,000+", label: "Properties" },
  { value: "150+", label: "Destinations" },
  { value: "4.9/5", label: "Customer Rating" },
];

const values = [
  {
    icon: Globe,
    title: "Global Excellence",
    description: "Connecting travelers worldwide with the best destinations and accommodations in Sri Lanka.",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-500",
  },
  {
    icon: Heart,
    title: "Passion for Travel",
    description: "We believe travel transforms lives. Every journey should be memorable and seamless.",
    bgColor: "bg-rose-50",
    iconBg: "bg-rose-500",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Every property is verified and rated by our expert team to ensure the highest standards.",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-500",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority. 24/7 support team ready to assist you anytime.",
    bgColor: "bg-teal-50",
    iconBg: "bg-teal-500",
  },
];



export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="py-28 md:py-30 relative bg-cover bg-center bg-no-repeat w-screen -mx-[calc((100vw-100%)/2)]"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About CeylonWay
            </h1>
            <p className="text-white/90 text-xl">
              Your trusted partner in discovering the pearl of the Indian Ocean. We're committed to making travel to Sri Lanka unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Story
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                CeylonWay was founded with a simple vision: to make traveling to Sri Lanka accessible, affordable, and absolutely unforgettable. We started as a small team of travel enthusiasts who fell in love with the island's beauty and wanted to share it with the world.
              </p>
              <p className="text-muted-foreground text-lg mb-4">
                Today, we've grown into a trusted platform connecting thousands of travelers with handpicked accommodations, stunning destinations, and personalized travel experiences across Sri Lanka.
              </p>
              <p className="text-muted-foreground text-lg">
                Our mission remains unchanged: to inspire wanderlust and create memories that last a lifetime.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="p-8 rounded-2xl bg-card shadow-card text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These principles guide everything we do at CeylonWay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`p-8 rounded-2xl ${value.bgColor} shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up`}
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className={`w-12 h-12 rounded-xl ${value.iconBg} flex items-center justify-center mb-6`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">
            Why Choose CeylonWay?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-orange-50 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up" style={{ animationDelay: "0s" }}>
              <Award className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Verified Properties
              </h3>
              <p className="text-muted-foreground">
                Every hotel and villa is personally inspected and verified for quality, safety, and authentic experiences.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-green-50 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Best Value
              </h3>
              <p className="text-muted-foreground">
                Transparent pricing with no hidden fees. We guarantee the best rates across all our partnerships.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-blue-50 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Users className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                24/7 Support
              </h3>
              <p className="text-muted-foreground">
                Our expert team is always available to help before, during, and after your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Explore Sri Lanka?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of travelers who've discovered the magic of Sri Lanka with CeylonWay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="xl" asChild>
              <Link to="/destinations">
                Explore Destinations
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/stays">
                Browse Hotels & Villas
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
