
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const PageLayout = ({ children, fullWidth = false }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${fullWidth ? '' : 'container mx-auto px-4 py-8'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
