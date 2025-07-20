import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png' // Update the path as needed
import logoText from '../assets/textlogo.png' // Update the path as needed
import ThemeToggle from './ThemeToggle'

const Footer = () => {
  // Example state for dark mode; replace with your actual logic or props as needed
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const onToggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <>
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
        /> </Link>

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
            
            <div className="flex justify-center items-center space-x-4 pt-8 border-t border-border">
              <span className="text-muted-foreground">Theme:</span>
              <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
