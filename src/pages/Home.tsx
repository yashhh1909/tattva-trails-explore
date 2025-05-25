
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
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
      {/* Hero Section with enhanced styling */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-tattva-dark to-tattva-dark/90">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" 
               style={{backgroundImage: "url('/lovable-uploads/702c4462-4efb-440c-bd0c-86651973d43f.png')", 
                      opacity: 0.7}}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-white z-10">
            <div className="w-20 h-20 border-t-4 border-b-4 border-tattva-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-xl font-medium">Discovering India's cultural treasures...</p>
          </div>
        ) : (
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" 
                style={{ fontFamily: 'serif' }}>
              <span className="text-white bg-gradient-to-r from-tattva-primary to-tattva-secondary bg-clip-text text-transparent font-extrabold">
                Tattva
              </span>
              <span className="text-white font-extrabold">Trails</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto drop-shadow-md font-semibold">
              Journey through India's vibrant artistic heritage and cultural landscapes
            </p>
            <div className="animate-float">
              <Link to="/art-explorer">
                <Button size="lg" className="bg-tattva-primary hover:bg-tattva-primary/90 text-white text-lg px-8 py-4">
                  Begin Your Cultural Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Enhanced Interactive Map Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-6 font-rajdhani text-foreground">
            Discover India's Cultural Tapestry
          </h2>
          <p className="text-center text-xl text-muted-foreground mb-12 max-w-3xl mx-auto font-medium">
            Immerse yourself in the rich cultural heritage spanning across India's diverse regions. 
            Each state tells a unique story of art, tradition, and timeless craftsmanship.
          </p>
          <div className="relative">
            <IndiaMap />
          </div>
        </div>
      </section>

      {/* Cultural Spotlight Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black mb-8 text-center font-rajdhani text-foreground">
            Cultural Spotlight
          </h2>
          
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <div className="md:w-1/4">
              <div className="bg-card rounded-lg shadow-md p-4 border border-border">
                <h3 className="text-lg font-bold mb-4 font-rajdhani">Explore by State</h3>
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
                            <h4 className="text-lg font-bold font-rajdhani">{art.name}</h4>
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

      {/* Enhanced AhamAI Teaser */}
      <section className="py-16 bg-gradient-to-br from-tattva-primary/5 to-tattva-accent/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-black mb-4 font-rajdhani text-foreground">Meet AhamAI</h2>
              <p className="text-lg text-muted-foreground mb-6 font-medium">
                Your intelligent guide to India's cultural heritage. Ask questions, get personalized recommendations, 
                and dive deeper into the stories behind traditional art forms.
              </p>
              <div className="space-y-3">
                <p className="flex items-center font-medium">
                  <span className="w-6 h-6 rounded-full bg-tattva-primary mr-3 flex items-center justify-center text-white">✓</span> 
                  Get personalized travel itineraries
                </p>
                <p className="flex items-center font-medium">
                  <span className="w-6 h-6 rounded-full bg-tattva-primary mr-3 flex items-center justify-center text-white">✓</span> 
                  Learn about local customs and traditions
                </p>
                <p className="flex items-center font-medium">
                  <span className="w-6 h-6 rounded-full bg-tattva-primary mr-3 flex items-center justify-center text-white">✓</span> 
                  Discover hidden cultural gems
                </p>
              </div>
              <Link to="/kalabot" className="mt-8 inline-block">
                <Button className="bg-tattva-secondary text-tattva-dark hover:bg-tattva-secondary/90 text-lg px-6 py-3">
                  Chat with AhamAI
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tattva-primary/20 to-tattva-accent/20 animate-pulse"></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-tattva-primary/40 to-tattva-accent/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-16 rounded-full bg-gradient-to-r from-tattva-primary to-tattva-accent flex items-center justify-center text-white font-bold text-2xl">
                  AI
                </div>
                <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md text-sm border border-border animate-bounce" style={{ animationDuration: '3s' }}>
                  Ask me about art forms!
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md text-sm border border-border animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
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
