import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Copy, Heart, Download, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Helmet } from 'react-helmet-async';

interface ColorGradientsProps {
  searchTerm: string;
  favorites: string[];
  onToggleFavorite: (color: string) => void;
  isDarkMode: boolean;
}

const ColorGradients: React.FC<ColorGradientsProps> = ({ searchTerm, favorites, onToggleFavorite, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null);
  const [direction, setDirection] = useState('linear');
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const gradientsPerPage = 500;
  const totalPages = 50000; // Representing infinite gradients

  // Scrolling detection
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Reset to page 1 when category or direction changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, direction]);

  const gradientCategories = [
    { id: 'all', label: 'All Gradients', description: 'Every possible combination' },
    { id: 'light', label: 'Light Gradients', description: '2,000,000+ light combinations' },
    { id: 'dark', label: 'Dark Gradients', description: '2,000,000+ dark combinations' },
    { id: 'aesthetic', label: 'Aesthetic', description: 'Carefully curated beautiful gradients' },
    { id: 'sunset', label: 'Sunset', description: 'Warm, golden hour inspired' },
    { id: 'ocean', label: 'Ocean', description: 'Deep blues and aqua tones' },
    { id: 'forest', label: 'Forest', description: 'Natural greens and earth tones' },
    { id: 'cosmic', label: 'Cosmic', description: 'Space-inspired purples and blues' },
    { id: 'fire', label: 'Fire', description: 'Warm reds, oranges, and yellows' },
    { id: 'ice', label: 'Ice', description: 'Cool blues, whites, and cyans' },
    { id: 'neon', label: 'Neon', description: 'Electric, glowing combinations' },
    { id: 'pastel', label: 'Pastel', description: 'Soft, gentle color transitions' },
    { id: 'monochrome', label: 'Monochrome', description: 'Single hue variations' },
    { id: 'rainbow', label: 'Rainbow', description: 'Multi-color spectrum gradients' },
    { id: 'vintage', label: 'Vintage', description: 'Retro, muted gradients' },
    { id: 'modern', label: 'Modern', description: 'Contemporary, sleek gradients' },
    { id: 'tropical', label: 'Tropical', description: 'Vibrant, exotic gradients' },
    { id: 'autumn', label: 'Autumn', description: 'Fall-inspired warm gradients' },
    { id: 'spring', label: 'Spring', description: 'Fresh, blooming gradients' },
    { id: 'winter', label: 'Winter', description: 'Cool, crisp gradients' },
    { id: 'summer', label: 'Summer', description: 'Bright, sunny gradients' },
    { id: 'metallic', label: 'Metallic', description: 'Gold, silver, copper tones' },
    { id: 'jewel', label: 'Jewel Tones', description: 'Rich, luxurious colors' },
    { id: 'earth', label: 'Earth Tones', description: 'Natural, organic gradients' },
    { id: 'candy', label: 'Candy', description: 'Sweet, playful gradients' },
    { id: 'corporate', label: 'Corporate', description: 'Professional, business gradients' }
  ];

  const directions = [
    { id: 'linear', label: 'Linear', css: 'linear-gradient' },
    { id: 'radial', label: 'Radial', css: 'radial-gradient' },
    { id: 'conic', label: 'Conic', css: 'conic-gradient' }
  ];

  const generateSingleGradient = useCallback((category: string, gradientDirection: string, seed: number) => {
    const colors = [];
    const colorCount = 2 + (seed % 4); // 2-5 colors per gradient
    
    for (let i = 0; i < colorCount; i++) {
      const color = generateColorForCategory(category, seed, i);
      colors.push(color);
    }
    
    const cssGradient = createCSSGradient(colors, gradientDirection, seed);
    
    return {
      colors,
      css: cssGradient,
      preview: cssGradient,
      id: `gradient-${category}-${gradientDirection}-${seed}`
    };
  }, []);

  const generateColorForCategory = (category: string, seed: number, index: number) => {
    let hue, saturation, lightness;
    
    const baseSeed = (seed * 9301 + 49297) % 233280;
    const colorSeed = (baseSeed + index * 1234) % 360;
    
    switch (category) {
      case 'light':
        hue = colorSeed;
        saturation = 30 + (seed + index * 7) % 40;
        lightness = 70 + (seed + index * 3) % 25;
        break;
        
      case 'dark':
        hue = colorSeed;
        saturation = 40 + (seed + index * 11) % 50;
        lightness = 15 + (seed + index * 5) % 30;
        break;
        
      case 'aesthetic':
        const aestheticPalettes = [
          [320, 280, 240], // Pink to purple to blue
          [60, 120, 180],  // Yellow to green to cyan
          [30, 60, 90],    // Orange to yellow to lime
          [200, 240, 280], // Cyan to blue to purple
          [0, 30, 60]      // Red to orange to yellow
        ];
        const palette = aestheticPalettes[seed % aestheticPalettes.length];
        hue = palette[index % palette.length];
        saturation = 60 + (seed + index * 5) % 30;
        lightness = 45 + (seed + index * 7) % 30;
        break;
        
      case 'sunset':
        const sunsetHues = [0, 15, 30, 45, 60]; // Red to yellow range
        hue = sunsetHues[index % sunsetHues.length] + (seed + index * 3) % 10;
        saturation = 70 + (seed + index * 3) % 25;
        lightness = 50 + (seed + index * 5) % 30;
        break;
        
      case 'ocean':
        const oceanHues = [180, 200, 220, 240, 260]; // Cyan to blue range
        hue = oceanHues[index % oceanHues.length] + (seed + index * 5) % 15;
        saturation = 55 + (seed + index * 7) % 35;
        lightness = 40 + (seed + index * 9) % 40;
        break;
        
      case 'forest':
        const forestHues = [90, 120, 150, 60, 30]; // Green to brown range
        hue = forestHues[index % forestHues.length] + (seed + index * 7) % 20;
        saturation = 40 + (seed + index * 5) % 40;
        lightness = 25 + (seed + index * 11) % 40;
        break;
        
      case 'cosmic':
        const cosmicHues = [240, 260, 280, 300, 320]; // Blue to purple range
        hue = cosmicHues[index % cosmicHues.length] + (seed + index * 9) % 15;
        saturation = 60 + (seed + index * 3) % 30;
        lightness = 30 + (seed + index * 13) % 40;
        break;
        
      case 'fire':
        const fireHues = [0, 15, 30, 45]; // Red to orange range
        hue = fireHues[index % fireHues.length] + (seed + index * 5) % 10;
        saturation = 80 + (seed + index * 2) % 20;
        lightness = 45 + (seed + index * 7) % 25;
        break;
        
      case 'ice':
        const iceHues = [180, 200, 220, 240]; // Cool blues
        hue = iceHues[index % iceHues.length] + (seed + index * 7) % 15;
        saturation = 30 + (seed + index * 5) % 40;
        lightness = 60 + (seed + index * 3) % 30;
        break;
        
      case 'neon':
        hue = colorSeed;
        saturation = 90 + (seed + index * 2) % 10;
        lightness = 50 + (seed + index * 3) % 20;
        break;
        
      case 'pastel':
        hue = colorSeed;
        saturation = 25 + (seed + index * 3) % 25;
        lightness = 75 + (seed + index * 5) % 20;
        break;
        
      case 'monochrome':
        hue = (seed * 37) % 360;
        saturation = 60 + (seed + index * 5) % 30;
        lightness = 20 + (index * 60) / 4; // Spread across lightness range
        break;
        
      case 'rainbow':
        hue = (index * 60) % 360; // Even distribution across spectrum
        saturation = 70 + (seed + index * 3) % 25;
        lightness = 50 + (seed + index * 5) % 20;
        break;

      case 'vintage':
        hue = colorSeed;
        saturation = 20 + (seed + index * 7) % 30;
        lightness = 40 + (seed + index * 11) % 30;
        break;

      case 'modern':
        hue = colorSeed;
        saturation = 60 + (seed + index * 5) % 30;
        lightness = 50 + (seed + index * 13) % 25;
        break;

      case 'tropical':
        const tropicalHues = [120, 180, 300, 60, 30]; // Greens, cyans, magentas, yellows
        hue = tropicalHues[index % tropicalHues.length] + (seed + index * 11) % 30;
        saturation = 70 + (seed + index * 3) % 25;
        lightness = 45 + (seed + index * 7) % 25;
        break;

      case 'autumn':
        const autumnHues = [30, 45, 15, 60, 0]; // Oranges, browns, reds, yellows
        hue = autumnHues[index % autumnHues.length] + (seed + index * 9) % 20;
        saturation = 50 + (seed + index * 7) % 35;
        lightness = 35 + (seed + index * 11) % 30;
        break;

      case 'spring':
        const springHues = [90, 120, 300, 60, 180]; // Light greens, pinks, yellows
        hue = springHues[index % springHues.length] + (seed + index * 13) % 25;
        saturation = 40 + (seed + index * 5) % 40;
        lightness = 55 + (seed + index * 7) % 25;
        break;

      case 'winter':
        const winterHues = [200, 240, 180, 220, 260]; // Blues, cyans
        hue = winterHues[index % winterHues.length] + (seed + index * 11) % 20;
        saturation = 45 + (seed + index * 7) % 35;
        lightness = 40 + (seed + index * 9) % 30;
        break;

      case 'summer':
        const summerHues = [60, 180, 300, 120, 30]; // Bright yellows, cyans, magentas
        hue = summerHues[index % summerHues.length] + (seed + index * 17) % 30;
        saturation = 65 + (seed + index * 3) % 30;
        lightness = 50 + (seed + index * 11) % 25;
        break;

      case 'metallic':
        const metallicHues = [45, 0, 30, 220, 240]; // Gold, silver, copper, steel
        hue = metallicHues[index % metallicHues.length] + (seed + index * 5) % 15;
        saturation = 25 + (seed + index * 7) % 35;
        lightness = 45 + (seed + index * 11) % 30;
        break;

      case 'jewel':
        const jewelHues = [240, 120, 0, 300, 180]; // Sapphire, emerald, ruby, amethyst, aquamarine
        hue = jewelHues[index % jewelHues.length] + (seed + index * 7) % 20;
        saturation = 70 + (seed + index * 3) % 25;
        lightness = 35 + (seed + index * 9) % 25;
        break;

      case 'earth':
        const earthHues = [30, 45, 60, 20, 40]; // Browns, oranges, yellows
        hue = earthHues[index % earthHues.length] + (seed + index * 7) % 20;
        saturation = 30 + (seed + index * 5) % 30;
        lightness = 25 + (seed + index * 9) % 35;
        break;

      case 'candy':
        const candyHues = [300, 60, 180, 120, 0]; // Pink, yellow, cyan, green, red
        hue = candyHues[index % candyHues.length] + (seed + index * 11) % 30;
        saturation = 75 + (seed + index * 3) % 20;
        lightness = 60 + (seed + index * 7) % 25;
        break;

      case 'corporate':
        const corporateHues = [220, 200, 0, 240, 30]; // Blues, grays, accent colors
        hue = corporateHues[index % corporateHues.length] + (seed + index * 7) % 15;
        saturation = 30 + (seed + index * 5) % 40;
        lightness = 35 + (seed + index * 13) % 35;
        break;
        
      default: // 'all'
        hue = colorSeed;
        saturation = 30 + (seed + index * 11) % 60;
        lightness = 25 + (seed + index * 17) % 60;
    }
    
    const hslColor = `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`;
    const hexColor = hslToHex(hue, saturation, lightness);
    
    return {
      hsl: hslColor,
      hex: hexColor,
      hue: Math.round(hue),
      saturation: Math.round(saturation),
      lightness: Math.round(lightness)
    };
  };

  const createCSSGradient = (colors: any[], gradientDirection: string, seed: number) => {
    const colorStops = colors.map((color, index) => {
      const position = index === 0 ? 0 : index === colors.length - 1 ? 100 : (index / (colors.length - 1)) * 100;
      return `${color.hex} ${position}%`;
    }).join(', ');
    
    switch (gradientDirection) {
      case 'linear':
        const angle = (seed * 13) % 360;
        return `linear-gradient(${angle}deg, ${colorStops})`;
        
      case 'radial':
        const shapes = ['circle', 'ellipse'];
        const positions = ['center', 'top', 'bottom', 'left', 'right'];
        const shape = shapes[seed % shapes.length];
        const position = positions[seed % positions.length];
        return `radial-gradient(${shape} at ${position}, ${colorStops})`;
        
      case 'conic':
        const conicAngle = (seed * 17) % 360;
        return `conic-gradient(from ${conicAngle}deg, ${colorStops})`;
        
      default:
        return `linear-gradient(45deg, ${colorStops})`;
    }
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const copyGradientToClipboard = (gradient: any) => {
    const cssCode = `/* ${gradient.category} gradient */\nbackground: ${gradient.css};\n\n/* Alternative syntax */\nbackground-image: ${gradient.css};`;
    
    navigator.clipboard.writeText(cssCode);
    setCopiedGradient(gradient.id);
    setTimeout(() => setCopiedGradient(null), 2000);
  };

  // Generate gradients for current page
  const currentGradients = useMemo(() => {
    const gradients = [];
    const startIndex = (currentPage - 1) * gradientsPerPage;
    
    for (let i = 0; i < gradientsPerPage; i++) {
      const gradientIndex = startIndex + i;
      const gradient = generateSingleGradient(selectedCategory, direction, gradientIndex);
      gradients.push({
        ...gradient,
        category: selectedCategory,
        direction: direction
      });
    }
    
    return gradients;
  }, [currentPage, selectedCategory, direction, generateSingleGradient]);

  const filteredGradients = useMemo(() => {
    if (!searchTerm) return currentGradients;
    return currentGradients.filter(gradient => 
      gradient.colors.some((color: any) => 
        color.hex.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [currentGradients, searchTerm]);

  // Pagination logic
  const maxVisiblePages = 15;
  const gradientsBoxRef = React.useRef<HTMLDivElement>(null);

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the gradients box
    if (gradientsBoxRef.current) {
      gradientsBoxRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <div className={`space-y-6 bg-background mt-16 ${isScrolling ? 'scrolling' : ''}`}>
      <Helmet>
  {/* --- Primary Meta Tags --- */}
  <title>CSS Gradient Generator – ColorsMi</title>
  <meta 
    name="description" 
    content="Create beautiful, custom CSS gradients with our advanced generator. Easily customize colors, angles, and export the code for your projects." 
  />
  <meta name="author" content="ColorsMi Team" />
  <link rel="canonical" href="https://colorsmi.com/color-gradients" />

  {/* --- Open Graph / Facebook --- */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://colorsmi.com/color-gradients" />
  <meta property="og:title" content="CSS Gradient Generator – ColorsMi" />
  <meta property="og:description" content="Create beautiful, custom CSS gradients with our advanced generator. Easily customize colors, angles, and export the code for your projects." />
  {/* <meta property="og:image" content="https://colorsmi.com/og-image-gradients.png" /> */}

  {/* --- Twitter --- */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://colorsmi.com/color-gradients" />
  <meta name="twitter:title" content="CSS Gradient Generator – ColorsMi" />
  <meta name="twitter:description" content="Create beautiful, custom CSS gradients with our advanced generator. Easily customize colors, angles, and export the code for your projects." />
  <meta name="twitter:site" content="@colorsmi_app" />
  {/* <meta name="twitter:image" content="https://colorsmi.com/og-image-gradients.png" /> */}
</Helmet>

        <Navbar/>
      {/* Controls */}
      <div className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Gradient Generator
          <span className={`text-sm font-normal ml-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {/* 50,000,000+ gradient combinations */}
          </span>
        </h2>

        {/* Direction Selector */}
        <div className="mb-6">
          <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Gradient Direction
          </label>
          <div className="flex space-x-3">
            {directions.map((dir) => (
              <button
                key={dir.id}
                onClick={() => setDirection(dir.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  direction === dir.id
                    ? 'bg-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {dir.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Gradient Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 font-semibold">
            {gradientCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <div className="font-semibold text-sm">{category.label}</div>
                <div className={`text-xs mt-1 ${
                  selectedCategory === category.id 
                    ? 'text-purple-100' 
                    : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {category.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gradients Grid */}
      <div 
        ref={gradientsBoxRef}
        className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {gradientCategories.find(c => c.id === selectedCategory)?.label} 
            {/* Gradients */}
          </h3>
          <div className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>Page {currentPage.toLocaleString()} of {totalPages.toLocaleString()}</span>
          </div>
        </div>

        {/* Scrollable Gradients Container */}
        <div className={`max-h-full overflow-y-auto mb-8 pr-2 ${
          isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'
        } scrollbar-stable`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 font-semibold">
            {filteredGradients.map((gradient) => (
              <div
                key={gradient.id}
                className={`group rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                {/* Gradient Preview */}
                <div
                  className="h-48 relative cursor-pointer"
                  style={{ background: gradient.preview }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onToggleFavorite(gradient.id)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      {/* <Heart className={`w-4 h-4 ${favorites.includes(gradient.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} /> */}
                    </button>
                  </div>
                </div>

                {/* Gradient Info */}
                <div className="p-4">
                  {/* Color Swatches */}
                  <div className="flex mb-3 space-x-1">
                    {gradient.colors.map((color: any, index: number) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.hex} - ${color.hsl}`}
                      />
                    ))}
                  </div>

                  {/* CSS Code Preview */}
                  <div className="mb-4">
                    <div className={`text-xs font-mono p-2 rounded transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'
                    }`}>
                      <div className="truncate">{gradient.css}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => copyGradientToClipboard(gradient)}
                      className="flex items-center space-x-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy CSS</span>
                    </button>
                    
                    <button className={`p-2 rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                    }`}>
                      {/* <Download className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} /> */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beautiful Pagination */}
        <div className="flex items-center justify-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 1
                ? isDarkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-105 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {/* First page */}
            {currentPage > 4 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  1
                </button>
                {currentPage > 5 && (
                  <div className={`flex items-center justify-center w-10 h-10 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                )}
              </>
            )}

            {/* Visible page numbers */}
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Last page */}
            {currentPage < totalPages - 3 && (
              <>
                {currentPage < totalPages - 4 && (
                  <div className={`flex items-center justify-center w-10 h-10 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  {totalPages.toLocaleString()}
                </button>
              </>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? isDarkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:scale-105 shadow-sm'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page Info */}
        <div className={`text-center mt-4 text-sm transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Showing {gradientsPerPage} gradients per page • Infinite unique combinations available
        </div>
      </div>

      {/* Copy Notification */}
      {copiedGradient && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Gradient CSS copied to clipboard!
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default ColorGradients;