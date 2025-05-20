
import React from "react";
import { Link } from "react-router-dom";
import { Github, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-tattva-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-rajdhani text-xl font-semibold mb-4">About TattvaTrails</h3>
            <p className="text-gray-300 mb-4">
              Exploring India's rich artistic heritage and promoting responsible
              cultural tourism through data-driven insights and immersive
              experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-tattva-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-tattva-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-tattva-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-tattva-primary transition-colors"
                aria-label="Github"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-rajdhani text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-tattva-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/art-explorer" className="text-gray-300 hover:text-tattva-primary transition-colors">
                  Art Explorer
                </Link>
              </li>
              <li>
                <Link to="/cultural-map" className="text-gray-300 hover:text-tattva-primary transition-colors">
                  Cultural Map
                </Link>
              </li>
              <li>
                <Link to="/trends" className="text-gray-300 hover:text-tattva-primary transition-colors">
                  Tourism Trends
                </Link>
              </li>
              <li>
                <Link to="/support-local" className="text-gray-300 hover:text-tattva-primary transition-colors">
                  Support Local Artisans
                </Link>
              </li>
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-rajdhani text-xl font-semibold mb-4">Data Sources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.data.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-tattva-primary transition-colors"
                >
                  data.gov.in
                </a>
              </li>
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-tattva-primary transition-colors"
                >
                  Ministry of Culture
                </a>
              </li>
              <li>
                <a
                  href="https://www.tourism.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-tattva-primary transition-colors"
                >
                  Ministry of Tourism
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} TattvaTrails. All rights reserved.</p>
          <p className="mt-1">
            Made with ❤️ for promoting Indian art and culture
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
