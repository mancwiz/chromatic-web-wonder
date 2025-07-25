import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logoText from "../assets/textlogo.png";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet-async";
import textforlogo from "../assets/textforlogo.png";

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
  X,
  Bot,
  Earth,
  BicepsFlexed,
  Flower,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/navbar";
import ThemeToggle from "../components/ThemeToggle";
import { CmiDefinations } from "@/components/CmiDefinations";
import MovingTagline from "@/components/MovingTagline";

interface HomeProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ isDarkMode, onToggleTheme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Palette,
      title: "Color Shades",
      description:
        "Generate beautiful color shades from any base color. Perfect for creating consistent color palettes for your designs.",
      link: "/color-shades",
      gradient: "bg-gradient-primary",
    },
    {
      icon: Layers3,
      title: "Color Themes",
      description:
        "Discover pre-made color themes and create your own. From minimalist to vibrant, find the perfect theme for your project.",
      link: "/color-themes",
      gradient: "bg-gradient-secondary",
    },
    {
      icon: Blend,
      title: "Color Gradients",
      description:
        "Create stunning gradients with our advanced gradient generator. Export as CSS, SVG, or PNG for any project.",
      link: "/color-gradients",
      gradient: "bg-gradient-tertiary",
    },
  ];

  const stats = [
    { number: "95%", label: "Designers Felt Empowered", icon: Palette },
    { number: "1M+", label: "AI-Generated Combinations", icon: Bot },
    { number: "15s", label: "Avg. Time to First Color Pick", icon: Droplets }, // new unique stat
    { number: "75+", label: "Countries Reached", icon: Earth },
    { number: "99%", label: "Said: It Changed My Workflow", icon: Flower },
  ];

  const benefits = [
    {
      icon: Eye,
      title: "Professional Design",
      description:
        "Create color schemes that look professionally designed with our advanced algorithms.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Generate thousands of color combinations in seconds. No waiting, just instant results.",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description:
        "Export your colors in CSS, SCSS, JSON, PNG, SVG, and more formats for any workflow.",
    },
    {
      icon: Paintbrush,
      title: "Designer Friendly",
      description:
        "Built by designers for designers. Intuitive interface that makes color selection effortless.",
    },
  ];

  const industries = [
    {
      icon: Code,
      title: "Developers",
      description:
        "CSS variables, design systems, and color tokens for modern web development.",
    },
    {
      icon: Paintbrush,
      title: "Designers",
      description:
        "Professional color palettes for UI/UX, branding, and creative projects.",
    },
    {
      icon: Shirt,
      title: "Fashion Brands",
      description:
        "Seasonal color trends and palette coordination for clothing collections.",
    },
    {
      icon: Megaphone,
      title: "Marketing Teams",
      description:
        "Brand-consistent colors for campaigns, social media, and advertising materials.",
    },
    {
      icon: Printer,
      title: "Print Industry",
      description:
        "CMYK-ready colors and print-safe palettes for professional printing.",
    },
    {
      icon: Briefcase,
      title: "Businesses",
      description:
        "Corporate color schemes for presentations, websites, and brand identity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Helmet>
  {/* --- Primary Meta Tags --- */}
  <title>ColorsMi – AI-Powered Color Palette & Gradient Generator</title>
  <meta 
    name="description" 
    content="Generate beautiful color palettes, shades, themes, and gradients for your design projects. Free online color tools for designers, developers, and creatives." 
  />
  <meta 
    name="keywords" 
    content="color palette, color generator, css gradients, color themes, color shades, design tools, ui, ux, hex colors" 
  />
  <meta name="author" content="ColorsMi Team" />
  <link rel="canonical" href="https://colorsmi.com/" />

  {/* --- Open Graph / Facebook --- */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://colorsmi.com/" />
  <meta property="og:title" content="ColorsMi – AI-Powered Color Palette & Gradient Generator" />
  <meta property="og:description" content="Generate beautiful color palettes, shades, themes, and gradients for your design projects. Free online color tools for designers, developers, and creatives." />
  {/* You should create a main banner image for your home page */}
  {/* <meta property="og:image" content="https://colorsmi.com/og-image-home.png" /> */}

  {/* --- Twitter --- */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://colorsmi.com/" />
  <meta name="twitter:title" content="ColorsMi – AI-Powered Color Palette & Gradient Generator" />
  <meta name="twitter:description" content="Generate beautiful color palettes, shades, themes, and gradients for your design projects. Free online color tools for designers, developers, and creatives." />
  <meta name="twitter:site" content="@colorsmi_app" />
  {/* <meta name="twitter:image" content="https://colorsmi.com/og-image-home.png" /> */}
</Helmet>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32">
        {/* Animated Background */}
        {/* <div
          className="absolute inset-0 bg-gradient-mesh opacity-20 animate-gradient-move"
          style={{ backgroundSize: "400% 400%" }}
        /> */}
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60" // z-[-1] has been removed
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/homebg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-0 leading-tight">
              {/* <div className="items-start justify-start animate-bounce-subtle  -ml-16 -mb-20">
                <img
                  src={logoText}
                  alt="Colorsmi Logo Text"
                  className="max-h-20 sm:max-h-24 lg:max-h-48   object-contain"
                />
                <h2  > </h2>
              </div> */}
              <br />
              {/* <CmiDefinations/> */}
              {/* <span className="text-foreground font-poppins font-bold ">Colors <span className="bg-gradient-rainbow bg-clip-text text-transparent animate-gradient-move" 
                   style={{ backgroundSize: '400% 400%' }}>
                Make Impact
              </span> </span> */}
              <MovingTagline />
            </h1>
            {/* <MovingTagline/> */}

            {/* Subtitle */}
            <div className="relative">
              {/* <div className="absolute inset-0 bg-gradient-rainbow opacity-20 blur-3xl animate-pulse" /> */}

              <p className="relative text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                Discover endless possibilities with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent font-bold">
                  Colorsmi
                </span>{" "}
                - your ultimate companion for creating stunning color palettes,
                perfect shades, beautiful themes, and mesmerizing gradients that
                bring your designs to life.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-10 py-6 group relative overflow-hidden"
                asChild
              >
                <Link to="/color-shades" className="flex items-center">
                  <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <span className="relative">Unleash Creativity</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 hover:bg-gradient-primary/10 hover:border-primary text-lg px-10 py-6 group transition-all duration-300"
                asChild
              >
                <Link to="/color-themes" className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Explore Magic
                </Link>
              </Button>
            </div>

            {/* Animated Sparkles and Lines */}
            <div className="hidden lg:block">
              <div className="absolute top-32 left-24 animate-pulse">
                <Sparkles className="w-8 h-8 text-color-primary opacity-60" />
              </div>
              <div
                className="absolute top-48 right-32 animate-pulse"
                style={{ animationDelay: "1s" }}
              >
                <Star className="w-6 h-6 text-color-secondary opacity-60" />
              </div>
              <div
                className="absolute bottom-48 left-48 animate-pulse"
                style={{ animationDelay: "2s" }}
              >
                <Sparkles className="w-10 h-10 text-color-tertiary opacity-60" />
              </div>
              <div
                className="absolute bottom-32 right-24 animate-pulse"
                style={{ animationDelay: "3s" }}
              >
                <Star className="w-7 h-7 text-color-quaternary opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#FBFBFB" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Powerful Color Tools
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade color tools designed to make your creative
              process faster and more intuitive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`p-8 group hover:shadow-colorful transition-all duration-500 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
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
                    Learn More{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Creators in 75+ Countries
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of creative professionals using our tools daily
              <br />
              Every day, designers craft stunning visuals, developers fine-tune
              UI/UX colors, entrepreneurs shape brand <br /> palettes, and
              creatives generate vibrant themes and gradients all using
              Colorsmi.{" "}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
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
              For{" "}
              <span className="bg-gradient-tertiary bg-clip-text text-transparent">
                Every Industry
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From developers to fashion brands, our color tools power
              creativity across all industries.
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
              Why Choose{" "}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                colorsmi
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've built the most comprehensive suite of color tools to
              streamline your design workflow.
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
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {benefit.description}
                  </p>
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
            <h2 className="text-4xl font-bold mb-6">
              Experience the Full Spectrum
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore our complete range of color tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center group hover:shadow-glow transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-primary rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Droplets className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Color Shades</h3>
              <p className="text-muted-foreground mb-6">
                Generate perfect tints and shades from any color with precision
                control.
              </p>
              <Button className="bg-gradient-primary hover:shadow-glow" asChild>
                <Link to="/color-shades">Try Shades</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center group hover:shadow-glow transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-secondary rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Color Themes</h3>
              <p className="text-muted-foreground mb-6">
                Discover curated color themes and create harmonious palettes
                instantly.
              </p>
              <Button
                className="bg-gradient-secondary hover:shadow-glow"
                asChild
              >
                <Link to="/color-themes">Browse Themes</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center group hover:shadow-glow transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-tertiary rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Blend className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Color Gradients</h3>
              <p className="text-muted-foreground mb-6">
                Create stunning gradients with advanced controls and export
                options.
              </p>
              <Button
                className="bg-gradient-tertiary hover:shadow-glow"
                asChild
              >
                <Link to="/color-gradients">Make Gradients</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-rainbow opacity-10 animate-gradient-move"
          style={{ backgroundSize: "400% 400%" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8">
            Ready to Create <br />
            <span
              className="bg-gradient-rainbow bg-clip-text text-transparent animate-gradient-move"
              style={{ backgroundSize: "400% 400%" }}
            >
              Something Amazing?
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of designers who trust our tools for their daily
            color workflow. Start creating beautiful color palettes today.
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
              <Link to="/color-themes">View Examples</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className=" rounded-lg flex items-center justify-center">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src={logo} // ✅ Update with your actual image file path (e.g., /assets/logo.png)
                    alt="Colorsmi Logo"
                    className=" h-14 object-contain"
                  />{" "}
                </Link>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                <img
                  src={logoText}
                  alt="Colorsmi Logo Text"
                  className="max-h-10 sm:max-h-14 lg:max-h-10 -ml-3   object-contain"
                />
              </h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Professional color tools for modern designers and developers.
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <Link
                to="/color-shades"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Color Shades
              </Link>
              <Link
                to="/color-themes"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Color Themes
              </Link>
              <Link
                to="/color-gradients"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Color Gradients
              </Link>
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Color Blog
              </Link>
            </div>

            <div className="flex justify-center items-center space-x-4 pt-8 border-t border-border">
              <span className="text-muted-foreground">Theme:</span>
              <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
