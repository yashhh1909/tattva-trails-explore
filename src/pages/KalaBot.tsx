
import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, Bot, CircleStop } from "lucide-react";
import { artForms } from "@/data/artForms";

// Sample responses for the AhamAI chatbot
const sampleResponses = [
  {
    keywords: ["hello", "hi", "greetings", "hey"],
    response: "Namaste! I am AhamAI, your guide to India's cultural heritage. How may I assist you today?",
  },
  {
    keywords: ["who", "what", "you", "aham"],
    response: "I am AhamAI, an artificial intelligence designed to help you explore India's rich cultural tapestry. 'Aham' means 'I' or 'self' in Sanskrit, representing the deep connection between identity and cultural heritage.",
  },
  {
    keywords: ["art", "form", "traditional"],
    response: "India has over 100 traditional art forms across different regions. Would you like me to tell you about a specific art form or recommend one based on your interests?",
  },
  {
    keywords: ["dance", "classical", "bharatanatyam", "kathak"],
    response: "India has eight classical dance forms recognized by the Sangeet Natak Akademi: Bharatanatyam, Kathak, Kathakali, Mohiniyattam, Kuchipudi, Odissi, Manipuri, and Sattriya. Each has distinct techniques, costumes, and regional origins. Which one would you like to know more about?",
  },
];

// Define types for chat messages
interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
}

const KalaBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Namaste! I am AhamAI, your cultural guide to India's rich heritage. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [suggestionVisible, setSuggestionVisible] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggestions for users
  const suggestions = [
    "Tell me about Madhubani painting",
    "What is the history of Kathakali?",
    "Recommend cultural sites in Rajasthan",
    "How is Pattachitra art created?",
  ];

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to add a typing indicator
  const showTypingIndicator = () => {
    setIsBotTyping(true);
    setMessages((prev) => [
      ...prev,
      { text: "...", sender: "bot", timestamp: new Date(), isTyping: true },
    ]);
  };

  // Function to remove typing indicator
  const removeTypingIndicator = () => {
    setIsBotTyping(false);
    setMessages((prev) => prev.filter((msg) => !msg.isTyping));
  };

  // Handle user message submission
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Add typing indicator
    showTypingIndicator();

    // Remove suggestion after user sends first message
    setSuggestionVisible(false);

    // Generate bot response after a delay to simulate thinking
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      removeTypingIndicator();
      setMessages((prev) => [
        ...prev,
        { text: botResponse, sender: "bot", timestamp: new Date() },
      ]);
    }, Math.random() * 1000 + 1500); // Random delay between 1.5-2.5 seconds
  };

  // Generate response based on user input
  const generateResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for art form specific questions
    const matchedArtForm = artForms.find(
      (art) => lowercaseInput.includes(art.name.toLowerCase())
    );

    if (matchedArtForm) {
      return `${matchedArtForm.name} is a beautiful art form from ${matchedArtForm.state} in ${matchedArtForm.region} region. It falls under the category of ${matchedArtForm.category}. ${matchedArtForm.description}`;
    }

    // Check for keyword matches in sample responses
    for (const sample of sampleResponses) {
      for (const keyword of sample.keywords) {
        if (lowercaseInput.includes(keyword)) {
          return sample.response;
        }
      }
    }

    // Default response if no match found
    return "That's an interesting question about Indian culture! While I'm still learning about the vast cultural tapestry of India, I'd be happy to explore this topic with you. Would you like me to search for specific information about art forms, festivals, or historical sites?";
  };

  // Handle voice recording toggle
  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate starting voice recording
      setTimeout(() => {
        setInputValue("Tell me about cultural festivals in India");
      }, 1500);
    } else {
      // If we were recording and now stopping, send the message
      if (inputValue.trim()) {
        handleSendMessage();
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Wait a bit before sending the message for a more natural feel
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Add animation classes based on message sender
  const getMessageClasses = (sender: string): string => {
    if (sender === "user") {
      return "chat-message-user animate-enter"; 
    }
    return "chat-message-bot animate-enter";
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">AhamAI Cultural Assistant</h1>
        <p className="text-muted-foreground">
          Your intelligent guide to India's rich cultural heritage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chat area */}
        <Card className="col-span-1 lg:col-span-2 border-border shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-tattva-primary to-tattva-accent flex items-center justify-center text-white mr-2">
                <Bot size={18} />
              </div>
              <span>AhamAI Assistant</span>
              <span className="ml-2 text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                Online
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[500px] w-full p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.sender === "user" ? "flex justify-end" : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`${getMessageClasses(message.sender)} ${
                        message.isTyping ? "typing-animation" : ""
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 border-t border-border">
            {suggestionVisible && (
              <div className="w-full mb-4 flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="bg-tattva-primary/10 hover:bg-tattva-primary/20 text-sm px-3 py-1.5 rounded-full text-foreground transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div className="w-full flex items-center gap-2">
              <Input
                placeholder="Ask me about India's cultural heritage..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button
                size="icon"
                variant="ghost"
                className={`rounded-full ${isRecording ? "bg-red-500 text-white" : ""}`}
                onClick={handleVoiceToggle}
              >
                {isRecording ? <CircleStop size={18} /> : <Mic size={18} />}
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-tattva-primary hover:bg-tattva-primary/90"
                onClick={handleSendMessage}
              >
                <Send size={18} />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Information sidebar */}
        <Card className="border-border shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b border-border">
            <CardTitle>About AhamAI</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 font-rajdhani">What is AhamAI?</h3>
                <p className="text-sm text-muted-foreground">
                  AhamAI is your intelligent guide to India's rich cultural heritage. The name 'Aham' comes from Sanskrit, meaning 'I' or 'self', reflecting the personal connection to culture.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 font-rajdhani">How can AhamAI help?</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start">
                    <span className="text-tattva-primary mr-2">•</span>
                    <span>Learn about various Indian art forms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tattva-primary mr-2">•</span>
                    <span>Discover cultural festivals and celebrations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tattva-primary mr-2">•</span>
                    <span>Explore historical sites and their significance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-tattva-primary mr-2">•</span>
                    <span>Get personalized cultural travel recommendations</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-3 bg-tattva-primary/10 rounded-md border border-tattva-primary/20">
                <h3 className="text-sm font-semibold mb-1">Did you know?</h3>
                <p className="text-xs text-muted-foreground">
                  India has 40 UNESCO World Heritage Sites, including cultural masterpieces like the Taj Mahal, Ajanta Caves, and the temples of Khajuraho.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default KalaBot;
