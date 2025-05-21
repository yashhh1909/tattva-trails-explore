
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { culturalHotspots } from '@/data/culturalHotspots';

const IndiaMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = async () => {
      try {
        // We're using a free alternative to Google Maps - Leaflet with OpenStreetMap
        const L = await import('leaflet');
        await import('leaflet/dist/leaflet.css');

        // Fix Leaflet icon issues
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });

        // India's approximate center and bounds
        const indiaCenter = [22.5937, 78.9629]; // Approximate center of India
        
        // Create the map
        const map = L.map(mapRef.current).setView(indiaCenter, 5);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add cultural hotspot markers
        culturalHotspots.forEach(spot => {
          const marker = L.marker([spot.lat, spot.lng]).addTo(map);
          
          // Create popup content
          const popupContent = `
            <div class="popup-content">
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
        
        // Adjust map to fit India better
        setTimeout(() => map.invalidateSize(), 100);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };
    
    loadMap();
    
    return () => {
      // Clean up map instance if needed
    };
  }, []);

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-0">
        <div className="relative">
          <div 
            ref={mapRef} 
            className="w-full h-[400px] md:h-[500px] rounded-md overflow-hidden"
          ></div>
          <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
            <p>Click on markers to discover cultural hotspots</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaMap;
