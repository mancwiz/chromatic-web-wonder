import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Copy, Heart, Download, Eye, Grid, List, Check, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Palette, Sparkles, Blend, Layers3, Droplets, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";
import Navbar from '@/components/navbar';

interface ColorShadesProps {
  searchTerm: string;
  favorites: string[];
  onToggleFavorite: (color: string) => void;
  isDarkMode: boolean;
}

interface ColorShade {
  id: string;
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
  lightness: number;
  saturation: number;
  hue: number;
}

interface ColorCategory {
  id: string;
  name: string;
  baseHue: number;
  description: string;
  color: string;
}

const COLOR_CATEGORIES: ColorCategory[] = [
  { id: 'red', name: 'Red', baseHue: 0, description: 'Passionate and energetic', color: '#ef4444' },
  { id: 'orange', name: 'Orange', baseHue: 30, description: 'Vibrant and warm', color: '#f97316' },
  { id: 'yellow', name: 'Yellow', baseHue: 60, description: 'Bright and cheerful', color: '#eab308' },
  { id: 'green', name: 'Green', baseHue: 120, description: 'Natural and calming', color: '#22c55e' },
  { id: 'cyan', name: 'Cyan', baseHue: 180, description: 'Fresh and modern', color: '#06b6d4' },
  { id: 'blue', name: 'Blue', baseHue: 240, description: 'Trustworthy and serene', color: '#3b82f6' },
  { id: 'purple', name: 'Purple', baseHue: 270, description: 'Mysterious and elegant', color: '#8b5cf6' },
  { id: 'pink', name: 'Pink', baseHue: 330, description: 'Gentle and romantic', color: '#ec4899' },
  { id: 'brown', name: 'Brown', baseHue: 30, description: 'Earthy and grounded', color: '#a85507' },
  { id: 'black', name: 'Black', baseHue: 0, description: 'Deep and powerful', color: '#000000' },
  { id: 'white', name: 'White', baseHue: 0, description: 'Pure and clean', color: '#ffffff' },
];

const ColorShades: React.FC<ColorShadesProps> = ({ searchTerm, favorites, onToggleFavorite, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('pink');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [lightnessRange, setLightnessRange] = useState([0, 100]);
  const [saturationRange, setSaturationRange] = useState([0, 100]);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const shadesPerPage = 100;
  const totalShades = 100000000;
  const totalPages = Math.ceil(totalShades / shadesPerPage);
  const maxVisiblePages = 10;

  const hslToHex = (h: number, s: number, l: number): string => {
    // Special handling for black and white
    if (l <= 0) return '#000000';
    if (l >= 100) return '#ffffff';
    
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hslToRgb = (h: number, s: number, l: number): string => {
    // Special handling for black and white
    if (l <= 0) return 'rgb(0, 0, 0)';
    if (l >= 100) return 'rgb(255, 255, 255)';
    
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
  };

  const generateColorShades = useCallback((categoryId: string, page: number) => {
    const category = COLOR_CATEGORIES.find(cat => cat.id === categoryId);
    if (!category) return [];

    const shades: ColorShade[] = [];
    const startIndex = (page - 1) * shadesPerPage;
    
    // Special handling for black category
  if (category.id === 'black') {
  for (let i = 0; i < shadesPerPage; i++) {
    const index = (page - 1) * shadesPerPage + i;

    const maxBlackShades = 128; // grayscale 0–127
    if (index >= maxBlackShades) break;

    const gray = index; // 0 (black) to 127 (dark gray)
    const hex = `#${gray.toString(16).padStart(2, '0').repeat(3)}`;
    const rgb = `rgb(${gray}, ${gray}, ${gray})`;
    const lightness = (gray / 255) * 100;
    const hsl = `hsl(0, 0%, ${lightness.toFixed(2)}%)`;

    shades.push({
      id: `black-${index}`,
      hex,
      rgb,
      hsl,
      name: `Black ${index + 1}`,
      lightness,
      saturation: 0,
      hue: 0
    });
  }
  return shades;
}

    
    // Special handling for white category
   if (category.id === 'white') {
  for (let i = 0; i < shadesPerPage; i++) {
    const index = (page - 1) * shadesPerPage + i;

    const maxWhiteShades = 128; // grayscale 255–128
    if (index >= maxWhiteShades) break;

    const gray = 255 - index; // Starts at 255 (white) → 128 (light gray)
    const hex = `#${gray.toString(16).padStart(2, '0').repeat(3)}`;
    const rgb = `rgb(${gray}, ${gray}, ${gray})`;
    const lightness = (gray / 255) * 100;
    const hsl = `hsl(0, 0%, ${lightness.toFixed(2)}%)`;

    shades.push({
      id: `white-${index}`,
      hex,
      rgb,
      hsl,
      name: `White ${index + 1}`,
      lightness,
      saturation: 0,
      hue: 0
    });
  }
  return shades;
}


    // Generate other colors
    for (let i = 0; i < shadesPerPage; i++) {
      const index = startIndex + i;
      
      let hue: number;
      let saturation: number;
      let lightness: number;
      let name: string;
      
      if (category.id === 'brown') {
        hue = 15 + (index * 0.5) % 45;
        saturation = 20 + (index * 0.3) % 60;
        lightness = 10 + (index * 0.06) % 50;
        name = `Brown ${index + 1}`;
      } else {
        const hueVariation = (index * 0.3) % 60 - 30;
        hue = (category.baseHue + hueVariation + 360) % 360;
        saturation = 25 + (index * 0.2) % 75;
        lightness = 15 + (index * 0.16) % 80;
        name = `${category.name} ${index + 1}`;
      }
      
      // Filter by ranges
      if (lightness >= lightnessRange[0] && lightness <= lightnessRange[1] &&
          saturation >= saturationRange[0] && saturation <= saturationRange[1]) {
        
        const hex = hslToHex(hue, saturation, lightness);
        const rgb = hslToRgb(hue, saturation, lightness);
        const hsl = `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`;
        
        shades.push({
          id: `${category.id}-${index}`,
          hex,
          rgb,
          hsl,
          name,
          lightness,
          saturation,
          hue
        });
      }
    }
    
    // Sort by lightness to prevent duplicates
    return shades.sort((a, b) => {
      if (a.lightness !== b.lightness) return b.lightness - a.lightness;
      if (a.saturation !== b.saturation) return b.saturation - a.saturation;
      return a.hue - b.hue;
    });
  }, [lightnessRange, saturationRange]);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colorShades = useMemo(() => generateColorShades(selectedCategory, currentPage), 
    [selectedCategory, generateColorShades, currentPage]);
  
  const filteredShades = useMemo(() => {
    if (!searchTerm) return colorShades;
    return colorShades.filter(shade => 
      shade.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shade.hsl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shade.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [colorShades, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get visible pages for pagination
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
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

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="space-y-6 bg-white mt-16">
      <Navbar />
      {/* Header Section */}
      <div
        className={`rounded-2xl p-6  shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-6 ">
          <div>
            <h1
              className={`text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}
            >
              Color Shades Explorer
            </h1>
            <p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              100,000,000+ shades available • Professional color picker tool
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-500 text-white"
                  : isDarkMode
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-purple-500 text-white"
                  : isDarkMode
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Color Selector Pills */}
        <div className="flex flex-wrap gap-3 mb-6">
          {COLOR_CATEGORIES.map((color) => (
            <button
              key={color.id}
              onClick={() => {
                setSelectedCategory(color.id);
                setCurrentPage(1);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === color.id
                  ? "ring-2 ring-purple-500 ring-offset-2 scale-105 shadow-lg"
                  : "hover:scale-105 hover:shadow-md"
              } ${isDarkMode ? "ring-offset-gray-800" : "ring-offset-white"}`}
              style={{
                backgroundColor:
                  selectedCategory === color.id
                    ? color.color
                    : isDarkMode
                    ? "#374151"
                    : "#f3f4f6",
                color:
                  selectedCategory === color.id
                    ? color.id === "black"
                      ? "#fff"
                      : color.id === "white"
                      ? "#000"
                      : "white"
                    : isDarkMode
                    ? "#d1d5db"
                    : "#374151",
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{
                  backgroundColor: color.color,
                  borderColor: color.id === "white" ? "#e5e7eb" : "white",
                }}
              />
              <span className="font-medium">{color.name}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search colors by name, hex, or HSL..."
            value={searchTerm}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>

        {/* Range Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lightness Range */}
          <div>
            <label
              className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Lightness: {lightnessRange[0]}% - {lightnessRange[1]}%
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={lightnessRange[0]}
                onChange={(e) =>
                  setLightnessRange([
                    parseInt(e.target.value),
                    lightnessRange[1],
                  ])
                }
                className="range-slider w-full"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={lightnessRange[1]}
                onChange={(e) =>
                  setLightnessRange([
                    lightnessRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="range-slider w-full mt-2"
              />
            </div>
          </div>

          {/* Saturation Range */}
          <div>
            <label
              className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Saturation: {saturationRange[0]}% - {saturationRange[1]}%
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={saturationRange[0]}
                onChange={(e) =>
                  setSaturationRange([
                    parseInt(e.target.value),
                    saturationRange[1],
                  ])
                }
                className="range-slider w-full"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={saturationRange[1]}
                onChange={(e) =>
                  setSaturationRange([
                    saturationRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="range-slider w-full mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Color Grid */}
      <div
        className={`rounded-2xl p-6 shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {COLOR_CATEGORIES.find((c) => c.id === selectedCategory)?.name}{" "}
            Shades
          </h2>
          <div
            className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <span>
              {filteredShades.length.toLocaleString()} colors displayed
            </span>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        <div
          className={`color-grid px-2 sm:px-2 md:px-2 mx-auto max-w-screen-xl pt-4 ${
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2"
              : "space-y-2"
          }`}
        >
          {filteredShades.map((shade) => (
            <div
              key={shade.id}
              className={`color-box group relative overflow-visible transition-all duration-200 hover:scale-105 hover:shadow-xl ${
                viewMode === "grid"
                  ? "w-50 h-48 rounded-xl cursor-pointer shadow-md"
                  : "flex items-center p-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md"
              }`}
              style={{ backgroundColor: shade.hex }}
            >
              {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl" /> */}

              {/* Color Info Overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  viewMode === "grid"
                    ? "flex-col"
                    : "flex-row justify-between w-full px-4"
                }`}
              >
                <div
                  className={`text-center ${
                    viewMode === "list" ? "text-left" : ""
                  }`}
                >
                  <div className="text-white text-sm font-mono bg-black bg-opacity-70 px-2 py-1 rounded mb-2">
                    {shade.hex}
                  </div>
                  {viewMode === "list" && (
                    <div className="text-white text-xs font-mono bg-black bg-opacity-70 px-2 py-1 rounded">
                      {shade.hsl}
                    </div>
                  )}
                </div>

                <div
                  className={`flex space-x-2 ${
                    viewMode === "list" ? "ml-4" : "mt-2"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(shade.hex);
                    }}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    title="Copy HEX"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(shade.hex);
                    }}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    title="Add to favorites"
                  >
                   
                  </button> */}
                </div>
              </div>

              {/* List View Content */}
              {viewMode === "list" && (
                <div className="flex items-center justify-between w-full opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <div>
                      <div className="font-mono text-sm font-medium text-white">
                        {shade.name}
                      </div>
                      <div className="font-mono text-xs text-white opacity-75">
                        {shade.hex}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {!searchTerm && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1
                  ? isDarkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:scale-105 shadow-sm"
              }`}
            >
              <ChevronsLeft className="w-4 h-4" />
              <span>First</span>
            </button>

            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1
                  ? isDarkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:scale-105 shadow-sm"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {currentPage > maxVisiblePages && (
                <div
                  className={`flex items-center justify-center w-10 h-10 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  ...
                </div>
              )}

              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    page === currentPage
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                  }`}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPages - maxVisiblePages + 1 && (
                <div
                  className={`flex items-center justify-center w-10 h-10 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  ...
                </div>
              )}
            </div>

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? isDarkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:scale-105 shadow-sm"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? isDarkMode
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:scale-105 shadow-sm"
              }`}
            >
              <span>Last</span>
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Copy Notification */}
      {copiedColor && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          Copied {copiedColor}!
        </div>
      )}
    </div>
  );
};

export default ColorShades;