
import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { timelineEvents } from "@/data/artTimeline";
import TimelineCard from "@/components/timeline/TimelineCard";
import TimelineNavigation from "@/components/timeline/TimelineNavigation";
import TimelineFilters from "@/components/timeline/TimelineFilters";

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

  // Get categories for filter
  const categories = ["all", ...Array.from(new Set(timelineEvents.map(item => item.category)))];

  // Handle category change
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setActiveIndex(0);
    setExpandedIds([]);
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">Indian Art Timeline</h1>
        <p className="text-muted-foreground">
          Journey through the evolution of Indian art and culture across millennia
        </p>
      </div>

      {/* Category filters and navigation */}
      <TimelineFilters 
        categories={categories}
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
        activeIndex={activeIndex}
        onNavigate={navigateTimeline}
      />

      {/* Interactive Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Timeline center line */}
        <div className="timeline-line"></div>
        
        <div className="space-y-12">
          {filteredTimeline.map((item, index) => (
            <div 
              ref={el => itemRefs.current[index] = el}
              key={item.id}
            >
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
      </div>

      {/* Navigation controls */}
      <TimelineNavigation 
        activeIndex={activeIndex}
        totalItems={filteredTimeline.length}
        onNavigate={navigateTimeline}
      />
    </PageLayout>
  );
};

export default Timeline;
