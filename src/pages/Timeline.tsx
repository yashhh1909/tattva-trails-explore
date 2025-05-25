
import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { timelineEvents } from "@/data/artTimeline";
import TimelineCard from "@/components/timeline/TimelineCard";
import TimelineNavigation from "@/components/timeline/TimelineNavigation";
import TimelineFilters from "@/components/timeline/TimelineFilters";
import { Scroll, Clock, History, Newspaper, Calendar, Users } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-900/20 dark:via-orange-900/10 dark:to-amber-900/20">
        {/* Vintage Newspaper Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 rounded-2xl border-4 border-amber-300 dark:border-amber-700 shadow-2xl"></div>
          <div className="relative p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Newspaper className="h-10 w-10 text-amber-700 mr-3" />
              <div className="text-xs font-bold text-amber-700 tracking-widest font-serif">EST. 3000 BCE • HISTORICAL CHRONICLE</div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-2 font-serif text-amber-900 dark:text-amber-100 leading-tight">
              THE CULTURAL TIMES
            </h1>
            <div className="w-full h-2 bg-amber-700 mb-4 shadow-sm"></div>
            <div className="flex justify-center space-x-8 mb-4">
              <div className="w-16 h-0.5 bg-amber-600"></div>
              <div className="w-24 h-0.5 bg-amber-600"></div>
              <div className="w-16 h-0.5 bg-amber-600"></div>
            </div>
            <p className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-4 font-serif italic">
              Chronicles of Indian Art & Heritage
            </p>
            <p className="text-lg text-amber-700 dark:text-amber-300 max-w-4xl mx-auto font-medium leading-relaxed">
              A comprehensive chronological journey through millennia of artistic evolution, 
              where ancient traditions meet timeless creativity across the Indian subcontinent
            </p>
            <div className="mt-8 flex items-center justify-center space-x-12 text-sm text-amber-600 dark:text-amber-400 font-serif">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Published {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Scroll className="h-4 w-4 mr-2" />
                <span>{timelineEvents.length} Historical Events</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>5000 Years of Heritage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newspaper Section Divider */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex-1 h-px bg-amber-400"></div>
          <div className="px-4 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 font-serif text-sm font-bold py-1 rounded">
            EDITORIAL FILTERS
          </div>
          <div className="flex-1 h-px bg-amber-400"></div>
        </div>

        {/* Enhanced Filters with Newspaper Styling */}
        <div className="mb-8">
          <div className="bg-amber-50/80 dark:bg-amber-900/30 border-2 border-amber-200 dark:border-amber-700 rounded-lg p-6 shadow-lg">
            <TimelineFilters 
              categories={categories}
              activeCategory={category}
              onCategoryChange={handleCategoryChange}
              activeIndex={activeIndex}
              onNavigate={navigateTimeline}
            />
          </div>
        </div>

        {/* Enhanced Timeline with Newspaper Aesthetics */}
        <div className="relative bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/50 dark:from-amber-900/20 dark:via-orange-900/10 dark:to-amber-900/20 rounded-2xl p-8 border-2 border-amber-200 dark:border-amber-700 shadow-xl" ref={timelineRef}>
          {/* Ornate newspaper-style timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-2 h-full top-0 z-0">
            <div className="w-full h-full bg-gradient-to-b from-amber-600 via-amber-500 to-amber-600 shadow-lg rounded-full"></div>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-300/50 to-transparent rounded-full"></div>
          </div>
          
          {/* Decorative newspaper elements */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 bg-amber-600 rounded-full border-4 border-amber-100 dark:border-amber-800 shadow-lg z-10 flex items-center justify-center">
            <Scroll className="h-3 w-3 text-white" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-8 bg-amber-600 rounded-full border-4 border-amber-100 dark:border-amber-800 shadow-lg z-10 flex items-center justify-center">
            <Clock className="h-3 w-3 text-white" />
          </div>
          
          <div className="space-y-16">
            {filteredTimeline.map((item, index) => (
              <div 
                ref={el => itemRefs.current[index] = el}
                key={item.id}
                className="relative"
              >
                {/* Newspaper-style era indicator */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20">
                  <div className={`w-6 h-6 rounded-full border-4 border-amber-100 dark:border-amber-800 shadow-xl flex items-center justify-center ${
                    index % 3 === 0 ? 'bg-amber-600' : 
                    index % 3 === 1 ? 'bg-amber-700' : 'bg-amber-500'
                  }`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
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
          
          {/* Newspaper pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] rounded-2xl"></div>
        </div>

        <TimelineNavigation 
          activeIndex={activeIndex}
          totalItems={filteredTimeline.length}
          onNavigate={navigateTimeline}
        />

        {/* Newspaper Footer */}
        <div className="mt-12 p-6 border-2 border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg text-center">
          <div className="text-sm text-amber-700 dark:text-amber-300 font-medium font-serif">
            © {new Date().getFullYear()} The Cultural Times • Chronicling India's Heritage Since Ancient Times
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-serif italic">
            "Where History Meets Art, and Tradition Lives Forever"
          </div>
          <div className="mt-3 flex justify-center space-x-4">
            <div className="w-8 h-0.5 bg-amber-400"></div>
            <div className="w-12 h-0.5 bg-amber-400"></div>
            <div className="w-8 h-0.5 bg-amber-400"></div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Timeline;
