
import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Info, Sparkles, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { artForms } from "@/data/artForms";
import { culturalHotspots } from "@/data/culturalHotspots";

// Message types
type MessageType = "user" | "bot";

interface ChatMessage {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

// Predefined responses for simulating AI responses
const predefinedResponses: Record<string, string> = {
  "hello": "Namaste! I'm KalaBot, your guide to India's artistic and cultural heritage. How can I assist you today?",
  "hi": "Namaste! I'm KalaBot, your guide to India's artistic and cultural heritage. How can I assist you today?",
  "namaste": "Namaste! I'm delighted to connect with you. I can help you explore India's diverse art forms, recommend cultural destinations, or share information about traditional crafts.",
  "what is madhubani": "Madhubani painting (also known as Mithila painting) is a traditional art form from the Mithila region of Bihar. It features geometric patterns, mythological motifs, and natural imagery using natural dyes and pigments. Traditionally practiced by women, these paintings were originally created on freshly plastered mud walls of homes but are now done on paper, cloth, and canvas too. The art form dates back to the 12th century CE and received a GI (Geographical Indication) tag to preserve its cultural significance.",
  "tell me about bharatanatyam": "Bharatanatyam is one of India's oldest classical dance forms, originating in Tamil Nadu around 2000 years ago. This expressive dance form combines rhythmic footwork (nritta), hand gestures called mudras (hastas), and facial expressions (abhinaya) to tell stories, often from Hindu mythology. It was traditionally performed in temples by Devadasis (temple dancers) and has evolved over centuries. Today, it's performed worldwide and is known for its grace, precision, and spiritual essence. The dance follows principles from Natya Shastra, an ancient Sanskrit text on performing arts.",
  "what can you do": "As KalaBot, I can help you with: \n1. Information about various Indian art forms and crafts\n2. Recommendations for cultural destinations across India\n3. Details about festivals and cultural events\n4. Insights on traditional artisans and their work\n5. Understanding the historical context of Indian arts\n\nJust ask me anything related to India's cultural heritage!",
  "recommend places in rajasthan": "Rajasthan offers incredible cultural experiences! Here are my top recommendations:\n\n1. Jaipur - Visit the 'Pink City' for its vibrant art scene including blue pottery, block printing, and miniature paintings\n2. Udaipur - Known for its rich traditions of miniature painting and intricate metalwork\n3. Jaisalmer - Famous for its exquisite wood carvings, embroidery, and folk music\n4. Jodhpur - Explore the 'Blue City' and its traditions of tie-dye textiles and leather crafts\n5. Pushkar - Experience the famous camel fair and vibrant folk performances\n\nThe best time to visit is October to March when the weather is pleasant. Would you like more specific information about any of these places?",
  "what is the best time to visit kerala": "The best time to visit Kerala for cultural experiences is from September to March. During this period, you can witness many important cultural festivals:\n\n- Onam (August/September): Kerala's harvest festival featuring boat races, floral decorations, and traditional dance forms\n- Theyyam performances (October to May): Ritual dance worship with elaborate costumes in North Kerala\n- Kochi-Muziris Biennale (December to March): International contemporary art exhibition held every two years\n- Thrissur Pooram (April/May): Spectacular temple festival with decorated elephants and traditional percussion ensembles\n\nThe monsoon season (June to August) offers a unique experience with lush green landscapes, but some cultural sites may have limited access."
};

// Function to generate more complete responses for inputs not in predefined list
const generateResponse = (input: string): string => {
  // Convert input to lowercase for easier matching
  const lowerInput = input.toLowerCase();
  
  // Check for predefined responses first
  for (const key in predefinedResponses) {
    if (lowerInput.includes(key)) {
      return predefinedResponses[key];
    }
  }
  
  // Check for art forms
  for (const art of artForms) {
    if (lowerInput.includes(art.name.toLowerCase())) {
      return `${art.name} is a traditional ${art.category.toLowerCase()} from ${art.state} in the ${art.region} region of India. ${art.description} It originated around ${art.origin}. ${art.giTagged ? "It has received the prestigious Geographical Indication (GI) tag, which helps preserve its cultural authenticity." : ""}`;
    }
  }
  
  // Check for locations
  for (const spot of culturalHotspots) {
    if (lowerInput.includes(spot.name.toLowerCase())) {
      return `${spot.name} in ${spot.state} is a cultural hotspot ${spot.isUnderVisited ? "that's relatively undiscovered by mainstream tourism" : "popular with cultural tourists"}. ${spot.description} It's known for art forms like ${spot.artForms.join(", ")}. The best time to visit is during ${spot.bestTimeToVisit.join(", ")}.`;
    }
  }
  
  // Fallback generic responses
  if (lowerInput.includes("textile") || lowerInput.includes("fabric") || lowerInput.includes("weaving")) {
    return "India has a rich textile heritage that varies by region. Some notable traditions include Banarasi silk from Uttar Pradesh, Pashmina from Kashmir, Kanjivaram silk from Tamil Nadu, Chanderi from Madhya Pradesh, and Phulkari from Punjab. Each textile tradition reflects local cultural elements, techniques passed down through generations, and adaptations to regional climates.";
  }
  
  if (lowerInput.includes("dance") || lowerInput.includes("dancing")) {
    return "India has eight classical dance forms recognized by the Sangeet Natak Akademi: Bharatanatyam (Tamil Nadu), Kathakali (Kerala), Kathak (North India), Odissi (Odisha), Kuchipudi (Andhra Pradesh), Manipuri (Manipur), Mohiniyattam (Kerala), and Sattriya (Assam). Each has distinct techniques, costumes, and regional origins, but all communicate stories through elaborate footwork, hand gestures, and facial expressions.";
  }
  
  if (lowerInput.includes("festival") || lowerInput.includes("celebration")) {
    return "India celebrates countless festivals throughout the year! Some major cultural celebrations include Diwali (Festival of Lights), Holi (Festival of Colors), Durga Puja in Bengal, Onam in Kerala, Pongal in Tamil Nadu, and Navratri across many states. These festivals feature unique regional art forms, crafts, music, and dance traditions that showcase India's cultural diversity.";
  }
  
  // Very generic fallback
  return "That's an interesting question about Indian culture! While I don't have specific information on that particular topic, I'd be happy to help you explore India's diverse art forms, traditional crafts, cultural destinations, or festival traditions. Feel free to ask about specific regions, art forms, or cultural practices you're curious about.";
};

const KalaBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "bot",
      text: "Namaste! I'm KalaBot, your AI guide to India's cultural heritage. Ask me about traditional art forms, cultural destinations, festivals, or artisans across India!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      type: "user",
      text: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking and responding
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now().toString() + "-bot",
        type: "bot",
        text: generateResponse(input),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">KalaBot - AI Cultural Guide</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Chat with your AI assistant to explore India's cultural heritage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Panel */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-280px)] flex flex-col">
            <CardContent className="flex-grow flex flex-col p-0">
              {/* Message Display Area */}
              <div className="flex-grow overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] flex ${
                          message.type === "user" ? "flex-row-reverse" : ""
                        } items-start gap-2`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                          ${message.type === "user" 
                            ? "bg-tattva-primary text-white" 
                            : "bg-tattva-secondary text-tattva-dark"}`}
                        >
                          {message.type === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        
                        <div>
                          <div
                            className={message.type === "user" 
                              ? "chat-message-user" 
                              : "chat-message-bot"
                            }
                          >
                            {message.text.split('\n').map((line, i) => (
                              <p key={i} className={i > 0 ? "mt-2" : ""}>
                                {line}
                              </p>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 px-2">
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-tattva-secondary text-tattva-dark flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="chat-message-bot py-3 flex items-center space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={endOfMessagesRef} />
                </div>
              </div>
              
              {/* Message Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Indian art, culture or destinations..."
                    className="flex-grow"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!input.trim() || isTyping}
                    className="bg-tattva-primary hover:bg-tattva-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Info Panel */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3 font-rajdhani">What You Can Ask</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-tattva-primary" />
                    <span>About specific art forms like Madhubani or Bharatanatyam</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-tattva-primary" />
                    <span>Cultural destinations to visit in different states</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-tattva-primary" />
                    <span>Best seasons for cultural tourism</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-tattva-primary" />
                    <span>Traditional textiles and crafts</span>
                  </li>
                  <li className="flex items-start">
                    <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-tattva-primary" />
                    <span>History of art forms and cultural practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Demo Mode</AlertTitle>
              <AlertDescription>
                KalaBot is currently running in demo mode with limited responses. In a full implementation, it would connect to a full AI model.
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3 font-rajdhani">Pro Tips</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  For the best experience, ask specific questions about:
                </p>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li>Art forms by name or region</li>
                  <li>Cultural experiences in specific states</li>
                  <li>Traditional crafts and their techniques</li>
                  <li>Seasonal festivals and celebrations</li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Save Conversation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default KalaBot;
