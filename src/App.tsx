
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import ArtExplorer from "./pages/ArtExplorer";
import CulturalMap from "./pages/CulturalMap";
import Trends from "./pages/Trends";
import KalaBot from "./pages/KalaBot";
import Timeline from "./pages/Timeline";
import SupportLocal from "./pages/SupportLocal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art-explorer" element={<ArtExplorer />} />
          <Route path="/cultural-map" element={<CulturalMap />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/kalabot" element={<KalaBot />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/support-local" element={<SupportLocal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
