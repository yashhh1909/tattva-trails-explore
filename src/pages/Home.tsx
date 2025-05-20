
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Palette, BookOpen, Users, Compass } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { artForms } from "@/data/artForms";
import { culturalHotspots } from "@/data/culturalHotspots";
import { Card, CardContent } from "@/components/ui/card";

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
      {/* Hero Section with parallax effect */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-tattva-dark to-tattva-dark/90">
        <div className="absolute inset-0 z-0">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-rajdhani">
              <span className="text-tattva-primary">Tattva</span>
              <span className="text-tattva-secondary">Trails</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
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

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-rajdhani">Explore India's Cultural Heritage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Art Explorer Feature */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-tattva-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Palette className="h-8 w-8 text-tattva-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">Art Explorer</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Discover traditional art forms across regions, styles, and cultural categories.
                </p>
                <Link to="/art-explorer" className="text-tattva-primary hover:text-tattva-primary/80 mt-auto flex items-center">
                  Explore Art Forms <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Cultural Map Feature */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-tattva-accent/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-tattva-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">Cultural Hotspots</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Explore a map of India's cultural centers and hidden gems worth visiting.
                </p>
                <Link to="/cultural-map" className="text-tattva-accent hover:text-tattva-accent/80 mt-auto flex items-center">
                  View Map <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Tourism Trends Feature */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-tattva-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Compass className="h-8 w-8 text-tattva-dark" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-rajdhani">Tourism Insights</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Analyze tourism trends and discover under-visited cultural sites.
                </p>
                <Link to="/trends" className="text-tattva-dark hover:text-tattva-dark/80 mt-auto flex items-center">
                  View Trends <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-16 bg-tattva-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center font-rajdhani">Cultural Spotlight</h2>
          
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* States selection */}
            <div className="md:w-1/4">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
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
            
            {/* Art forms display */}
            <div className="md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artForms
                  .filter((art) => activeState === "" || art.state === activeState)
                  .slice(0, 6)
                  .map((art) => (
                    <Card key={art.id} className="art-card border-none shadow-md">
                      <CardContent className="p-0">
                        <div className="h-48 bg-gradient-to-br from-tattva-primary/20 to-tattva-accent/20 rounded-t-lg flex items-center justify-center">
                          <span className="text-5xl">{art.name.charAt(0)}</span>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold font-rajdhani">{art.name}</h4>
                            <span className="text-xs px-2 py-1 rounded-full bg-tattva-secondary/20 text-tattva-dark">
                              {art.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{art.state}, {art.region}</p>
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

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-tattva-primary to-tattva-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-rajdhani">Support Local Artisans</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Discover authentic experiences and directly support the custodians of India's rich cultural heritage.
          </p>
          <Link to="/support-local">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-tattva-primary">
              Connect with Artisans
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* KalaBot Teaser */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 font-rajdhani">Meet KalaBot</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Your AI guide to India's cultural heritage. Ask questions, get personalized recommendations, and dive deeper into the stories behind traditional art forms.
              </p>
              <Link to="/kalabot">
                <Button className="bg-tattva-secondary text-tattva-dark hover:bg-tattva-secondary/90">
                  Chat with KalaBot
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tattva-primary/20 to-tattva-accent/20 animate-pulse"></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-tattva-primary/40 to-tattva-accent/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-16 rounded-full bg-gradient-to-r from-tattva-primary/60 to-tattva-accent/60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-24 rounded-full bg-gradient-to-r from-tattva-primary to-tattva-accent flex items-center justify-center text-white font-bold text-xl">
                  K
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
