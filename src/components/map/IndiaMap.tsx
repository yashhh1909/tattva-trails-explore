
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { culturalHotspots } from '@/data/culturalHotspots';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const IndiaMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Fix Leaflet icon issues
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    // India's approximate center
    const indiaCenter: L.LatLngExpression = [22.5937, 78.9629]; // Approximate center of India
    
    // Create the map
    const map = L.map(mapRef.current).setView(indiaCenter, 5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add cultural hotspot markers with custom styling
    culturalHotspots.forEach(spot => {
      const markerPosition: L.LatLngExpression = [spot.lat, spot.lng];
      
      // Create a custom icon with a color based on the art form type
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="w-4 h-4 bg-tattva-primary rounded-full pulse-animation"></div>`,
        iconSize: [20, 20],
      });
      
      const marker = L.marker(markerPosition, { icon: customIcon }).addTo(map);
      
      // Create popup content
      const popupContent = `
        <div class="popup-content p-2">
          <h3 class="text-lg font-bold">${spot.name}</h3>
          <p class="text-sm text-gray-600">${spot.state}</p>
          <p class="text-xs mt-2">${spot.description.slice(0, 100)}...</p>
          <div class="text-xs mt-2">
            <strong>Art Forms:</strong> ${spot.artForms.join(', ')}
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });
    
    // Restrict panning to India
    const southWest = L.latLng(6.7673, 68.1089);
    const northEast = L.latLng(35.6745, 97.3956);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);
    map.on('drag', () => {
      map.panInsideBounds(bounds, { animate: false });
    });
    
    // Resize map on window resize
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      map.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Card className="w-full shadow-lg border-tattva-primary/20">
      <CardContent className="p-0">
        <div className="relative">
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
