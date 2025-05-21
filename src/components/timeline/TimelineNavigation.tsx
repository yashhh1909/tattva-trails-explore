
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TimelineNavigationProps {
  activeIndex: number;
  totalItems: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const TimelineNavigation = ({
  activeIndex,
  totalItems,
  onNavigate
}: TimelineNavigationProps) => {
  return (
    <>
      {/* Navigation controls */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-10">
        <Button 
          className="rounded-full bg-tattva-primary shadow-lg hover:bg-tattva-primary/90"
          size="icon"
          disabled={activeIndex === 0}
          onClick={() => onNavigate('prev')}
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
        <Button 
          className="rounded-full bg-tattva-primary shadow-lg hover:bg-tattva-primary/90"
          size="icon"
          disabled={activeIndex === totalItems - 1}
          onClick={() => onNavigate('next')}
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-card/80 border border-border rounded-full px-3 py-1 text-sm backdrop-blur-sm z-10">
        {activeIndex + 1} of {totalItems}
      </div>
    </>
  );
};

export default TimelineNavigation;
