import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { timelineEvents } from "@/data/artTimeline";
import { ChevronDown, ChevronUp, Calendar, Clock, Info } from "lucide-react";

const Timeline = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter timeline items based on selected category
  const filteredTimeline = category === "all" 
    ? timelineEvents 
    : timelineEvents.filter(item => item.category === category);

  // Handle toggle expansion of timeline items
  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(itemId => itemId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  // Scroll to active timeline item
  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeIndex]);

  // Auto-scroll animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      // Highlight first item on load
      if (filteredTimeline.length > 0) {
        setActiveIndex(0);
        setExpandedIds([filteredTimeline[0].id]);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [filteredTimeline]);

  // Navigate through timeline
  const navigateTimeline = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, filteredTimeline.length - 1)
      : Math.max(activeIndex - 1, 0);
    
    setActiveIndex(newIndex);
    if (filteredTimeline[newIndex]) {
      setExpandedIds([filteredTimeline[newIndex].id]);
    }
  };

  // Format years for display
  const formatYear = (year: string) => {
    // If year contains BCE, format it
    if (year.includes("BCE")) {
      return year;
    }
    
    // Otherwise format as CE
    return `${year} CE`;
  };

  // Get categories for filter
  const categories = ["all", ...Array.from(new Set(timelineEvents.map(item => item.category)))];

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">Indian Art Timeline</h1>
        <p className="text-muted-foreground">
          Journey through the evolution of Indian art and culture across millennia
        </p>
      </div>

      {/* Category filters and navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge 
                key={cat} 
                variant={category === cat ? "default" : "outline"}
                className={`cursor-pointer ${category === cat ? 'bg-tattva-primary' : 'hover:bg-muted'}`}
                onClick={() => {
                  setCategory(cat);
                  setActiveIndex(0);
                  setExpandedIds([]);
                }}
              >
                {cat === "all" ? "All Categories" : cat}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={activeIndex === 0}
              onClick={() => navigateTimeline('prev')}
            >
              <ChevronUp className="h-4 w-4 mr-1" /> Earlier
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={activeIndex === filteredTimeline.length - 1}
              onClick={() => navigateTimeline('next')}
            >
              Later <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Timeline center line */}
        <div className="timeline-line"></div>
        
        <div className="space-y-12">
          {filteredTimeline.map((item, index) => (
            <div 
              ref={el => itemRefs.current[index] = el}
              key={item.id}
              className={`relative z-10 transform transition-all duration-500 ${
                activeIndex === index ? 'scale-105' : ''
              }`}
            >
              {/* Year marker */}
              <div className="flex items-center justify-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                  activeIndex === index 
                    ? 'bg-tattva-primary text-white' 
                    : 'bg-card text-foreground border border-border'
                }`}>
                  {index + 1}
                </div>
              </div>
              
              {/* Timeline card */}
              <Card 
                className={`border-border backdrop-blur-sm transform transition-all duration-500 hover:shadow-lg ${
                  activeIndex === index 
                    ? 'bg-card/90 shadow-md border-tattva-primary/30' 
                    : 'bg-card/50'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="mb-2 bg-tattva-primary/20 text-tattva-primary hover:bg-tattva-primary/30 font-normal">
                        {item.category}
                      </Badge>
                      <CardTitle className="text-xl font-rajdhani flex items-center">
                        {item.title}
                      </CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" /> 
                        <span>{formatYear(item.year)}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Preview content always visible */}
                  <div className="space-y-2 mb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline" className="bg-accent/10">
                        {item.artForm}
                      </Badge>
                      <Badge variant="outline" className="bg-accent/10">
                        Impact: {item.impactScore}/10
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Expandable content */}
                  {expandedIds.includes(item.id) && (
                    <div className="mt-4 space-y-4 animate-enter">
                      <div className="p-3 bg-tattva-primary/10 rounded-md">
                        <h4 className="text-sm font-semibold mb-1 flex items-center">
                          <Info className="h-3 w-3 mr-1" /> Cultural Significance
                        </h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Toggle button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleExpand(item.id)}
                    className="mt-4 w-full border-t border-border pt-2 gap-2 rounded-none rounded-b-md"
                  >
                    {expandedIds.includes(item.id) ? (
                      <>Show Less <ChevronUp className="h-4 w-4" /></>
                    ) : (
                      <>Learn More <ChevronDown className="h-4 w-4" /></>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-10">
        <Button 
          className="rounded-full bg-tattva-primary shadow-lg hover:bg-tattva-primary/90"
          size="icon"
          disabled={activeIndex === 0}
          onClick={() => navigateTimeline('prev')}
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
        <Button 
          className="rounded-full bg-tattva-primary shadow-lg hover:bg-tattva-primary/90"
          size="icon"
          disabled={activeIndex === filteredTimeline.length - 1}
          onClick={() => navigateTimeline('next')}
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-card/80 border border-border rounded-full px-3 py-1 text-sm backdrop-blur-sm z-10">
        {activeIndex + 1} of {filteredTimeline.length}
      </div>
    </PageLayout>
  );
};

export default Timeline;
