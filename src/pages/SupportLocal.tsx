
import React, { useState } from "react";
import { MapPin, Mail, Star, ExternalLink, Instagram, Facebook, Youtube, Search, Filter, X } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList,TabsTrigger } from "@/components/ui/tabs";
import { artisans, Artisan } from "@/data/artisans";
import { cn } from "@/lib/utils";

const SupportLocal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtForm, setSelectedArtForm] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const artForms = [...new Set(artisans.map(artisan => artisan.artForm))];
  const states = [...new Set(artisans.map(artisan => artisan.state))];

  // Filter artisans based on search and filters
  const filteredArtisans = artisans.filter(artisan => {
    const matchesSearch = searchQuery === "" || 
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.artForm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArtForm = selectedArtForm === "" || artisan.artForm === selectedArtForm;
    const matchesState = selectedState === "" || artisan.state === selectedState;
    
    return matchesSearch && matchesArtForm && matchesState;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedArtForm("");
    setSelectedState("");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">Support Local Artisans</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Connect with master craftspeople preserving India's artistic heritage
        </p>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={toggleFilters}
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
        <div className={cn(
          "w-full md:w-1/4 transition-all duration-300",
          showFilters ? "block" : "hidden md:block"
        )}>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4 font-rajdhani">Find Artisans</h2>
              
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search artisans..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Art Form Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Art Form</label>
                <Select
                  value={selectedArtForm}
                  onValueChange={setSelectedArtForm}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Art Forms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Art Forms</SelectItem>
                    {artForms.map((artForm) => (
                      <SelectItem key={artForm} value={artForm}>
                        {artForm}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* State Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">State</label>
                <Select
                  value={selectedState}
                  onValueChange={setSelectedState}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Clear Filters */}
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={handleClearFilters}
                disabled={!searchQuery && !selectedArtForm && !selectedState}
              >
                Clear All Filters
              </Button>
              
              <Separator className="my-4" />
              
              {/* Why Support Tips */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Why Support Local?</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="bg-tattva-primary/10 text-tattva-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</span>
                    <span>Preserve traditional knowledge and techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-tattva-primary/10 text-tattva-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</span>
                    <span>Support sustainable, eco-friendly practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-tattva-primary/10 text-tattva-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</span>
                    <span>Bring economic benefits directly to artisan communities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-tattva-primary/10 text-tattva-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">4</span>
                    <span>Take home authentic cultural souvenirs with real stories</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Artisan Listings */}
        <div className="w-full md:w-3/4">
          {filteredArtisans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArtisans.map((artisan) => (
                <Card 
                  key={artisan.id} 
                  className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-t-4"
                  style={{ 
                    borderTopColor: `hsl(${22 + (parseInt(artisan.id) * 20)} 74% 58%)` 
                  }}
                  onClick={() => setSelectedArtisan(artisan)}
                >
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-tr from-tattva-primary/20 to-tattva-accent/20 flex items-center justify-center">
                      <div className="text-6xl opacity-60 font-rajdhani">
                        {artisan.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg font-rajdhani">{artisan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{artisan.artForm}</p>
                      
                      <div className="flex items-center text-sm mb-3">
                        <MapPin className="h-3 w-3 mr-1 text-tattva-primary" />
                        <span>{artisan.location}, {artisan.state}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-3 w-3",
                                i < artisan.sustainabilityRating
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {artisan.experience}+ years
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No artisans found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your filters to find more artisans
              </p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Artisan Details Dialog */}
      <Dialog open={!!selectedArtisan} onOpenChange={(open) => !open && setSelectedArtisan(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedArtisan && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-rajdhani">
                  {selectedArtisan.name}
                </DialogTitle>
                <DialogDescription className="text-base">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 bg-tattva-primary/10 text-tattva-primary">
                      {selectedArtisan.artForm}
                    </Badge>
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {selectedArtisan.location}, {selectedArtisan.state}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="about" className="mt-6">
                <TabsList className="w-full">
                  <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                  <TabsTrigger value="offerings" className="flex-1">Workshops & Products</TabsTrigger>
                  <TabsTrigger value="contact" className="flex-1">Contact & Shop</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="h-64 bg-gradient-to-br from-tattva-primary/30 to-tattva-accent/30 rounded-lg flex items-center justify-center">
                        <div className="text-8xl opacity-50 font-rajdhani">
                          {selectedArtisan.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium font-rajdhani mb-2">Experience & Expertise</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedArtisan.name} is a master {selectedArtisan.artForm} artisan with over {selectedArtisan.experience} years of experience. 
                          {selectedArtisan.awards?.length ? ` Their work has been recognized with awards including ${selectedArtisan.awards.join(' and ')}.` : ''}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium font-rajdhani mb-2">Sustainability Rating</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "h-5 w-5",
                                  i < selectedArtisan.sustainabilityRating
                                    ? "text-yellow-400 fill-yellow-400" 
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">
                            ({selectedArtisan.sustainabilityRating}/5)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          This rating reflects the artisan's commitment to sustainable materials, eco-friendly production methods, and cultural preservation.
                        </p>
                      </div>
                      
                      {selectedArtisan.awards && selectedArtisan.awards.length > 0 && (
                        <div>
                          <h3 className="font-medium font-rajdhani mb-2">Awards & Recognition</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedArtisan.awards.map((award, index) => (
                              <li key={index} className="text-gray-600 dark:text-gray-300">{award}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="bg-tattva-light dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium font-rajdhani mb-2">Cultural Significance</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedArtisan.artForm} from {selectedArtisan.state} is a vital part of India's cultural heritage. 
                          By supporting {selectedArtisan.name}, you help preserve traditional techniques that have been passed down through generations.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="offerings" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-medium font-rajdhani mb-4">Workshops & Products</h3>
                      <div className="space-y-4">
                        {selectedArtisan.offeringsAndWorkshops.map((offering, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h4 className="font-medium">{offering}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Contact the artisan directly to learn more about availability, pricing, and booking details.
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-tattva-accent/10 p-4 rounded-lg mb-4">
                        <h3 className="font-medium font-rajdhani mb-2">What to Expect</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="bg-tattva-accent/20 text-tattva-accent rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                            <span>Authentic techniques and materials</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-tattva-accent/20 text-tattva-accent rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                            <span>Cultural context and history</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-tattva-accent/20 text-tattva-accent rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                            <span>Personalized learning experience</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-tattva-accent/20 text-tattva-accent rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">✓</span>
                            <span>Take home your own handmade creation</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium font-rajdhani mb-2">Booking Tips</h3>
                          <ul className="space-y-1 text-sm list-disc pl-5">
                            <li>Book workshops at least 1-2 weeks in advance</li>
                            <li>Group discounts may be available</li>
                            <li>Ask about material costs (may be extra)</li>
                            <li>Inquire about language options for international visitors</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium font-rajdhani mb-4">Contact Information</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 mr-3 text-tattva-primary mt-0.5" />
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-sm">{selectedArtisan.contact}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 text-tattva-primary mt-0.5" />
                            <div>
                              <p className="font-medium">Location</p>
                              <p className="text-sm">{selectedArtisan.location}, {selectedArtisan.state}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Shop Link */}
                        {selectedArtisan.shopLink && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Online Shop</h4>
                            <a 
                              href={selectedArtisan.shopLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-tattva-primary hover:text-tattva-primary/80"
                            >
                              Visit Online Store <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        )}
                        
                        {/* Social Media */}
                        {selectedArtisan.socialMedia && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Social Media</h4>
                            <div className="flex space-x-3">
                              {selectedArtisan.socialMedia.instagram && (
                                <a
                                  href={`https://instagram.com/${selectedArtisan.socialMedia.instagram.replace('@', '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-pink-600 hover:text-pink-700"
                                  aria-label="Instagram"
                                >
                                  <Instagram size={20} />
                                </a>
                              )}
                              {selectedArtisan.socialMedia.facebook && (
                                <a
                                  href={`https://facebook.com/${selectedArtisan.socialMedia.facebook}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700"
                                  aria-label="Facebook"
                                >
                                  <Facebook size={20} />
                                </a>
                              )}
                              {selectedArtisan.socialMedia.youtube && (
                                <a
                                  href={`https://youtube.com/${selectedArtisan.socialMedia.youtube}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-red-600 hover:text-red-700"
                                  aria-label="YouTube"
                                >
                                  <Youtube size={20} />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium font-rajdhani mb-2">Responsible Tourism Tips</h3>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                              <span className="bg-tattva-secondary/20 text-tattva-dark rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</span>
                              <span>Ask permission before photographing artisans or their work</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-tattva-secondary/20 text-tattva-dark rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</span>
                              <span>Value their craftsmanship – avoid excessive bargaining</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-tattva-secondary/20 text-tattva-dark rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</span>
                              <span>Share your experience – help promote their work online</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-tattva-secondary/20 text-tattva-dark rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">4</span>
                              <span>Learn a few phrases in the local language</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-tattva-primary/10 border-none">
                        <CardContent className="p-4">
                          <h3 className="font-medium font-rajdhani mb-2">Why Your Support Matters</h3>
                          <p className="text-sm">
                            When you purchase directly from artisans like {selectedArtisan.name}, you're helping to preserve traditional 
                            knowledge and ensuring sustainable livelihoods for entire communities. Each piece you buy has a story 
                            and cultural significance that can't be found in mass-produced items.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default SupportLocal;
