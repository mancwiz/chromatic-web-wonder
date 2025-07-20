import React, { useState, useMemo, useCallback } from 'react';
import { Copy, Heart, Download, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface ColorThemesProps {
  searchTerm: string;
  favorites: string[];
  onToggleFavorite: (color: string) => void;
  isDarkMode: boolean;
}

const ColorThemes: React.FC<ColorThemesProps> = ({ searchTerm, favorites, onToggleFavorite, isDarkMode }) => {
  const [colorCount, setColorCount] = useState(2);
  const [copiedTheme, setCopiedTheme] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const themesPerPage = 100;

  // Scrolling detection
  React.useEffect(() => {
    // let scrollTimeout: NodeJS.Timeout;
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

  const categories = [
    { id: 'all', label: 'All Themes', description: 'Every possible combination' },
    { id: 'monochromatic', label: 'Monochromatic', description: 'Single hue variations' },
    { id: 'analogous', label: 'Analogous', description: 'Adjacent hues' },
    { id: 'complementary', label: 'Complementary', description: 'Opposite hues' },
    { id: 'triadic', label: 'Triadic', description: 'Three equidistant hues' },
    { id: 'tetradic', label: 'Tetradic', description: 'Four balanced hues' },
    { id: 'warm', label: 'Warm Tones', description: 'Reds, oranges, yellows' },
    { id: 'cool', label: 'Cool Tones', description: 'Blues, greens, purples' },
    { id: 'pastel', label: 'Pastel', description: 'Soft, light colors' },
    { id: 'vibrant', label: 'Vibrant', description: 'Bold, saturated colors' },
    { id: 'earth', label: 'Earth Tones', description: 'Natural, organic colors' },
    { id: 'neon', label: 'Neon', description: 'Electric, glowing colors' },
    { id: 'vintage', label: 'Vintage', description: 'Retro, muted tones' },
    { id: 'modern', label: 'Modern', description: 'Contemporary, clean colors' },
    { id: 'tropical', label: 'Tropical', description: 'Bright, exotic colors' },
    { id: 'autumn', label: 'Autumn', description: 'Fall-inspired colors' },
    { id: 'spring', label: 'Spring', description: 'Fresh, blooming colors' },
    { id: 'winter', label: 'Winter', description: 'Cool, crisp colors' },
    { id: 'summer', label: 'Summer', description: 'Bright, sunny colors' },
    { id: 'corporate', label: 'Corporate', description: 'Professional, business colors' },
    { id: 'creative', label: 'Creative', description: 'Artistic, expressive colors' },
    { id: 'minimalist', label: 'Minimalist', description: 'Simple, clean palettes' }
  ];

  // Reset to page 1 when category or color count changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, colorCount]);

  const generateSingleTheme = useCallback((count: number, category: string, themeIndex: number) => {
    const colors = [];
    
    // Create a unique seed for this specific theme
    const uniqueSeed = themeIndex * 2654435761 + category.length * 16777619 + count * 2147483647;
    
    // Advanced pseudo-random number generator
    const random = (index: number, min: number, max: number) => {
      const x = Math.sin((uniqueSeed + index * 12.9898) * 43758.5453123) * 10000;
      return min + Math.floor((x - Math.floor(x)) * (max - min + 1));
    };
    
    // Base hue for the theme
    const baseHue = random(0, 0, 359);
    
    for (let i = 0; i < count; i++) {
      let hue, saturation, lightness;
      
      switch (category) {
        case 'monochromatic':
          hue = baseHue;
          saturation = random(i + 10, 30, 90);
          lightness = random(i + 20, 15, 85);
          break;
          
        case 'analogous':
          hue = (baseHue + random(i + 30, -45, 45)) % 360;
          if (hue < 0) hue += 360;
          saturation = random(i + 40, 50, 90);
          lightness = random(i + 50, 25, 75);
          break;
          
        case 'complementary':
          if (i % 2 === 0) {
            hue = baseHue + random(i + 60, -15, 15);
          } else {
            hue = (baseHue + 180 + random(i + 70, -15, 15)) % 360;
          }
          if (hue < 0) hue += 360;
          saturation = random(i + 80, 45, 85);
          lightness = random(i + 90, 20, 70);
          break;
          
        case 'triadic':
          hue = (baseHue + (i * 120) + random(i + 100, -20, 20)) % 360;
          saturation = random(i + 110, 50, 85);
          lightness = random(i + 120, 30, 70);
          break;
          
        case 'tetradic':
          hue = (baseHue + (i * 90) + random(i + 130, -15, 15)) % 360;
          saturation = random(i + 140, 40, 80);
          lightness = random(i + 150, 25, 65);
          break;
          
        case 'warm':
          const warmBase = random(i + 160, 330, 390);
          hue = warmBase % 360;
          if (hue >= 360) hue -= 360;
          saturation = random(i + 170, 45, 85);
          lightness = random(i + 180, 30, 70);
          break;
          
        case 'cool':
          hue = random(i + 190, 180, 300);
          saturation = random(i + 200, 50, 85);
          lightness = random(i + 210, 35, 70);
          break;
          
        case 'pastel':
          hue = random(i + 220, 0, 359);
          saturation = random(i + 230, 20, 45);
          lightness = random(i + 240, 70, 90);
          break;
          
        case 'vibrant':
          hue = random(i + 250, 0, 359);
          saturation = random(i + 260, 75, 95);
          lightness = random(i + 270, 40, 65);
          break;
          
        case 'earth':
          const earthHues = [30, 45, 60, 20, 40];
          const earthBase = earthHues[i % earthHues.length];
          hue = earthBase + random(i + 280, -15, 15);
          saturation = random(i + 290, 25, 55);
          lightness = random(i + 300, 20, 55);
          break;
          
        case 'neon':
          hue = random(i + 310, 0, 359);
          saturation = random(i + 320, 90, 100);
          lightness = random(i + 330, 50, 70);
          break;

        case 'vintage':
          hue = random(i + 340, 0, 359);
          saturation = random(i + 350, 15, 45);
          lightness = random(i + 360, 35, 65);
          break;

        case 'modern':
          hue = random(i + 370, 0, 359);
          saturation = random(i + 380, 55, 85);
          lightness = random(i + 390, 45, 70);
          break;

        case 'tropical':
          const tropicalHues = [120, 180, 300, 60, 30];
          const tropicalBase = tropicalHues[i % tropicalHues.length];
          hue = tropicalBase + random(i + 400, -25, 25);
          if (hue < 0) hue += 360;
          if (hue >= 360) hue -= 360;
          saturation = random(i + 410, 65, 90);
          lightness = random(i + 420, 40, 70);
          break;

        case 'autumn':
          const autumnHues = [30, 45, 15, 60, 0];
          const autumnBase = autumnHues[i % autumnHues.length];
          hue = autumnBase + random(i + 430, -15, 15);
          saturation = random(i + 440, 45, 80);
          lightness = random(i + 450, 30, 60);
          break;

        case 'spring':
          const springHues = [90, 120, 300, 60, 180];
          const springBase = springHues[i % springHues.length];
          hue = springBase + random(i + 460, -20, 20);
          if (hue < 0) hue += 360;
          if (hue >= 360) hue -= 360;
          saturation = random(i + 470, 35, 75);
          lightness = random(i + 480, 50, 80);
          break;

        case 'winter':
          const winterHues = [200, 240, 180, 220, 260];
          const winterBase = winterHues[i % winterHues.length];
          hue = winterBase + random(i + 490, -15, 15);
          saturation = random(i + 500, 40, 75);
          lightness = random(i + 510, 35, 65);
          break;

        case 'summer':
          const summerHues = [60, 180, 300, 120, 30];
          const summerBase = summerHues[i % summerHues.length];
          hue = summerBase + random(i + 520, -25, 25);
          if (hue < 0) hue += 360;
          if (hue >= 360) hue -= 360;
          saturation = random(i + 530, 60, 90);
          lightness = random(i + 540, 45, 75);
          break;

        case 'corporate':
          const corporateHues = [220, 200, 0, 240, 30];
          const corporateBase = corporateHues[i % corporateHues.length];
          hue = corporateBase + random(i + 550, -10, 10);
          saturation = random(i + 560, 25, 65);
          lightness = random(i + 570, 30, 65);
          break;

        case 'creative':
          hue = random(i + 580, 0, 359);
          saturation = random(i + 590, 55, 90);
          lightness = random(i + 600, 35, 70);
          break;

        case 'minimalist':
          const minimalHues = [0, 220, 30];
          const minimalBase = minimalHues[i % minimalHues.length];
          hue = minimalBase + random(i + 610, -5, 5);
          saturation = random(i + 620, 0, 30);
          lightness = random(i + 630, 25, 75);
          break;
          
        default: // 'all'
          hue = random(i + 640, 0, 359);
          saturation = random(i + 650, 20, 95);
          lightness = random(i + 660, 15, 85);
      }
      
      // Ensure values are within valid ranges
      hue = Math.max(0, Math.min(359, Math.round(hue)));
      saturation = Math.max(0, Math.min(100, Math.round(saturation)));
      lightness = Math.max(5, Math.min(95, Math.round(lightness)));
      
      const hslColor = `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`;
      const hexColor = hslToHex(hue, saturation, lightness);
      
      colors.push({
        hsl: hslColor,
        hex: hexColor,
        hue: hue,
        saturation: saturation,
        lightness: lightness
      });
    }
    
    return colors;
  }, []);

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

  const copyThemeToClipboard = (theme: any) => {
    const cssCode = `/* Color Theme - ${colorCount} Colors */\n:root {\n${theme.colors.map((color: any, index: number) => 
      `  --color-${index + 1}: ${color.hex}; /* ${color.hsl} */`
    ).join('\n')}\n}`;
    
    navigator.clipboard.writeText(cssCode);
    setCopiedTheme(theme.id);
    setTimeout(() => setCopiedTheme(null), 2000);
  };

  // Generate themes for current page
  const currentThemes = useMemo(() => {
    const themes = [];
    const startIndex = (currentPage - 1) * themesPerPage;
    
    for (let i = 0; i < themesPerPage; i++) {
      const themeIndex = startIndex + i;
      const colors = generateSingleTheme(colorCount, selectedCategory, themeIndex);
      themes.push({
        id: `theme-${colorCount}-${selectedCategory}-${themeIndex}`,
        colors: colors,
        category: selectedCategory
      });
    }
    
    return themes;
  }, [currentPage, colorCount, selectedCategory, generateSingleTheme]);

  const filteredThemes = useMemo(() => {
    if (!searchTerm) return currentThemes;
    return currentThemes.filter(theme => 
      theme.colors.some(color => 
        color.hex.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [currentThemes, searchTerm]);

  // Pagination logic
  const totalPages = 50000; // Representing infinite themes (1M+ / 20 per page)
  const maxVisiblePages = 15;

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
    // Scroll to the top of the themes box instead of the entire page
    if (themesBoxRef.current) {
      themesBoxRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Ref for the themes box
  const themesBoxRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={`space-y-6 mt-16 bg-background ${isScrolling ? 'scrolling' : ''}`}>

<Navbar/>


      {/* Controls */}
      <div className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Color Theme Generator
          <span className={`text-sm font-normal ml-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Infinite unique themes • 1,000,000+ combinations per category
          </span>
        </h2>

        {/* Color Count Selector */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Number of Colors in Theme
          </label>
          <div className="flex flex-wrap gap-3">
            {[2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
              <button
                key={count}
                onClick={() => setColorCount(count)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  colorCount === count
                    ? 'bg-purple-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {count} Colors
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Theme Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <div className="font-medium text-sm">{category.label}</div>
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

      {/* Themes Grid */}
      <div 
        ref={themesBoxRef}
        className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {colorCount}-Color {categories.find(c => c.id === selectedCategory)?.label} Themes
          </h3>
          <div className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>Page {currentPage.toLocaleString()} of {totalPages.toLocaleString()}</span>
          </div>
        </div>

        {/* Scrollable Themes Container */}
        <div className={`max-h-[10000px] overflow-y-auto mb-8 pr-2 ${
          isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'
        } scrollbar-stable`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredThemes.map((theme) => (
              <div
                key={theme.id}
                className={`group rounded-xl p-4 hover:shadow-lg transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {/* Color Swatches */}
                <div className="flex rounded-lg overflow-hidden h-32 mb-4">
                  {theme.colors.map((color: any, index: number) => (
                    <div
                      key={index}
                      className="flex-1 relative group/swatch cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.hex} - ${color.hsl}`}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/swatch:bg-opacity-20 transition-all duration-200" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/swatch:opacity-100 transition-opacity duration-200">
                        <span className="text-white text-xs font-mono bg-black bg-opacity-70 px-1 py-0.5 rounded">
                          {color.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Color Codes */}
                <div className="space-y-1 mb-4 max-h-32 overflow-y-auto">
                  {theme.colors.map((color: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className={`font-mono transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {color.hex}
                      </span>
                      <span className={`font-mono text-xs transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        HSL({color.hue}, {color.saturation}%, {color.lightness}%)
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => copyThemeToClipboard(theme)}
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">Copy CSS</span>
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onToggleFavorite(theme.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(theme.id) ? 'text-red-500 fill-current' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
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
                  className={`px-4 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
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
          Showing {themesPerPage} themes per page • Infinite unique combinations available
        </div>
      </div>

      {/* Copy Notification */}
      {copiedTheme && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Theme CSS copied to clipboard!
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default ColorThemes;