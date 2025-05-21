
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { ArtForm, artForms } from "@/data/artForms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ArtExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique regions and categories for filters
  const regions = Array.from(new Set(artForms.map((art) => art.region)));
  const categories = Array.from(new Set(artForms.map((art) => art.category)));

  // Filter art forms based on search query and filters
  const filteredArtForms = artForms.filter((art) => {
    const matchesSearch = searchQuery === "" || art.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === null || art.region === selectedRegion;
    const matchesCategory = selectedCategory === null || art.category === selectedCategory;
    return matchesSearch && matchesRegion && matchesCategory;
  });

  // Function to reset all filters
  const resetFilters = () => {
    setSelectedRegion(null);
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Art Explorer</h1>
        <p className="text-muted-foreground">
          Discover the diverse traditional art forms of India
        </p>
      </div>

      {/* Search and filter section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search art forms..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={resetFilters}
            className="whitespace-nowrap"
          >
            Clear Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex gap-1 items-center bg-muted/50">
            <Filter className="h-3 w-3" /> Filters
          </Badge>
          {regions.map((region) => (
            <Badge
              key={region}
              variant={selectedRegion === region ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedRegion === region ? "bg-tattva-primary" : ""
              }`}
              onClick={() =>
                setSelectedRegion(selectedRegion === region ? null : region)
              }
            >
              {region}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex gap-1 items-center bg-muted/50">
            <Filter className="h-3 w-3" /> Categories
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === category ? "bg-tattva-primary" : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Art forms display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtForms.length > 0 ? (
          filteredArtForms.map((art) => (
            <ArtCard key={art.id} art={art} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No art forms found matching your criteria.</p>
            <Button onClick={resetFilters} className="mt-4">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

// Component for individual art form cards
const ArtCard = ({ art }: { art: ArtForm }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-tattva-primary/10 art-card">
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${art.image || '/placeholder.svg'})` }}
      ></div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-rajdhani">{art.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {art.region}
            </CardDescription>
          </div>
          <Badge className="bg-tattva-primary/20 text-tattva-primary hover:bg-tattva-primary/30">
            {art.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              Overview
            </TabsTrigger>
            <TabsTrigger value="details" className="flex-1">
              Details
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-2 mt-2">
            <p className="text-sm text-muted-foreground">{art.description}</p>
            <Separator className="my-2" />
            <div>
              <h4 className="text-sm font-medium mb-1">Origin</h4>
              <p className="text-xs text-muted-foreground">{art.origin}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Notable For</h4>
              <p className="text-xs text-muted-foreground">{art.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="techniques">
                <AccordionTrigger className="text-sm py-2">
                  Techniques
                </AccordionTrigger>
                <AccordionContent className="text-xs">
                  {art.description || "Information not available"}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger className="text-sm py-2">
                  Materials
                </AccordionTrigger>
                <AccordionContent className="text-xs">
                  {art.description || "Information not available"}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-muted/20 py-2">
        <div className="flex flex-wrap gap-1 w-full">
          {art.keywords && art.keywords.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArtExplorer;
