
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TimelineEvent } from "@/data/artTimeline";

interface TimelineFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const TimelineFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  activeIndex,
  onNavigate
}: TimelineFiltersProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge 
              key={cat} 
              variant={activeCategory === cat ? "default" : "outline"}
              className={`cursor-pointer ${activeCategory === cat ? 'bg-tattva-primary' : 'hover:bg-muted'}`}
              onClick={() => onCategoryChange(cat)}
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
            onClick={() => onNavigate('prev')}
          >
            <ChevronUp className="h-4 w-4 mr-1" /> Earlier
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled={activeIndex === 0} // This will be updated in the parent with the filtered length
            onClick={() => onNavigate('next')}
          >
            Later <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimelineFilters;
