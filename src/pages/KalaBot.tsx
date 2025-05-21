
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, Mic, Volume2, User } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { artForms } from "@/data/artForms";
import { culturalHotspots } from "@/data/culturalHotspots";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const kalaBotDefaultAnswers = [
  {
    keywords: ["hello", "hi", "greetings", "namaste"],
    response: "Namaste! I'm KalaBot, your guide to India's rich cultural heritage. How can I help you discover the beauty of Indian arts and traditions today?",
  },
  {
    keywords: ["dance", "classical dance", "bharatanatyam", "kathak", "kuchipudi"],
    response: "India has 8 classical dance forms recognized by the Sangeet Natak Akademi: Bharatanatyam, Kathak, Kuchipudi, Odissi, Kathakali, Sattriya, Manipuri, and Mohiniyattam. Each has unique features, costumes, and regional significance. Would you like to know more about any specific dance form?",
  },
  {
    keywords: ["music", "classical music", "carnatic", "hindustani"],
    response: "Indian classical music has two major traditions: Hindustani (North Indian) and Carnatic (South Indian). Both have ancient origins and use ragas (melodic frameworks) and talas (rhythmic cycles). Hindustani music features instruments like the sitar and tabla, while Carnatic music uses the veena and mridangam.",
  },
  {
    keywords: ["painting", "art", "madhubani", "warli", "miniature"],
    response: "India has diverse traditional painting styles including Madhubani from Bihar, Warli from Maharashtra, Miniature paintings from Rajasthan, Pattachitra from Odisha, and Tanjore paintings from Tamil Nadu. Each style reflects regional stories, myths, and cultural aesthetics.",
  },
  {
    keywords: ["festival", "festivals", "celebration", "holi", "diwali"],
    response: "India celebrates numerous festivals throughout the year. Major ones include Diwali (Festival of Lights), Holi (Festival of Colors), Navratri, Durga Puja, Onam, Pongal, and Eid. Many regional festivals are also tied to specific art forms and cultural traditions.",
  },
  {
    keywords: ["textile", "fabric", "silk", "cotton", "weaving", "saree"],
    response: "India's textile traditions are renowned worldwide and include Banarasi silk from Varanasi, Kanjivaram from Tamil Nadu, Pashmina from Kashmir, Ikat from Odisha and Andhra Pradesh, and Bandhani tie-dye from Gujarat and Rajasthan. Each region has unique weaving techniques, motifs, and cultural significance.",
  },
  {
    keywords: ["travel", "visit", "tourism", "trip"],
    response: "The best time to visit India for cultural experiences depends on the region. Winter (October to March) is ideal for most cultural destinations. Many cultural festivals happen during this period. Would you like recommendations for specific regions or art forms to experience?",
  },
];

const KalaBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Namaste! I'm KalaBot, your AI guide to India's cultural heritage. How can I help you explore Indian art forms and traditions today?",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const generateResponse = (userMessage: string) => {
    // Convert to lowercase for easier matching
    const lowercaseInput = userMessage.toLowerCase();
    
    // Try to find a match in our predefined answers
    for (const item of kalaBotDefaultAnswers) {
      if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
        return item.response;
      }
    }
    
    // Check for art form names
    const matchedArtForm = artForms.find(art => 
      lowercaseInput.includes(art.name.toLowerCase())
    );
    
    if (matchedArtForm) {
      return `${matchedArtForm.name} is a ${matchedArtForm.category} from ${matchedArtForm.state}, ${matchedArtForm.region}. ${matchedArtForm.description}`;
    }
    
    // Check for place names
    const matchedPlace = culturalHotspots.find(spot => 
      lowercaseInput.includes(spot.name.toLowerCase())
    );
    
    if (matchedPlace) {
      return `${matchedPlace.name} in ${matchedPlace.state} is known for ${matchedPlace.artForms.join(', ')}. ${matchedPlace.description} The best time to visit is during ${matchedPlace.bestTimeToVisit.join(', ')}.`;
    }
    
    // Default fallback response
    return "I'm still learning about India's vast cultural heritage. Could you be more specific or ask about a particular art form, region, or cultural tradition?";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateResponse(userMessage.content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        console.error("Speech recognition error");
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert("Your browser doesn't support speech recognition. Please try typing instead.");
      setIsListening(false);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-IN';
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      // Try to find an Indian English voice
      const indianVoice = voices.find(voice => 
        voice.lang === 'en-IN' || voice.lang === 'hi-IN'
      );
      
      if (indianVoice) {
        speech.voice = indianVoice;
      }
      
      speech.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser doesn't support text-to-speech. Please read the message instead.");
    }
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6 space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-tattva-primary to-tattva-accent flex items-center justify-center text-white font-bold text-xl">
            K
          </div>
          <div>
            <h1 className="text-3xl font-rajdhani font-bold">KalaBot</h1>
            <p className="text-sm text-muted-foreground">Your AI guide to India's cultural heritage</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="chat" className="flex-1">Chat with KalaBot</TabsTrigger>
            <TabsTrigger value="suggestions" className="flex-1">Suggested Topics</TabsTrigger>
            <TabsTrigger value="about" className="flex-1">About KalaBot</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <Card className="mb-4">
              <CardContent className="p-6 h-[60vh] flex flex-col">
                <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[80%] items-start space-x-2 ${
                          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.role === "user"
                              ? "bg-tattva-secondary"
                              : "bg-tattva-primary"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-tattva-secondary text-tattva-dark"
                              : "bg-tattva-primary/20 dark:bg-tattva-primary/30"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          
                          {/* Show speak button for bot messages */}
                          {message.role === "bot" && (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="w-6 h-6 mt-2 opacity-60 hover:opacity-100"
                              onClick={() => speakMessage(message.content)}
                              disabled={isSpeaking}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="flex space-x-2 items-start">
                        <div className="w-8 h-8 rounded-full bg-tattva-primary flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="p-3 rounded-lg bg-tattva-primary/20 dark:bg-tattva-primary/30 flex items-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "600ms" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    className={`flex-shrink-0 ${isListening ? 'bg-red-100' : ''}`}
                    onClick={handleVoiceInput}
                    disabled={isListening}
                  >
                    <Mic className={`h-5 w-5 ${isListening ? 'text-red-500 animate-pulse' : ''}`} />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isListening ? "Listening..." : "Ask about Indian art, culture, or traditions..."}
                    className="flex-grow"
                    disabled={isListening}
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || isProcessing}>
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Popular Topics to Explore</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Tell me about classical dance forms of India",
                    "What are the major folk painting styles?",
                    "When is the best time to visit cultural festivals in India?",
                    "Tell me about textile traditions of India",
                    "What is the history of Madhubani painting?",
                    "Which are the underrated cultural hotspots?",
                    "Explain the difference between Carnatic and Hindustani music",
                    "What are the GI-tagged art forms of India?"
                  ].map((suggestion, i) => (
                    <Button 
                      key={i}
                      variant="outline" 
                      className="justify-start h-auto py-3 text-left"
                      onClick={() => {
                        setInput(suggestion);
                        setActiveTab("chat");
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">About KalaBot</h3>
                <p className="mb-4">
                  KalaBot is your intelligent guide to India's rich cultural heritage. Powered by AI and a vast knowledge base of Indian art forms, traditions, and cultural contexts, KalaBot helps you:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Discover traditional art forms across India's diverse regions</li>
                  <li>Learn about the history and significance of cultural practices</li>
                  <li>Get personalized recommendations for cultural experiences</li>
                  <li>Find information about festivals, artisans, and cultural hotspots</li>
                  <li>Plan a culturally immersive journey through India</li>
                </ul>
                <p>
                  KalaBot is constantly learning and expanding its knowledge to provide you with accurate and insightful information about India's artistic and cultural traditions.
                </p>
                <div className="mt-6 p-4 bg-tattva-primary/10 rounded-lg border border-tattva-primary/20">
                  <h4 className="font-semibold mb-2">Voice Features</h4>
                  <p>KalaBot supports voice input and audio responses. Click the microphone icon to speak your question, and use the speaker icon to hear KalaBot's responses.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default KalaBot;
