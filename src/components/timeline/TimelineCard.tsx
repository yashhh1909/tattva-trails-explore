
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Calendar, Info, Newspaper } from "lucide-react";
import { TimelineEvent } from "@/data/artTimeline";

interface TimelineCardProps {
  item: TimelineEvent;
  isActive: boolean;
  isExpanded: boolean;
  index: number;
  toggleExpand: (id: string) => void;
}

const TimelineCard = ({
  item,
  isActive,
  isExpanded,
  index,
  toggleExpand,
}: TimelineCardProps) => {
  // Format years for display
  const formatYear = (year: string) => {
    // If year contains BCE, format it
    if (year.includes("BCE")) {
      return year;
    }
    
    // Otherwise format as CE
    return `${year} CE`;
  };

  return (
    <div
      className={`relative z-10 transform transition-all duration-500 ${
        isActive ? 'scale-105' : ''
      }`}
    >
      {/* Newspaper-style year marker */}
      <div className="flex items-center justify-center mb-4">
        <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center z-10 border-2 shadow-xl font-serif ${
          isActive 
            ? 'bg-amber-600 text-white border-amber-400' 
            : 'bg-amber-50 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-600'
        }`}>
          <Newspaper className="h-4 w-4 mb-1" />
          <span className="text-xs font-bold">{index + 1}</span>
        </div>
      </div>
      
      {/* Timeline card with newspaper styling */}
      <Card 
        className={`border-2 backdrop-blur-sm transform transition-all duration-500 hover:shadow-xl font-serif ${
          isActive 
            ? 'bg-amber-50/90 dark:bg-amber-900/40 shadow-lg border-amber-400 dark:border-amber-500' 
            : 'bg-amber-25/80 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700'
        }`}
      >
        <CardHeader className="border-b border-amber-200 dark:border-amber-700">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-3 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-700 font-serif font-normal border border-amber-300 dark:border-amber-600">
                {item.category.toUpperCase()}
              </Badge>
              <CardTitle className="text-xl font-black font-serif flex items-center text-amber-900 dark:text-amber-100">
                {item.title}
              </CardTitle>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-amber-700 dark:text-amber-300 font-serif font-medium">
                <Calendar className="h-3 w-3 mr-1" /> 
                <span>{formatYear(item.year)}</span>
              </div>
            </div>
          </div>
          <CardDescription className="text-sm line-clamp-2 text-amber-600 dark:text-amber-400 font-serif leading-relaxed">
            {item.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          {/* Preview content always visible */}
          <div className="space-y-3 mb-3">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-amber-100 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-600 font-serif">
                {item.artForm}
              </Badge>
              <Badge variant="outline" className="bg-amber-100 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-600 font-serif">
                Impact: {item.impactScore}/10
              </Badge>
            </div>
          </div>
          
          {/* Expandable content */}
          {isExpanded && (
            <div className="mt-4 space-y-4 animate-enter">
              <div className="p-4 bg-amber-100/80 dark:bg-amber-800/30 rounded-md border border-amber-200 dark:border-amber-700">
                <h4 className="text-sm font-bold mb-2 flex items-center font-serif text-amber-900 dark:text-amber-100">
                  <Info className="h-3 w-3 mr-2" /> Historical Significance
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed font-serif">{item.description}</p>
              </div>
              
              {/* Additional newspaper-style details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-700">
                  <h5 className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 font-serif uppercase tracking-wide">Art Form</h5>
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-serif">{item.artForm}</p>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-700">
                  <h5 className="text-xs font-bold text-amber-800 dark:text-amber-200 mb-1 font-serif uppercase tracking-wide">Cultural Impact</h5>
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-serif">{item.impactScore}/10 Rating</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Newspaper-style toggle button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => toggleExpand(item.id)}
            className="mt-4 w-full border-t-2 border-amber-200 dark:border-amber-700 pt-3 gap-2 rounded-none rounded-b-md font-serif text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/30"
          >
            {isExpanded ? (
              <>Read Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Continue Reading <ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
