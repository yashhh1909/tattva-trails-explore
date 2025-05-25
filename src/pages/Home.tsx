
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, BookOpen, Compass } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { artForms } from "@/data/artForms";
import { Card, CardContent } from "@/components/ui/card";
import IndiaMap from "@/components/map/IndiaMap";

const Home = () => {
  const [activeState, setActiveState] = useState("");
  const states = [...new Set(artForms.map((art) => art.state))];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleStateChange = (state: string) => {
    setActiveState(state);
  };

  return (
    <PageLayout fullWidth>
      {/* Hero Section with parallax effect and new banner image */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-tattva-dark to-tattva-dark/90">
        <div className="absolute inset-0 z-0">
          {/* New India skyline image as background */}
          <div className="absolute inset-0 bg-cover bg-center" 
               style={{backgroundImage: "url('/lovable-uploads/702c4462-4efb-440c-bd0c-86651973d43f.png')", 
                      opacity: 0.7}}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        </div>
        
        {isLoading ? (
          // Loading animation
          <div className="flex flex-col items-center justify-center text-white z-10">
            <div className="w-20 h-20 border-t-4 border-b-4 border-tattva-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-xl font-medium">Discovering India's cultural treasures...</p>
          </div>
        ) : (
          // Hero content
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-rajdhani drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="text-white bg-gradient-to-r from-tattva-primary to-tattva-secondary bg-clip-text text-transparent">Tattva</span>
              <span className="text-white">Trails</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-md">
              Journey through India's vibrant artistic heritage and cultural landscapes
            </p>
            <div className="animate-float">
              <Link to="/art-explorer">
                <Button size="lg" className="bg-tattva-primary hover:bg-tattva-primary/90 text-white">
                  Begin Your Cultural Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Interactive 3D Map of India Section - Enhanced styling */}
      <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-rajdhani text-foreground">Explore India's Cultural Landscape</h2>
          <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover the rich cultural heritage across India's diverse regions with our interactive 3D map.
            Hover and click to explore cultural hotspots.
          </p>
          <div className="relative bg-gradient-to-br from-tattva-primary/5 to-tattva-accent/5 rounded-2xl p-8 shadow-2xl border border-tattva-primary/10">
            <div className="transform transition-all duration-700 hover:scale-[1.02] ease-out">
              <IndiaMap />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section with enhanced 3D cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-rajdhani text-foreground">Explore India's Cultural Heritage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Art Explorer Feature */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm transform hover:scale-105 hover:rotate-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-tattva-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Palette className="h-8 w-8 text-tattva-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">Art Explorer</h3>
                <p className="text-muted-foreground mb-4">
                  Discover traditional art forms across regions, styles, and cultural categories.
                </p>
                <Link to="/art-explorer" className="text-tattva-primary hover:text-tattva-primary/80 mt-auto flex items-center">
                  Explore Art Forms <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Tourism Trends Feature */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm transform hover:scale-105 hover:-rotate-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-tattva-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Compass className="h-8 w-8 text-tattva-dark" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">Tourism Insights</h3>
                <p className="text-muted-foreground mb-4">
                  Analyze tourism trends and discover under-visited cultural sites.
                </p>
                <Link to="/trends" className="text-tattva-dark hover:text-tattva-dark/80 mt-auto flex items-center">
                  View Trends <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* AhamAI Feature (previously KalaBot) */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm transform hover:scale-105 hover:rotate-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-tattva-accent/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-tattva-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">AhamAI Assistant</h3>
                <p className="text-muted-foreground mb-4">
                  Your AI guide to exploring India's cultural heritage and planning your journey.
                </p>
                <Link to="/kalabot" className="text-tattva-accent hover:text-tattva-accent/80 mt-auto flex items-center">
                  Chat with AhamAI <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Spotlight Section with actual art form images */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center font-rajdhani text-foreground">Cultural Spotlight</h2>
          
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* States selection */}
            <div className="md:w-1/4">
              <div className="bg-card rounded-lg shadow-md p-4 border border-border">
                <h3 className="text-lg font-semibold mb-4 font-rajdhani">Explore by State</h3>
                <div className="space-y-2">
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeState === "" ? "bg-tattva-primary text-white" : "hover:bg-tattva-primary/10"}`}
                    onClick={() => handleStateChange("")}
                  >
                    All States
                  </button>
                  {states.map((state) => (
                    <button
                      key={state}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeState === state ? "bg-tattva-primary text-white" : "hover:bg-tattva-primary/10"}`}
                      onClick={() => handleStateChange(state)}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Art forms display with actual images */}
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artForms
                  .filter((art) => activeState === "" || art.state === activeState)
                  .slice(0, 6)
                  .map((art) => (
                    <Card key={art.id} className="art-card border-none shadow-md bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:translate-y-[-6px] hover:rotate-1 hover:shadow-lg overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-48 relative overflow-hidden rounded-t-lg">
                          <div
                            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-300 hover:scale-110"
                            style={{ backgroundImage: `url(${art.image})` }}
                          ></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          <div className="absolute bottom-2 left-2 text-white">
                            <span className="text-xs px-2 py-1 rounded-full bg-tattva-secondary/80 text-tattva-dark font-medium">
                              {art.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 relative z-10">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold font-rajdhani">{art.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{art.state}, {art.region}</p>
                          <Link
                            to={`/art-explorer?id=${art.id}`}
                            className="text-sm text-tattva-accent hover:text-tattva-accent/80 flex items-center"
                          >
                            Learn more <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link to="/art-explorer">
                  <Button variant="outline" className="border-tattva-primary text-tattva-primary hover:bg-tattva-primary hover:text-white">
                    View All Art Forms
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced AhamAI Teaser (formerly KalaBot) */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 font-rajdhani text-foreground">Meet AhamAI</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your intelligent guide to India's cultural heritage. Ask questions, get personalized recommendations, 
                and dive deeper into the stories behind traditional art forms. Now enhanced with voice capabilities and regional expertise!
              </p>
              <div className="space-y-2">
                <p className="flex items-center"><span className="w-6 h-6 rounded-full bg-tattva-primary mr-2 flex items-center justify-center text-white">✓</span> Get personalized travel itineraries</p>
                <p className="flex items-center"><span className="w-6 h-6 rounded-full bg-tattva-primary mr-2 flex items-center justify-center text-white">✓</span> Learn about local customs and traditions</p>
                <p className="flex items-center"><span className="w-6 h-6 rounded-full bg-tattva-primary mr-2 flex items-center justify-center text-white">✓</span> Discover hidden cultural gems</p>
              </div>
              <Link to="/kalabot" className="mt-6 inline-block">
                <Button className="bg-tattva-secondary text-tattva-dark hover:bg-tattva-secondary/90">
                  Chat with AhamAI
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tattva-primary/20 to-tattva-accent/20 animate-pulse"></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-tattva-primary/40 to-tattva-accent/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-16 rounded-full bg-gradient-to-r from-tattva-primary to-tattva-accent flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>
                {/* Speech bubbles for enhanced visual */}
                <div className="absolute -top-4 -right-4 bg-card/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md text-sm border border-border animate-bounce" style={{ animationDuration: '3s' }}>
                  Ask me about art forms!
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md text-sm border border-border animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  I know 100+ traditions!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
