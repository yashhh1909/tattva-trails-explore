
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Art Explorer", path: "/art-explorer" },
  { name: "Cultural Map", path: "/cultural-map" },
  { name: "Trends", path: "/trends" },
  { name: "KalaBot", path: "/kalabot" },
  { name: "Timeline", path: "/timeline" },
  { name: "Support Local", path: "/support-local" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-tattva-light dark:bg-tattva-dark sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tattva-primary to-tattva-accent flex items-center justify-center text-white font-bold text-xl">
              TT
            </div>
            <span className="font-rajdhani font-bold text-2xl text-tattva-dark dark:text-tattva-light">
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
                    : "text-tattva-dark dark:text-tattva-light hover:bg-tattva-primary/10"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-tattva-dark dark:text-tattva-light" />
              ) : (
                <Menu className="h-6 w-6 text-tattva-dark dark:text-tattva-light" />
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
                    : "text-tattva-dark dark:text-tattva-light hover:bg-tattva-primary/10"
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
