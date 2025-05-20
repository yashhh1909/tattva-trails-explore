
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { timelineEvents, TimelineEvent } from "@/data/artTimeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarClock, Filter, History, Star, 
  Sparkles, TrendingUp, X, RotateCw 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Timeline = () => {
  const [filter, setFilter] = useState<string>("all");
  const artForms = ["all", ...new Set(timelineEvents.map(event => event.artForm))];
  const categories = ["all", ...new Set(timelineEvents.map(event => event.category))];
  
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter and sort events
  const filteredEvents = timelineEvents
    .filter(event => {
      if (filter !== "all" && event.artForm !== filter) return false;
      if (selectedCategory !== "all" && event.category !== selectedCategory) return false;
      return true;
    })
    .sort((a, b) => {
      // Extract years for comparison, handling non-numeric years like "~200 BCE"
      const extractYear = (yearString: string) => {
        const numericPart = yearString.replace(/[^\d]/g, '');
        const isBCE = yearString.includes("BCE");
        return isBCE ? -parseInt(numericPart) : parseInt(numericPart);
      };
      
      const yearA = extractYear(a.year);
      const yearB = extractYear(b.year);
      
      return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
    });

  // Get category color for badges
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Origin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "Revival":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "Recognition":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
      case "Funding":
        return "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100";
      case "Technological Adaptation":
        return "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Origin":
        return <History className="h-4 w-4" />;
      case "Revival":
        return <RotateCw className="h-4 w-4" />;
      case "Recognition":
        return <Star className="h-4 w-4" />;
      case "Funding":
        return <TrendingUp className="h-4 w-4" />;
      case "Technological Adaptation":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <CalendarClock className="h-4 w-4" />;
    }
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">Art Timeline</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore the evolution of Indian art forms through history
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Panel */}
        <div className="w-full md:w-1/4">
          <Card className="shadow-md sticky top-20">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4 font-rajdhani">Timeline Filters</h2>
              
              <div className="space-y-4">
                {/* Art Form Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Art Form</label>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Art Forms" />
                    </SelectTrigger>
                    <SelectContent>
                      {artForms.map((art) => (
                        <SelectItem key={art} value={art}>
                          {art === "all" ? "All Art Forms" : art}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-1">Event Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Chronological Order */}
                <div>
                  <label className="block text-sm font-medium mb-1">Timeline Order</label>
                  <Tabs 
                    defaultValue={sortOrder}
                    value={sortOrder}
                    onValueChange={(value) => setSortOrder(value as "asc" | "desc")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="asc">Oldest First</TabsTrigger>
                      <TabsTrigger value="desc">Newest First</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Legend */}
                <div className="bg-background rounded-md border p-3 mt-4">
                  <h3 className="text-sm font-medium mb-2">Event Types</h3>
                  <div className="space-y-2 text-xs">
                    {categories.filter(c => c !== "all").map(category => (
                      <div key={category} className="flex items-center">
                        <Badge 
                          className={cn("mr-2", getCategoryColor(category))}
                          variant="outline"
                        >
                          {getCategoryIcon(category)}
                        </Badge>
                        <span>{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Timeline Display */}
        <div className="w-full md:w-3/4">
          <Card>
            <CardContent className="p-6">
              {filteredEvents.length > 0 ? (
                <div className="relative pl-8">
                  {/* Timeline vertical line */}
                  <div className="timeline-line"></div>
                  
                  {/* Timeline events */}
                  <div className="space-y-8">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-4 border-tattva-primary z-10"></div>
                        
                        {/* Year label */}
                        <div className="absolute -left-36 top-0 w-24 text-right">
                          <span className="font-semibold text-lg font-rajdhani">{event.year}</span>
                        </div>
                        
                        {/* Content card */}
                        <Card className="ml-2 transform transition-all duration-200 hover:shadow-lg">
                          <CardContent className="p-4">
                            <div className="flex flex-wrap justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold font-rajdhani mr-2">{event.title}</h3>
                              <Badge 
                                variant="outline"
                                className={cn(getCategoryColor(event.category))}
                              >
                                <span className="flex items-center">
                                  {getCategoryIcon(event.category)}
                                  <span className="ml-1">{event.category}</span>
                                </span>
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {event.description}
                            </p>
                            
                            <div className="flex flex-wrap justify-between items-center">
                              <span className="text-sm text-tattva-primary dark:text-tattva-secondary">
                                {event.artForm}
                              </span>
                              
                              <div className="flex items-center">
                                <span className="text-xs mr-1">Impact:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={cn(
                                        "h-3 w-3",
                                        i < Math.round(event.impactScore / 2) 
                                          ? "text-yellow-400 fill-yellow-400" 
                                          : "text-gray-300"
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No events match the filters</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Try adjusting your filter settings
                  </p>
                  <button
                    className="text-tattva-primary hover:text-tattva-primary/80 flex items-center mx-auto"
                    onClick={() => {
                      setFilter("all");
                      setSelectedCategory("all");
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear Filters
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Timeline;
