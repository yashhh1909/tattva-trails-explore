
import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { timelineEvents } from "@/data/artTimeline";
import TimelineCard from "@/components/timeline/TimelineCard";
import TimelineNavigation from "@/components/timeline/TimelineNavigation";
import TimelineFilters from "@/components/timeline/TimelineFilters";
import { Scroll, Clock, History } from "lucide-react";

const Timeline = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredTimeline = category === "all" 
    ? timelineEvents 
    : timelineEvents.filter(item => item.category === category);

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(itemId => itemId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filteredTimeline.length > 0) {
        setActiveIndex(0);
        setExpandedIds([filteredTimeline[0].id]);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [filteredTimeline]);

  const navigateTimeline = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, filteredTimeline.length - 1)
      : Math.max(activeIndex - 1, 0);
    
    setActiveIndex(newIndex);
    if (filteredTimeline[newIndex]) {
      setExpandedIds([filteredTimeline[newIndex].id]);
    }
  };

  const categories = ["all", ...Array.from(new Set(timelineEvents.map(item => item.category)))];

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setActiveIndex(0);
    setExpandedIds([]);
  };

  return (
    <PageLayout>
      {/* Enhanced Header with Historical Theme */}
      <div className="mb-12 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-tattva-primary/5 via-tattva-accent/5 to-tattva-primary/5 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-center mb-4">
            <Scroll className="h-8 w-8 text-tattva-primary mr-3" />
            <History className="h-10 w-10 text-tattva-accent" />
            <Clock className="h-8 w-8 text-tattva-primary ml-3" />
          </div>
          <h1 className="text-5xl font-black mb-4 font-rajdhani bg-gradient-to-r from-tattva-primary to-tattva-accent bg-clip-text text-transparent">
            Chronicles of Indian Art
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Embark on a temporal journey through millennia of artistic evolution, 
            where ancient traditions meet timeless creativity across the Indian subcontinent
          </p>
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-tattva-primary rounded-full mr-2"></div>
              <span>Ancient Era</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-tattva-accent rounded-full mr-2"></div>
              <span>Medieval Period</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-tattva-secondary rounded-full mr-2"></div>
              <span>Modern Times</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters with Historical Styling */}
      <div className="mb-8">
        <TimelineFilters 
          categories={categories}
          activeCategory={category}
          onCategoryChange={handleCategoryChange}
          activeIndex={activeIndex}
          onNavigate={navigateTimeline}
        />
      </div>

      {/* Enhanced Timeline with Historical Aesthetics */}
      <div className="relative bg-gradient-to-b from-background via-muted/10 to-background rounded-2xl p-8" ref={timelineRef}>
        {/* Ornate timeline center line with historical elements */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-tattva-primary via-tattva-accent to-tattva-primary top-0 z-0 shadow-lg"></div>
        
        {/* Historical decorative elements */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-6 bg-tattva-primary rounded-full border-4 border-background shadow-lg z-10"></div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-6 h-6 bg-tattva-accent rounded-full border-4 border-background shadow-lg z-10"></div>
        
        <div className="space-y-16">
          {filteredTimeline.map((item, index) => (
            <div 
              ref={el => itemRefs.current[index] = el}
              key={item.id}
              className="relative"
            >
              {/* Era indicator */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20">
                <div className={`w-4 h-4 rounded-full border-4 border-background shadow-lg ${
                  index % 3 === 0 ? 'bg-tattva-primary' : 
                  index % 3 === 1 ? 'bg-tattva-accent' : 'bg-tattva-secondary'
                }`}></div>
              </div>
              
              <TimelineCard 
                item={item}
                isActive={activeIndex === index}
                isExpanded={expandedIds.includes(item.id)}
                index={index}
                toggleExpand={toggleExpand}
              />
            </div>
          ))}
        </div>
        
        {/* Historical pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000" fill-opacity="0.1"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] rounded-2xl"></div>
      </div>

      <TimelineNavigation 
        activeIndex={activeIndex}
        totalItems={filteredTimeline.length}
        onNavigate={navigateTimeline}
      />
    </PageLayout>
  );
};

export default Timeline;
