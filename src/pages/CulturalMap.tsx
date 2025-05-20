
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { culturalHotspots, CulturalHotspot, Festival } from "@/data/culturalHotspots";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Calendar, Info, Filter, Award, Users, 
  Clock, X, Sparkles, MapPinned
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { artForms } from "@/data/artForms";

const CulturalMap = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<CulturalHotspot | null>(null);
  const [showUndervisitedOnly, setShowUndervisitedOnly] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const regions = ["all", "North", "South", "East", "West", "Central", "Northeast"];

  const filteredHotspots = culturalHotspots.filter(hotspot => {
    if (showUndervisitedOnly && !hotspot.isUnderVisited) {
      return false;
    }
    
    if (activeRegion !== "all") {
      const artFormsInHotspot = hotspot.artForms;
      const matchingArtForms = artForms.filter(art => 
        artFormsInHotspot.includes(art.name) && art.region === activeRegion
      );
      if (matchingArtForms.length === 0) {
        return false;
      }
    }
    
    return true;
  });

  const handleHotspotClick = (hotspot: CulturalHotspot) => {
    setSelectedHotspot(hotspot);
  };

  const handleCloseDetails = () => {
    setSelectedHotspot(null);
  };

  const getMonthColor = (month: string) => {
    const seasons: Record<string, string> = {
      "January": "bg-blue-100 text-blue-800",
      "February": "bg-blue-100 text-blue-800",
      "March": "bg-green-100 text-green-800",
      "April": "bg-green-100 text-green-800",
      "May": "bg-yellow-100 text-yellow-800",
      "June": "bg-yellow-100 text-yellow-800",
      "July": "bg-yellow-100 text-yellow-800",
      "August": "bg-yellow-100 text-yellow-800",
      "September": "bg-orange-100 text-orange-800",
      "October": "bg-orange-100 text-orange-800",
      "November": "bg-purple-100 text-purple-800",
      "December": "bg-purple-100 text-purple-800",
    };
    
    return seasons[month] || "bg-gray-100 text-gray-800";
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">Cultural Hotspot Map</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore India's cultural centers and discover hidden gems worth visiting
        </p>
      </div>

      {/* Filters - Mobile Toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          {showFilters ? (
            <>
              <X className="mr-2 h-4 w-4" /> Close Filters
            </>
          ) : (
            <>
              <Filter className="mr-2 h-4 w-4" /> Show Filters
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className={`w-full md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4 font-rajdhani">Explore Options</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Filter by Region</h3>
                  <div className="flex flex-wrap gap-2">
                    {regions.map(region => (
                      <Button
                        key={region}
                        variant={activeRegion === region ? "default" : "outline"}
                        className={activeRegion === region ? "bg-tattva-accent text-white" : ""}
                        size="sm"
                        onClick={() => setActiveRegion(region)}
                      >
                        {region === "all" ? "All Regions" : region}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="undervisited"
                    checked={showUndervisitedOnly}
                    onCheckedChange={setShowUndervisitedOnly}
                  />
                  <Label htmlFor="undervisited">Show under-visited only</Label>
                </div>

                <div className="bg-tattva-light dark:bg-gray-800 p-3 rounded-md mt-4">
                  <h3 className="text-sm font-medium flex items-center mb-2">
                    <Info className="h-4 w-4 mr-1" /> Legend
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-tattva-primary rounded-full mr-2"></span>
                      <span>Popular destinations</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-tattva-accent rounded-full mr-2"></span>
                      <span>Hidden gems</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 mr-2">Jan-Feb</span>
                      <span>Winter</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 mr-2">Mar-Apr</span>
                      <span>Spring</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 mr-2">May-Aug</span>
                      <span>Summer/Monsoon</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-800 mr-2">Sep-Oct</span>
                      <span>Autumn</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 mr-2">Nov-Dec</span>
                      <span>Early Winter</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and Hotspots */}
        <div className="w-full md:w-3/4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              {/* Map Background */}
              <div className="relative bg-tattva-light dark:bg-gray-800 rounded-lg overflow-hidden h-96 mb-6">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <MapPinned className="w-32 h-32" />
                </div>
                <div className="absolute inset-0 p-4">
                  <p className="text-sm text-center font-medium mb-2">Interactive India Map</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    Select a destination below to view details
                  </p>
                </div>
                
                {/* This would be replaced with an actual map in a full implementation */}
                {filteredHotspots.map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className="absolute map-marker cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    style={{
                      left: `${(hotspot.lng - 69) / (98 - 69) * 100}%`,
                      top: `${(hotspot.lat - 8) / (37 - 8) * 100}%`,
                    }}
                    onClick={() => handleHotspotClick(hotspot)}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold
                       ${hotspot.isUnderVisited ? 'bg-tattva-accent' : 'bg-tattva-primary'}`}
                    >
                      {hotspot.popularityRating >= 8 && <Sparkles className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hotspot List */}
              <h3 className="text-lg font-semibold mb-4 font-rajdhani">Cultural Destinations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHotspots.map((hotspot) => (
                  <Card 
                    key={hotspot.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 overflow-hidden"
                    style={{
                      borderLeftColor: hotspot.isUnderVisited ? 'hsl(var(--accent))' : 'hsl(var(--primary))'
                    }}
                    onClick={() => handleHotspotClick(hotspot)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold font-rajdhani">{hotspot.name}</h4>
                        {hotspot.isUnderVisited && (
                          <Badge variant="outline" className="bg-tattva-accent/10 text-tattva-accent border-tattva-accent ml-2">
                            Hidden Gem
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{hotspot.state}</p>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`rounded-full h-2 ${hotspot.isUnderVisited ? 'bg-tattva-accent' : 'bg-tattva-primary'}`}
                            style={{ width: `${hotspot.popularityRating * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-xs ml-2">{hotspot.popularityRating}/10</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {hotspot.bestTimeToVisit.slice(0, 2).map((month) => (
                          <span 
                            key={month} 
                            className={`px-2 py-0.5 text-xs rounded-full ${getMonthColor(month)}`}
                          >
                            {month}
                          </span>
                        ))}
                        {hotspot.bestTimeToVisit.length > 2 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            +{hotspot.bestTimeToVisit.length - 2}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredHotspots.length === 0 && (
                <div className="text-center py-12">
                  <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No destinations match your filters</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveRegion("all");
                      setShowUndervisitedOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hotspot Details Dialog */}
      <Dialog open={!!selectedHotspot} onOpenChange={(open) => !open && handleCloseDetails()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedHotspot && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-rajdhani flex items-center">
                  {selectedHotspot.name}
                  {selectedHotspot.isUnderVisited && (
                    <Badge variant="outline" className="bg-tattva-accent/10 text-tattva-accent border-tattva-accent ml-2">
                      Hidden Gem
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="text-base">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedHotspot.state}, India
                  </div>
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="artforms" className="flex-1">Art Forms</TabsTrigger>
                  <TabsTrigger value="festivals" className="flex-1">Festivals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4 space-y-6">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">{selectedHotspot.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium font-rajdhani mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        Popularity Rating
                      </h4>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={`rounded-full h-3 ${selectedHotspot.isUnderVisited ? 'bg-tattva-accent' : 'bg-tattva-primary'}`}
                            style={{ width: `${selectedHotspot.popularityRating * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium">{selectedHotspot.popularityRating}/10</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium font-rajdhani mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Best Time to Visit
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedHotspot.bestTimeToVisit.map((month) => (
                          <span 
                            key={month} 
                            className={`px-2 py-0.5 text-xs rounded-full ${getMonthColor(month)}`}
                          >
                            {month}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="artforms" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedHotspot.artForms.map((artName) => {
                      const art = artForms.find(a => a.name === artName);
                      return (
                        <Card key={artName} className="overflow-hidden border border-border">
                          <CardContent className="p-4">
                            <h3 className="font-medium text-lg font-rajdhani">{artName}</h3>
                            {art ? (
                              <>
                                <Badge className="mt-1 mb-2 bg-tattva-secondary/20 text-tattva-dark">
                                  {art.category}
                                </Badge>
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                  {art.description}
                                </p>
                              </>
                            ) : (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Traditional art form of {selectedHotspot.state}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="festivals" className="mt-4">
                  {selectedHotspot.festivals.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {selectedHotspot.festivals.map((festival: Festival, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{festival.name}</span>
                              <Badge className={`ml-3 ${getMonthColor(festival.month)}`}>
                                {festival.month}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pt-2">
                            <p className="text-gray-700 dark:text-gray-300">
                              {festival.description}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">No festival information available</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default CulturalMap;
