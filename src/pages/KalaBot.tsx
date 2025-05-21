
import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Volume2, VolumeX, User, Bot, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample responses for the demo
const botResponses = [
  {
    prompt: "tell me about kathakali",
    response: "Kathakali is a classical dance form from Kerala in South India. It's known for its elaborate costumes, vibrant makeup, and expressive storytelling through hand gestures (mudras) and facial expressions (abhinaya). Kathakali performances typically depict stories from Hindu epics like the Mahabharata and Ramayana. The training is rigorous, often beginning at a young age, and dancers develop exceptional control over their facial muscles to convey a range of emotions. Traditional performances were often held through the night in temple courtyards, though modern shows are usually shorter. Would you like to know more about Kathakali's makeup, training, or famous performers?"
  },
  {
    prompt: "popular destinations in rajasthan",
    response: "Rajasthan offers some of India's most iconic cultural destinations! Jaipur, the 'Pink City,' features the stunning Amber Fort and City Palace. Udaipur, the 'City of Lakes,' is known for its romantic setting with the Lake Palace. Jodhpur's blue-painted old city is dominated by the imposing Mehrangarh Fort. Jaisalmer's golden sandstone fortress rises from the Thar Desert like a mirage. Don't miss Pushkar's sacred lake and temples, Bikaner's unusual Rat Temple, and Mount Abu's exquisite Dilwara Jain Temples. For wildlife enthusiasts, Ranthambore National Park offers tiger safaris. Each city showcases Rajasthan's rich heritage of palaces, handicrafts, and vibrant cultural traditions. Would you like recommendations for a specific city or advice on planning a Rajasthan itinerary?"
  },
  {
    prompt: "what is the best time to visit india",
    response: "The best time to visit India depends on the regions you plan to explore, as the climate varies significantly across this vast country. Generally, October to March is considered the ideal period for most of India, offering pleasant temperatures and minimal rainfall. For Northern India (Delhi, Agra, Rajasthan), October to March provides cool, dry weather perfect for sightseeing. Southern India (Kerala, Tamil Nadu) is best from November to February, avoiding the intense summer heat and monsoon season. The Himalayan regions (Ladakh, Himachal Pradesh) are most accessible from May to September when mountain passes are open. Beach destinations like Goa are most enjoyable from November to February. If you're interested in cultural festivals, plan around events like Diwali (October/November), Holi (March), or Pongal (January). Would you like specific recommendations based on particular regions or activities you're interested in?"
  }
];

// Suggested queries for the user
const suggestedQueries = [
  "Tell me about Kathakali dance",
  "What are popular destinations in Rajasthan?",
  "Best time to visit India",
  "Tell me about Indian classical music",
  "What are the major festivals of India?",
  "Recommend traditional dishes from South India"
];

const KalaBot = () => {
  const [messages, setMessages] = useState<Array<{type: string, content: string}>>([
    {type: 'bot', content: 'Namaste! I\'m KalaBot, your guide to India\'s cultural treasures. Ask me about art forms, destinations, festivals, or traditions!'}
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice input stopped",
        description: "Your voice input has been processed",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Listening...",
        description: "Speak now to ask your question",
      });
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        const randomQuery = suggestedQueries[Math.floor(Math.random() * suggestedQueries.length)];
        setInput(randomQuery);
        setIsRecording(false);
      }, 3000);
    }
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      toast({
        title: "Text-to-speech enabled",
        description: "KalaBot responses will be read aloud",
      });
    } else {
      toast({
        title: "Text-to-speech disabled",
        description: "KalaBot responses will be silent",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages([...messages, {type: 'user', content: userMessage}]);
    setInput('');
    setLoadingResponse(true);
    
    // Simulate API call
    setTimeout(() => {
      // Find a matching response or use a default one
      const matchedResponse = botResponses.find(item => 
        userMessage.toLowerCase().includes(item.prompt.toLowerCase())
      );
      
      const botMessage = matchedResponse 
        ? matchedResponse.response
        : "I don't have specific information about that yet, but I'm constantly learning! This question might be answered in our Art Explorer or Timeline sections, or you could check back later as I update my knowledge base.";
      
      setMessages(prev => [...prev, {type: 'bot', content: botMessage}]);
      setLoadingResponse(false);
      
      // Simulate text-to-speech if enabled
      if (isSpeaking) {
        toast({
          title: "Speaking response",
          description: "KalaBot is reading the answer aloud",
        });
      }
    }, 1500);
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  return (
    <PageLayout>
      <div className="flex flex-col h-[calc(100vh-14rem)]">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2 font-rajdhani">KalaBot - Your Cultural Guide</h1>
          <p className="text-muted-foreground">
            Ask me anything about India's art, culture, destinations, and traditions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Left sidebar with information tabs on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="h-full border border-border">
              <Tabs defaultValue="about">
                <TabsList className="w-full">
                  <TabsTrigger value="about" className="w-1/3">About</TabsTrigger>
                  <TabsTrigger value="help" className="w-1/3">Help</TabsTrigger>
                  <TabsTrigger value="features" className="w-1/3">Features</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="px-4 py-4 space-y-2">
                  <h3 className="font-bold font-rajdhani">What is KalaBot?</h3>
                  <p className="text-sm text-muted-foreground">
                    KalaBot is your AI guide to India's cultural heritage. It can answer questions about:
                  </p>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>Traditional art forms and handicrafts</li>
                    <li>Music, dance, and theater traditions</li>
                    <li>Cultural destinations and landmarks</li>
                    <li>Festivals, cuisines, and local customs</li>
                    <li>Historical context and significance</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="help" className="px-4 py-4">
                  <h3 className="font-bold font-rajdhani">How to use KalaBot</h3>
                  <ul className="text-sm space-y-2 mt-2">
                    <li className="flex items-start gap-2">
                      <Send className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Type your question and hit enter or click send</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mic className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Click the microphone icon to use voice input</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Volume2 className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Toggle text-to-speech to hear responses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <PlusCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>Click suggested queries below the chat for quick access</span>
                    </li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="features" className="px-4 py-4">
                  <h3 className="font-bold font-rajdhani">KalaBot Features</h3>
                  <div className="space-y-3 mt-2">
                    <div className="text-sm border border-border p-2 rounded-md">
                      <div className="font-medium">🗣️ Voice Interaction</div>
                      <p className="text-muted-foreground text-xs">Ask questions using your voice and hear responses</p>
                    </div>
                    <div className="text-sm border border-border p-2 rounded-md">
                      <div className="font-medium">🧠 Cultural Knowledge</div>
                      <p className="text-muted-foreground text-xs">Detailed information about 100+ Indian art forms</p>
                    </div>
                    <div className="text-sm border border-border p-2 rounded-md">
                      <div className="font-medium">🗺️ Travel Planning</div>
                      <p className="text-muted-foreground text-xs">Get recommendations for cultural itineraries</p>
                    </div>
                    <div className="text-sm border border-border p-2 rounded-md">
                      <div className="font-medium">📚 Continuous Learning</div>
                      <p className="text-muted-foreground text-xs">KalaBot is constantly expanding its knowledge</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Chat area */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <Card className="flex-grow overflow-hidden border border-border">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
                    >
                      {message.type === 'bot' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-accent text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div 
                        className={`max-w-[80%] rounded-2xl p-3 ${
                          message.type === 'user' 
                            ? 'bg-tattva-primary text-white rounded-tr-none' 
                            : 'bg-muted rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {message.type === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-white">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {loadingResponse && (
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-accent text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="max-w-[80%] bg-muted rounded-2xl rounded-tl-none p-4">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
                
                <Separator />
                
                {/* Suggested queries */}
                <div className="px-4 py-2 flex flex-wrap gap-2 bg-muted/30">
                  {suggestedQueries.slice(0, 3).map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuery(query)}
                      className="text-xs px-3 py-1 bg-card hover:bg-primary/10 rounded-full border border-border transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
                
                {/* Input area */}
                <div className="p-3 bg-card">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={toggleSpeech}
                      className="flex-shrink-0"
                    >
                      {isSpeaking ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                    </Button>
                    
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask KalaBot about Indian culture..."
                      ref={inputRef}
                      className="flex-grow focus-visible:ring-tattva-accent"
                    />
                    
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={toggleRecording}
                      className={`flex-shrink-0 ${isRecording ? 'text-red-500' : ''}`}
                    >
                      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    
                    <Button 
                      type="submit" 
                      size="icon"
                      variant="default"
                      className="flex-shrink-0 bg-tattva-accent hover:bg-tattva-accent/90"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default KalaBot;
