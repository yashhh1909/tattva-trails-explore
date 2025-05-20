
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Filter, X, Info } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArtForm, artForms } from "@/data/artForms";
import { cn } from "@/lib/utils";

const ArtExplorer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedId = queryParams.get("id");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all_regions");
  const [selectedCategory, setSelectedCategory] = useState<string>("all_categories");
  const [selectedArt, setSelectedArt] = useState<ArtForm | null>(null);
  const [filteredArts, setFilteredArts] = useState<ArtForm[]>(artForms);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const regions = [...new Set(artForms.map((art) => art.region))];
  const categories = [...new Set(artForms.map((art) => art.category))];

  useEffect(() => {
    if (selectedId) {
      const art = artForms.find((art) => art.id === selectedId);
      if (art) {
        setSelectedArt(art);
      }
    }
  }, [selectedId]);

  useEffect(() => {
    let result = artForms;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (art) =>
          art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          art.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          art.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion && selectedRegion !== "all_regions") {
      result = result.filter((art) => art.region === selectedRegion);
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all_categories") {
      result = result.filter((art) => art.category === selectedCategory);
    }

    setFilteredArts(result);
  }, [searchQuery, selectedRegion, selectedCategory]);

  const handleArtClick = (art: ArtForm) => {
    setSelectedArt(art);
    // Update URL without full page refresh
    navigate(`/art-explorer?id=${art.id}`, { replace: true });
  };

  const handleCloseDetails = () => {
    setSelectedArt(null);
    navigate("/art-explorer", { replace: true });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all_regions");
    setSelectedCategory("all_categories");
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">Art Explorer</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover India's rich heritage of traditional art forms
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Mobile Toggle */}
        <div className="md:hidden mb-4">
          <Button
            onClick={toggleFilters}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            {isFilterOpen ? (
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

        {/* Filters - Sidebar */}
        <aside
          className={cn(
            "w-full md:w-1/4 transition-all duration-300",
            isFilterOpen ? "block" : "hidden md:block"
          )}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 font-rajdhani">Filters</h2>

            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search art forms..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Region Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Region</label>
              <Select
                value={selectedRegion}
                onValueChange={setSelectedRegion}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_regions">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
              disabled={!searchQuery && selectedRegion === "all_regions" && selectedCategory === "all_categories"}
            >
              Clear All Filters
            </Button>

            {/* Results count */}
            <div className="mt-4 text-sm text-center">
              Showing {filteredArts.length} of {artForms.length} art forms
            </div>
          </div>
        </aside>

        {/* Art Forms Grid */}
        <div className="w-full md:w-3/4">
          {filteredArts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArts.map((art) => (
                <Card
                  key={art.id}
                  className="art-card border border-border cursor-pointer hover:border-tattva-primary"
                  onClick={() => handleArtClick(art)}
                >
                  <CardContent className="p-0">
                    <div className="h-48 bg-gradient-to-br from-tattva-primary/20 to-tattva-accent/20 rounded-t-lg flex items-center justify-center">
                      <span className="text-5xl">{art.name.charAt(0)}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold font-rajdhani">
                          {art.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="bg-tattva-secondary/20 text-tattva-dark"
                        >
                          {art.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {art.state}, {art.region}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-tattva-primary rounded-full h-2"
                            style={{ width: `${art.popularity * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-xs ml-2">
                          {art.popularity}/10
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <Info className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No art forms found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your filters or search query
              </p>
              <Button
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Art Details Dialog */}
      <Dialog open={!!selectedArt} onOpenChange={(open) => !open && handleCloseDetails()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedArt && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-rajdhani flex items-center justify-between">
                  {selectedArt.name}
                  <Badge
                    variant="outline"
                    className="ml-2 bg-tattva-secondary/20 text-tattva-dark"
                  >
                    {selectedArt.category}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-base font-medium">
                  {selectedArt.state}, {selectedArt.region} Region
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                {/* Header Image */}
                <div className="h-64 bg-gradient-to-br from-tattva-primary/30 to-tattva-accent/30 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-8xl opacity-50">{selectedArt.name.charAt(0)}</span>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium font-rajdhani mb-2">About {selectedArt.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{selectedArt.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium font-rajdhani mb-2">Origin</h4>
                      <p>{selectedArt.origin}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium font-rajdhani mb-2">Popularity</h4>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-tattva-primary rounded-full h-3"
                            style={{ width: `${selectedArt.popularity * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium">{selectedArt.popularity}/10</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium font-rajdhani mb-2">Conservation Status</h4>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={selectedArt.giTagged ? "default" : "outline"}
                        className={selectedArt.giTagged ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : ""}
                      >
                        {selectedArt.giTagged ? "GI Tagged" : "Not GI Tagged"}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedArt.giTagged
                          ? "This art form is protected under Geographical Indication"
                          : "This art form does not yet have Geographical Indication protection"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default ArtExplorer;
