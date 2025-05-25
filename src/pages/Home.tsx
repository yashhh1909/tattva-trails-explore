
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Scroll, Calendar, Users } from "lucide-react";
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
      {/* Hero Section with enhanced typography */}
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
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" 
                style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.8), 8px 8px 16px rgba(228,111,68,0.3)'
                }}>
              <span className="text-white bg-gradient-to-r from-tattva-primary via-yellow-400 to-tattva-secondary bg-clip-text text-transparent font-extrabold relative">
                Tattva
                <span className="absolute -top-2 -right-2 text-xs text-tattva-secondary rotate-12 opacity-80">✨</span>
              </span>
              <br />
              <span className="text-white font-extrabold italic tracking-wider" 
                    style={{ fontFamily: 'Brush Script MT, cursive' }}>
                Trails
              </span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 mb-8 max-w-4xl mx-auto drop-shadow-lg font-bold tracking-wide"
               style={{ 
                 fontFamily: 'Georgia, serif',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
               }}>
              Journey through India's <span className="text-tattva-secondary italic">vibrant</span> artistic heritage 
              <br />and <span className="text-tattva-primary italic">cultural landscapes</span>
            </p>
            <div className="animate-float">
              <Link to="/art-explorer">
                <Button size="lg" className="bg-tattva-primary hover:bg-tattva-primary/90 text-white text-lg px-8 py-4 shadow-2xl border-2 border-tattva-secondary/30 hover:border-tattva-secondary">
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

      {/* Old Newspaper Style Timeline Teaser */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-amber-900/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml;charset=utf-8,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            opacity: 0.2
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          {/* Newspaper Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800/20 dark:to-orange-800/20 rounded-2xl border-4 border-amber-300 dark:border-amber-700 shadow-2xl"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-center mb-4">
                <Scroll className="h-8 w-8 text-amber-700 mr-3" />
                <div className="text-xs font-bold text-amber-700 tracking-widest font-serif">EST. 3000 BCE • HERITAGE EDITION</div>
                <Clock className="h-8 w-8 text-amber-700 ml-3" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-2 font-serif text-amber-900 dark:text-amber-100 leading-tight tracking-tight">
                THE HERITAGE CHRONICLE
              </h2>
              <div className="w-full h-1 bg-amber-700 mb-4"></div>
              <p className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2 font-serif italic">
                A Journey Through Time & Tradition
              </p>
              <p className="text-lg text-amber-700 dark:text-amber-300 max-w-4xl mx-auto font-medium">
                Explore the chronological evolution of India's artistic heritage, from ancient civilizations to modern renaissance
              </p>
              <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-amber-600 dark:text-amber-400 font-serif">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>3000 BCE - Present</span>
                </div>
                <div className="flex items-center">
                  <Scroll className="h-4 w-4 mr-2" />
                  <span>50+ Cultural Milestones</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newspaper Columns Layout */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-6 rounded-lg border-2 border-amber-200 dark:border-amber-700 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3 font-serif border-b-2 border-amber-300 pb-2">
                ANCIENT CIVILIZATIONS
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed font-serif">
                From the Indus Valley's sophisticated urban planning to the cave paintings of Ajanta, 
                witness the birth of artistic expression in the subcontinent.
              </p>
              <div className="mt-4 text-xs text-amber-600 dark:text-amber-400 font-serif italic">
                "The foundations of creativity laid in stone and pigment"
              </div>
            </div>

            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-6 rounded-lg border-2 border-amber-200 dark:border-amber-700 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3 font-serif border-b-2 border-amber-300 pb-2">
                MEDIEVAL RENAISSANCE
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed font-serif">
                The golden age of temple architecture, classical dance forms, and courtly arts 
                flourished under various dynasties across the region.
              </p>
              <div className="mt-4 text-xs text-amber-600 dark:text-amber-400 font-serif italic">
                "When kings and artists danced together in harmony"
              </div>
            </div>

            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-6 rounded-lg border-2 border-amber-200 dark:border-amber-700 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3 font-serif border-b-2 border-amber-300 pb-2">
                MODERN REVIVAL
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed font-serif">
                Contemporary artists breathing new life into traditional forms, 
                creating a bridge between ancient wisdom and modern expression.
              </p>
              <div className="mt-4 text-xs text-amber-600 dark:text-amber-400 font-serif italic">
                "Tradition meets innovation in perfect symphony"
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link to="/timeline">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white text-lg px-8 py-4 shadow-xl border-2 border-amber-600 font-serif">
                Read the Full Chronicle
                <Scroll className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Newspaper Footer */}
          <div className="mt-12 text-center border-t-2 border-amber-300 dark:border-amber-700 pt-6">
            <div className="text-xs text-amber-600 dark:text-amber-400 font-serif">
              Published by The Heritage Chronicle Society • Preserving India's Cultural Legacy Since Time Immemorial
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
