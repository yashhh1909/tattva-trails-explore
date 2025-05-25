import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Art Explorer", path: "/art-explorer" },
  { name: "Trends", path: "/trends" },
  { name: "AhamAI", path: "/kalabot" },
  { name: "Timeline", path: "/timeline" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    // This is a placeholder - we'll implement real authentication once connected to Supabase
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tattva-primary to-tattva-accent flex items-center justify-center text-white font-bold text-xl">
              TT
            </div>
            <span className="font-rajdhani font-bold text-2xl text-foreground">
              TattvaTrails
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-tattva-primary text-white"
                    : "text-foreground hover:bg-tattva-primary/10"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <ThemeToggle />
            
            {/* Login Button */}
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="flex items-center gap-2"
            >
              {isLoggedIn ? (
                <>
                  <UserRound className="h-4 w-4" /> 
                  <span>Profile</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> 
                  <span>Login</span>
                </>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogin}
              className="mr-2"
            >
              {isLoggedIn ? (
                <UserRound className="h-5 w-5" />
              ) : (
                <LogIn className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.path
                    ? "bg-tattva-primary text-white"
                    : "text-foreground hover:bg-tattva-primary/10"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
