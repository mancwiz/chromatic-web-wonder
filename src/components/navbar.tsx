import React from 'react'
import { Link } from 'react-router-dom'
import { Palette, Droplets, Layers3, Blend, Menu, X } from 'lucide-react'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/0 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Color Magic
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link 
                to="/color-shades" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
              >
                <Droplets className="w-4 h-4" />
                <span>Shades</span>
              </Link>
              <Link 
                to="/color-themes" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
              >
                <Layers3 className="w-4 h-4" />
                <span>Themes</span>
              </Link>
              <Link 
                to="/color-gradients" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
              >
                <Blend className="w-4 h-4" />
                <span>Gradients</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/color-shades" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Droplets className="w-4 h-4" />
                  <span>Shades</span>
                </Link>
                <Link 
                  to="/color-themes" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Layers3 className="w-4 h-4" />
                  <span>Themes</span>
                </Link>
                <Link 
                  to="/color-gradients" 
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Blend className="w-4 h-4" />
                  <span>Gradients</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;