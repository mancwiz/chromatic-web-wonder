import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Palette, 
  Layers3, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Download, 
  Zap,
  CheckCircle,
  Star,
  Paintbrush,
  Blend,
  Droplets,
  Code,
  Shirt,
  Megaphone,
  Printer,
  Briefcase,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Palette,
      title: "Color Shades",
      description: "Generate beautiful color shades from any base color. Perfect for creating consistent color palettes for your designs.",
      link: "/color-shades",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Layers3,
      title: "Color Themes",
      description: "Discover pre-made color themes and create your own. From minimalist to vibrant, find the perfect theme for your project.",
      link: "/color-themes",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Sparkles,
      title: "Color Gradients",
      description: "Create stunning gradients with our advanced gradient generator. Export as CSS, SVG, or PNG for any project.",
      link: "/color-gradients",
      gradient: "bg-gradient-tertiary"
    }
  ];

  const stats = [
    { number: "500K+", label: "Colors Generated", icon: Palette },
    { number: "50K+", label: "Happy Designers", icon: Star },
    { number: "1M+", label: "Downloads", icon: Download },
    { number: "99%", label: "Satisfaction Rate", icon: CheckCircle }
  ];

  const benefits = [
    {
      icon: Eye,
      title: "Professional Design",
      description: "Create color schemes that look professionally designed with our advanced algorithms."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate thousands of color combinations in seconds. No waiting, just instant results."
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Export your colors in CSS, SCSS, JSON, PNG, SVG, and more formats for any workflow."
    },
    {
      icon: Paintbrush,
      title: "Designer Friendly",
      description: "Built by designers for designers. Intuitive interface that makes color selection effortless."
    }
  ];

  const industries = [
    {
      icon: Code,
      title: "Developers",
      description: "CSS variables, design systems, and color tokens for modern web development."
    },
    {
      icon: Paintbrush,
      title: "Designers",
      description: "Professional color palettes for UI/UX, branding, and creative projects."
    },
    {
      icon: Shirt,
      title: "Fashion Brands",
      description: "Seasonal color trends and palette coordination for clothing collections."
    },
    {
      icon: Megaphone,
      title: "Marketing Teams",
      description: "Brand-consistent colors for campaigns, social media, and advertising materials."
    },
    {
      icon: Printer,
      title: "Print Industry",
      description: "CMYK-ready colors and print-safe palettes for professional printing."
    },
    {
      icon: Briefcase,
      title: "Businesses",
      description: "Corporate color schemes for presentations, websites, and brand identity."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* SEO Meta Content */}
      <div className="sr-only">
        <h1>Color Tools - Professional Color Generator, Shades, Themes & Gradients</h1>
        <p>
          Generate beautiful color palettes, shades, themes, and gradients for your design projects. 
          Free online color tools for designers, developers, and creatives. Export in multiple formats 
          including CSS, SCSS, JSON, PNG, and SVG.
        </p>
      </div>

      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 animate-gradient-move" 
             style={{ backgroundSize: '400% 400%' }} />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-rainbow bg-clip-text text-transparent animate-gradient-move" 
                   style={{ backgroundSize: '400% 400%' }}>
                Color Magic
              </span>
              <br />
              <span className="text-foreground">Starts Here</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Create stunning color palettes, generate perfect shades, design beautiful themes, 
              and craft mesmerizing gradients. Everything you need for professional color design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 animate-pulse-glow"
                asChild
              >
                <Link to="/color-shades">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-4"
                asChild
              >
                <Link to="/color-themes">
                  Explore Themes
                </Link>
              </Button>
            </div>

            {/* Animated Sparkles and Lines */}
            <div className="hidden lg:block">
              <div className="absolute top-32 left-24 animate-pulse">
                <Sparkles className="w-8 h-8 text-color-primary opacity-60" />
              </div>
              <div className="absolute top-48 right-32 animate-pulse" style={{ animationDelay: '1s' }}>
                <Star className="w-6 h-6 text-color-secondary opacity-60" />
              </div>
              <div className="absolute bottom-48 left-48 animate-pulse" style={{ animationDelay: '2s' }}>
                <Sparkles className="w-10 h-10 text-color-tertiary opacity-60" />
              </div>
              <div className="absolute bottom-32 right-24 animate-pulse" style={{ animationDelay: '3s' }}>
                <Star className="w-7 h-7 text-color-quaternary opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Powerful Color Tools
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade color tools designed to make your creative process faster and more intuitive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className={`p-8 group hover:shadow-colorful transition-all duration-500 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="group-hover:bg-primary/10 transition-colors"
                  asChild
                >
                  <Link to={feature.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Designers Worldwide</h2>
            <p className="text-xl text-muted-foreground">Join thousands of creative professionals using our tools daily</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-gradient-to-br from-card/30 to-background px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              For <span className="bg-gradient-tertiary bg-clip-text text-transparent">Every Industry</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From developers to fashion brands, our color tools power creativity across all industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card 
                key={industry.title}
                className={`p-6 group hover:shadow-colorful transition-all duration-500 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {industry.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {industry.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-secondary bg-clip-text text-transparent">Color Magic?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've built the most comprehensive suite of color tools to streamline your design workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className={`flex items-start gap-6 animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Showcase */}
      <section className="py-24 bg-gradient-to-br from-background via-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Experience the Full Spectrum</h2>
            <p className="text-xl text-muted-foreground">Explore our complete range of color tools</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center group hover:shadow-glow transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Droplets className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Color Shades</h3>
              <p className="text-muted-foreground mb-6">Generate perfect tints and shades from any color with precision control.</p>
              <Button className="bg-gradient-primary hover:shadow-glow" asChild>
                <Link to="/color-shades">Try Shades</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center group hover:shadow-glow transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-secondary rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Color Themes</h3>
              <p className="text-muted-foreground mb-6">Discover curated color themes and create harmonious palettes instantly.</p>
              <Button className="bg-gradient-secondary hover:shadow-glow" asChild>
                <Link to="/color-themes">Browse Themes</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center group hover:shadow-glow transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-tertiary rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Blend className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Color Gradients</h3>
              <p className="text-muted-foreground mb-6">Create stunning gradients with advanced controls and export options.</p>
              <Button className="bg-gradient-tertiary hover:shadow-glow" asChild>
                <Link to="/color-gradients">Make Gradients</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-rainbow opacity-10 animate-gradient-move" 
             style={{ backgroundSize: '400% 400%' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8">
            Ready to Create <br />
            <span className="bg-gradient-rainbow bg-clip-text text-transparent animate-gradient-move" 
                 style={{ backgroundSize: '400% 400%' }}>
              Something Amazing?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of designers who trust our tools for their daily color workflow. 
            Start creating beautiful color palettes today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-10 py-4 animate-pulse-glow"
              asChild
            >
              <Link to="/color-shades">
                Get Started Free <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/50 hover:bg-primary/10 text-lg px-10 py-4"
              asChild
            >
              <Link to="/color-themes">
                View Examples
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Color Magic
            </h3>
            <p className="text-muted-foreground mb-8">
              Professional color tools for modern designers and developers.
            </p>
            <div className="flex justify-center space-x-8">
              <Link to="/color-shades" className="text-muted-foreground hover:text-primary transition-colors">
                Color Shades
              </Link>
              <Link to="/color-themes" className="text-muted-foreground hover:text-primary transition-colors">
                Color Themes
              </Link>
              <Link to="/color-gradients" className="text-muted-foreground hover:text-primary transition-colors">
                Color Gradients
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                Color Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;