
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Home from "./pages/Home";
import ArtExplorer from "./pages/ArtExplorer";
import Trends from "./pages/Trends";
import KalaBot from "./pages/KalaBot";
import Timeline from "./pages/Timeline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="tattva-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/art-explorer" element={<ArtExplorer />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/kalabot" element={<KalaBot />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
