import { Toaster } from "@/components/ui/toaster";
import React, { useState, useEffect } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import ColorShades from '../src/pages/ColorShades';
import ColorThemes from '../src/pages/ColorThemes';
import ColorGradients from '../src/pages/ColorGradients';
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addToFavorites = (color: string) => {
    setFavorites((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/color-shades"
              element={
                <ColorShades
                  searchTerm={searchTerm}
                  favorites={favorites}
                  onToggleFavorite={addToFavorites}
                  isDarkMode={isDarkMode}
                />
              }
            />
            <Route
              path="/color-themes"
              element={
                <ColorThemes
                  searchTerm={searchTerm}
                  favorites={favorites}
                  onToggleFavorite={addToFavorites}
                  isDarkMode={isDarkMode}
                />
              }
            />
            <Route
              path="/color-gradients"
              element={
                <ColorGradients
                  searchTerm={searchTerm}
                  favorites={favorites}
                  onToggleFavorite={addToFavorites}
                  isDarkMode={isDarkMode}
                />
              }
            />
            <Route path="/blog" element={<Blog/>} />
          <Route path="/blog/:slug" element={<BlogPost/>} />
          
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
