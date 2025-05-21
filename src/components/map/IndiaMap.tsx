
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { culturalHotspots } from '@/data/culturalHotspots';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const IndiaMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current) return;

    // Fix Leaflet icon issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    // India's approximate center and bounds
    const indiaCenter: L.LatLngExpression = [22.5937, 78.9629]; // Approximate center of India
    
    // Create the map with enhanced 3D effect styling
    const map = L.map(mapRef.current, {
      center: indiaCenter,
      zoom: 5,
      zoomControl: false,  // Remove zoom controls as requested
      dragging: true,
      scrollWheelZoom: false
    });
    
    // Add a styled base layer for 3D effect
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    
    // Add 3D effect to the map with enhanced styling
    const mapContainer = mapRef.current;
    if (mapContainer) {
      mapContainer.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.6)';
      mapContainer.style.borderRadius = '12px';
      mapContainer.style.overflow = 'hidden';
    }
    
    // Add cultural hotspot markers with custom styling
    culturalHotspots.forEach(spot => {
      const markerPosition: L.LatLngExpression = [spot.lat, spot.lng];
      
      // Create a custom icon with a pulsing effect
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="w-4 h-4 bg-tattva-primary rounded-full pulse-animation"></div>`,
        iconSize: [20, 20],
      });
      
      const marker = L.marker(markerPosition, { icon: customIcon }).addTo(map);
      
      // Create popup content with improved styling
      const popupContent = `
        <div class="popup-content p-3 bg-card text-foreground backdrop-blur-sm">
          <h3 class="text-lg font-bold">${spot.name}</h3>
          <p class="text-sm text-muted-foreground">${spot.state}</p>
          <p class="text-xs mt-2">${spot.description.slice(0, 100)}...</p>
          <div class="text-xs mt-2">
            <strong>Art Forms:</strong> ${spot.artForms.join(', ')}
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });
    
    // Apply a subtle animation to the map for 3D effect
    const addMapAnimation = () => {
      if (!mapRef.current) return;
      
      // Add 3D perspective effect
      mapRef.current.style.transition = 'transform 0.3s ease';
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!mapRef.current) return;
        
        const rect = mapRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate rotation based on mouse position
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 1.5; // Reduced strength
        const rotateX = -((mouseY - centerY) / (rect.height / 2)) * 1.5; // Reduced strength
        
        // Apply subtle transform
        mapRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      };
      
      const handleMouseLeave = () => {
        if (!mapRef.current) return;
        mapRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      mapRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        if (mapRef.current) {
          mapRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    };
    
    const cleanupAnimation = addMapAnimation();
    
    // Restrict panning to India
    const southWest = L.latLng(6.7673, 68.1089);
    const northEast = L.latLng(35.6745, 97.3956);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });
    
    // Remove loading state
    setIsLoading(false);
    
    // Clean up
    return () => {
      map.remove();
      if (cleanupAnimation) cleanupAnimation();
    };
  }, []);

  return (
    <Card className="w-full shadow-lg border-tattva-primary/20 overflow-hidden transform transition-all hover:shadow-2xl">
      <CardContent className="p-0">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-t-tattva-primary rounded-full animate-spin"></div>
            </div>
          )}
          <div 
            ref={mapRef} 
            className="w-full h-[400px] md:h-[500px] rounded-md overflow-hidden"
          ></div>
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm p-2 rounded-md shadow-md text-xs border border-border">
            <p>India's Cultural Map</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaMap;
