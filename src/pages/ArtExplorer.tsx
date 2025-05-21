
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { artForms } from "@/data/artForms";
import { Palette, MapPin, Hash, Filter, Search, Sparkles, XCircle } from "lucide-react";

// Types for filter state
interface FilterState {
  state: string;
  category: string;
  region: string;
}

const ArtExplorer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    state: "",
    category: "",
    region: "",
  });
  const [selectedArtForm, setSelectedArtForm] = useState<typeof artForms[0] | null>(null);

  // Extract unique values for filters
  const states = [...new Set(artForms.map((art) => art.state))];
  const categories = [...new Set(artForms.map((art) => art.category))];
  const regions = [...new Set(artForms.map((art) => art.region))];

  // Check if there's an ID in URL params
  useEffect(() => {
    const artId = searchParams.get("id");
    if (artId) {
      const art = artForms.find((a) => a.id === artId);
      if (art) {
        setSelectedArtForm(art);
      }
    }
  }, [searchParams]);

  // Filter art forms based on search term and filters
  const filteredArtForms = artForms.filter((art) => {
    const matchesSearch = searchTerm === "" || 
      art.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = filters.state === "" || art.state === filters.state;
    const matchesCategory = filters.category === "" || art.category === filters.category;
    const matchesRegion = filters.region === "" || art.region === filters.region;

    return matchesSearch && matchesState && matchesCategory && matchesRegion;
  });

  // Handle filter change
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      state: "",
      category: "",
      region: "",
    });
    setSearchTerm("");
  };

  // Handle click on art form card
  const handleArtFormClick = (art: typeof artForms[0]) => {
    setSelectedArtForm(art);
    // Update URL with art form ID
    setSearchParams({ id: art.id });
  };

  // Close details view
  const closeDetails = () => {
    setSelectedArtForm(null);
    setSearchParams({});
  };

  return (
    <PageLayout>
      {selectedArtForm ? (
        // Art form details view
        <div className="animate-enter">
          <Button
            variant="outline"
            className="mb-6"
            onClick={closeDetails}
          >
            <XCircle className="h-4 w-4 mr-2" /> Back to All Art Forms
          </Button>

          <Card className="border-border bg-card/90 shadow-lg backdrop-blur-sm">
            <CardHeader className="border-b border-border">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-tattva-primary">{selectedArtForm.category}</Badge>
                    <Badge variant="outline" className="bg-accent/10">{selectedArtForm.state}</Badge>
                  </div>
                  <CardTitle className="text-2xl mt-2 font-rajdhani">{selectedArtForm.name}</CardTitle>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{selectedArtForm.region} Region</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left side - Main info */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-3 font-rajdhani">About this Art Form</h3>
                  <p className="text-muted-foreground mb-6">{selectedArtForm.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className="border-border bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Origins</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {selectedArtForm.origins || `This art form originated in ${selectedArtForm.state} and has been practiced for generations.`}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-border bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Cultural Significance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {selectedArtForm.significance || `${selectedArtForm.name} holds significant cultural importance in ${selectedArtForm.state} and is often associated with local festivals and rituals.`}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-rajdhani">Characteristics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedArtForm.characteristics?.map((char, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-tattva-primary/20 flex items-center justify-center mt-0.5 mr-2">
                            <Sparkles className="h-3 w-3 text-tattva-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">{char}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side - Additional info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 font-rajdhani">Visual Representation</h3>
                    <div className="bg-gradient-to-br from-tattva-primary/20 to-tattva-accent/20 rounded-lg h-48 flex items-center justify-center mb-4 shadow-inner transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
                      <span className="text-8xl z-10 font-bold text-foreground/60 font-rajdhani">
                        {selectedArtForm.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 font-rajdhani">Related Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-tattva-primary/10">
                        {selectedArtForm.category}
                      </Badge>
                      <Badge variant="outline" className="bg-tattva-secondary/10">
                        {selectedArtForm.state}
                      </Badge>
                      <Badge variant="outline" className="bg-tattva-accent/10">
                        {selectedArtForm.region}
                      </Badge>
                      {selectedArtForm.materials?.map((material, index) => (
                        <Badge key={index} variant="outline" className="bg-muted/50">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Card className="bg-tattva-primary/10 border-tattva-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Where to Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {selectedArtForm.whereToExperience || `This art form can be experienced in various cultural centers and museums across ${selectedArtForm.state}, particularly in the ${selectedArtForm.region} region.`}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Art forms listing view
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 font-rajdhani">Art Explorer</h1>
            <p className="text-muted-foreground">
              Discover and explore India's diverse traditional art forms
            </p>
          </div>

          {/* Search and filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search art forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-card border-border"
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-border"
                disabled={!searchTerm && !filters.state && !filters.category && !filters.region}
              >
                <XCircle className="h-4 w-4 mr-2" /> Clear Filters
              </Button>
            </div>

            <Tabs defaultValue="state" className="w-full">
              <TabsList className="bg-muted/50 w-full sm:w-auto">
                <TabsTrigger value="state" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> State
                </TabsTrigger>
                <TabsTrigger value="category" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" /> Category
                </TabsTrigger>
                <TabsTrigger value="region" className="flex items-center">
                  <Hash className="h-4 w-4 mr-2" /> Region
                </TabsTrigger>
              </TabsList>

              <TabsContent value="state" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {states.map((state) => (
                    <Badge
                      key={state}
                      variant={filters.state === state ? "default" : "outline"}
                      className={`cursor-pointer ${
                        filters.state === state
                          ? "bg-tattva-primary"
                          : "bg-muted/30 hover:bg-muted/50"
                      }`}
                      onClick={() =>
                        handleFilterChange("state", filters.state === state ? "" : state)
                      }
                    >
                      {state}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="category" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={filters.category === category ? "default" : "outline"}
                      className={`cursor-pointer ${
                        filters.category === category
                          ? "bg-tattva-primary"
                          : "bg-muted/30 hover:bg-muted/50"
                      }`}
                      onClick={() =>
                        handleFilterChange(
                          "category",
                          filters.category === category ? "" : category
                        )
                      }
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="region" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <Badge
                      key={region}
                      variant={filters.region === region ? "default" : "outline"}
                      className={`cursor-pointer ${
                        filters.region === region
                          ? "bg-tattva-primary"
                          : "bg-muted/30 hover:bg-muted/50"
                      }`}
                      onClick={() =>
                        handleFilterChange("region", filters.region === region ? "" : region)
                      }
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Art forms grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtForms.length > 0 ? (
              filteredArtForms.map((art) => (
                <Card 
                  key={art.id} 
                  className="group art-card border-border overflow-hidden bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:rotate-1 hover:scale-[1.02]"
                  onClick={() => handleArtFormClick(art)}
                >
                  <div className="relative h-40 bg-gradient-to-br from-tattva-primary/20 to-tattva-accent/20 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <span className="text-8xl font-bold text-foreground/50 group-hover:text-foreground/70 transition-colors font-rajdhani">
                        {art.name.charAt(0)}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-tattva-primary/80">{art.category}</Badge>
                    </div>
                  </div>

                  <CardContent className="py-4">
                    <h3 className="text-xl font-semibold mb-1 font-rajdhani group-hover:text-tattva-primary transition-colors">{art.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{art.state}, {art.region}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {art.description}
                    </p>
                  </CardContent>

                  <CardFooter className="bg-card/60 border-t border-border pt-2">
                    <Button variant="ghost" size="sm" className="w-full text-tattva-accent group-hover:text-tattva-primary flex items-center justify-center">
                      <Palette className="h-4 w-4 mr-2" /> Explore Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-rajdhani">No Results Found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find any art forms matching your search criteria. Try adjusting your filters or search term.
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default ArtExplorer;
