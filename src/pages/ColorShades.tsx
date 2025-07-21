import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Grid, List, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { MAIN_COLORS, generateColorShades } from '../utils/colorUtils';
import ColorCard from '../components/ColorCard';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface ColorShadesProps {
  isDarkMode: boolean;
}

const ColorShades: React.FC<ColorShadesProps> = ({ isDarkMode }) => {
  const [selectedColor, setSelectedColor] = useState(MAIN_COLORS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const itemsPerPage = 500; // 6x8 grid on desktop

  // Scrolling detection
  React.useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
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

  const allColorShades = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return generateColorShades(selectedColor.hue, itemsPerPage, startIndex);
  }, [selectedColor, currentPage, itemsPerPage]);

  const filteredColors = useMemo(() => {
    if (!searchTerm) return allColorShades;
    
    return allColorShades.filter(shade => 
      shade.hex.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allColorShades, searchTerm]);

  const totalPages = 50000; // Infinite pages
  const currentColors = searchTerm ? filteredColors : allColorShades;

  const handleColorChange = (color: typeof MAIN_COLORS[0]) => {
    setSelectedColor(color);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (shadesBoxRef.current) {
      shadesBoxRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Ref for the shades box
  const shadesBoxRef = React.useRef<HTMLDivElement>(null);

  // Pagination logic
  const maxVisiblePages = 15;

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

  return (
    <div className={`m-4 mt-20 space-y-6 ${isScrolling ? 'scrolling' : ''} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} `}>
      <Navbar/>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center ">
            <span className="text-gradient">Color Shades Explorer</span>
            <span className="text-2xl">{selectedColor.emoji}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Color Selection */}
            <div className="flex flex-wrap gap-2">
              {MAIN_COLORS.map((color) => (
                <Button
                  key={color.name}
                  variant={selectedColor.name === color.name ? 'default' : 'outline'}
                  onClick={() => handleColorChange(color)}
                  className="flex items-center space-x-2"
                >
                  <span>{color.emoji}</span>
                  <span>{color.name}</span>
                </Button>
              ))}
            </div>

            {/* Search and View Mode */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search colors by hex..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 {isDarkMode ? 'bg-gray-800 text-white' : ''} "
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span> {selectedColor.name} Shades</span>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages.toLocaleString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={shadesBoxRef}
            className="space-y-6"
          >
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4' 
                : 'space-y-2'
            }`}>
              {currentColors.map((color, index) => (
                <ColorCard
                  key={`${selectedColor.name}-${currentPage}-${index}-${color.hex}`}
                  color={color}
                  size={viewMode === 'grid' ? 'small' : 'medium'}
                  
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-background text-foreground hover:bg-muted hover:scale-105 shadow-sm border'
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
                        className="w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 bg-background text-foreground hover:bg-muted shadow-sm border"
                      >
                        1
                      </button>
                      {currentPage > 5 && (
                        <div className="flex items-center justify-center w-10 h-10 text-muted-foreground">
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
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-background text-foreground hover:bg-muted shadow-sm border'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Last page */}
                  {currentPage < totalPages - 3 && (
                    <>
                      {currentPage < totalPages - 4 && (
                        <div className="flex items-center justify-center w-10 h-10 text-muted-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </div>
                      )}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 bg-background text-foreground hover:bg-muted shadow-sm border"
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
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-background text-foreground hover:bg-muted hover:scale-105 shadow-sm border'
                  }`}
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Page Info */}
            <div className="text-center text-sm text-muted-foreground">
              Showing {currentColors.length} shades on page {currentPage.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
      <Footer/>
    </div>
  );
};

export default ColorShades;