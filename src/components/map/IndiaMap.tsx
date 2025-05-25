
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { culturalHotspots } from '@/data/culturalHotspots';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const IndiaMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Fix Leaflet icon issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    const indiaCenter: L.LatLngExpression = [20.5937, 78.9629];
    
    const map = L.map(mapRef.current, {
      center: indiaCenter,
      zoom: 5,
      zoomControl: true,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true
    });
    
    // Use a more attractive tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    
    // Enhanced styling for the map container
    const mapContainer = mapRef.current;
    if (mapContainer) {
      mapContainer.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.3)';
      mapContainer.style.borderRadius = '16px';
      mapContainer.style.overflow = 'hidden';
      mapContainer.style.border = '2px solid rgba(228, 111, 68, 0.2)';
    }
    
    // Add enhanced cultural hotspot markers
    culturalHotspots.forEach((spot, index) => {
      const markerPosition: L.LatLngExpression = [spot.lat, spot.lng];
      
      // Create custom animated icon
      const customIcon = L.divIcon({
        className: 'custom-cultural-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-6 h-6 bg-tattva-primary rounded-full animate-pulse shadow-lg border-2 border-white"></div>
            <div class="absolute w-12 h-12 bg-tattva-primary/20 rounded-full animate-ping"></div>
          </div>
        `,
        iconSize: [24, 24],
      });
      
      const marker = L.marker(markerPosition, { icon: customIcon }).addTo(map);
      
      // Enhanced popup content
      const popupContent = `
        <div class="cultural-popup p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg min-w-[250px]">
          <h3 class="text-lg font-bold mb-2 text-tattva-primary">${spot.name}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">${spot.state}</p>
          <p class="text-xs mb-3">${spot.description}</p>
          <div class="border-t border-gray-200 dark:border-gray-600 pt-2">
            <strong class="text-xs text-tattva-primary">Featured Art Forms:</strong>
            <div class="flex flex-wrap gap-1 mt-1">
              ${spot.artForms.slice(0, 3).map(art => 
                `<span class="text-xs px-2 py-1 bg-tattva-primary/10 text-tattva-primary rounded-full">${art}</span>`
              ).join('')}
              ${spot.artForms.length > 3 ? `<span class="text-xs text-gray-500">+${spot.artForms.length - 3} more</span>` : ''}
            </div>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });

      // Add hover effects
      marker.on('mouseover', () => {
        setSelectedHotspot(spot.name);
      });

      marker.on('mouseout', () => {
        setSelectedHotspot(null);
      });
    });
    
    // Add subtle animation and 3D effects
    const addInteractiveEffects = () => {
      if (!mapRef.current) return;
      
      mapRef.current.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      
      const handleMouseEnter = () => {
        if (!mapRef.current) return;
        mapRef.current.style.transform = 'scale(1.02)';
        mapRef.current.style.boxShadow = '0 25px 50px -15px rgba(0, 0, 0, 0.4)';
      };
      
      const handleMouseLeave = () => {
        if (!mapRef.current) return;
        mapRef.current.style.transform = 'scale(1)';
        mapRef.current.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.3)';
      };
      
      mapRef.current.addEventListener('mouseenter', handleMouseEnter);
      mapRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (mapRef.current) {
          mapRef.current.removeEventListener('mouseenter', handleMouseEnter);
          mapRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    };
    
    const cleanupEffects = addInteractiveEffects();
    
    // Restrict panning to India with smoother bounds
    const southWest = L.latLng(6.7673, 68.1089);
    const northEast = L.latLng(35.6745, 97.3956);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);
    
    setIsLoading(false);
    
    return () => {
      map.remove();
      if (cleanupEffects) cleanupEffects();
    };
  }, []);

  return (
    <div className="relative">
      <Card className="w-full shadow-2xl border-tattva-primary/30 overflow-hidden transform transition-all hover:shadow-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardContent className="p-0">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-t-tattva-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-tattva-primary font-medium">Loading Cultural Map...</p>
                </div>
              </div>
            )}
            <div 
              ref={mapRef} 
              className="w-full h-[500px] md:h-[600px] rounded-lg overflow-hidden"
            ></div>
            
            {/* Enhanced overlay information */}
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-tattva-primary/20">
              <h3 className="font-bold text-tattva-primary text-sm">India's Cultural Heritage</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">{culturalHotspots.length} Cultural Hotspots</p>
              {selectedHotspot && (
                <p className="text-xs mt-1 text-tattva-accent font-medium">Exploring: {selectedHotspot}</p>
              )}
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-tattva-primary/20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-tattva-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Cultural Site</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndiaMap;
