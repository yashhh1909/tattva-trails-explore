import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Calendar, Info } from "lucide-react";
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
      {/* Year marker */}
      <div className="flex items-center justify-center mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
          isActive 
            ? 'bg-tattva-primary text-white' 
            : 'bg-card text-foreground border border-border'
        }`}>
          {index + 1}
        </div>
      </div>
      
      {/* Timeline card */}
      <Card 
        className={`border-border backdrop-blur-sm transform transition-all duration-500 hover:shadow-lg ${
          isActive 
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
          {isExpanded && (
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
            {isExpanded ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Learn More <ChevronDown className="h-4 w-4" /></>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
