
import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { tourismStats, getYearlyData } from "@/data/tourismStats";
import { culturalHotspots } from "@/data/culturalHotspots";
import { ArrowUpRight, TrendingUp, TrendingDown, Users, MapPin, DollarSign, Plus, Info, HelpCircle } from "lucide-react";
import { Tooltip as TooltipUI } from "@/components/ui/tooltip";

const Trends = () => {
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [showInfoModal, setShowInfoModal] = useState<boolean>(true);
  const states = ["All States", ...new Set(tourismStats.map(stat => stat.state))];
  const yearlyData = getYearlyData();
  
  // Filter data based on selected state
  const filteredMonthlyData = selectedState === "All States" 
    ? tourismStats 
    : tourismStats.filter(stat => stat.state === selectedState);
  
  const filteredYearlyData = selectedState === "All States" 
    ? yearlyData 
    : yearlyData.filter(stat => stat.state === selectedState);
  
  // Calculate metrics
  const totalVisitors = filteredMonthlyData.reduce((sum, stat) => sum + stat.visitors, 0);
  const averageCulturalTourists = filteredMonthlyData.reduce((sum, stat) => sum + stat.culturalTourists, 0) / filteredMonthlyData.length;
  const totalRevenue = filteredMonthlyData.reduce((sum, stat) => sum + stat.revenue, 0);
  const growthRate = 12.5; // Sample growth rate
  
  // Get undervisited locations
  const undervisitedHotspots = culturalHotspots
    .filter(spot => spot.isUnderVisited)
    .sort((a, b) => a.popularityRating - b.popularityRating);

  // Format revenue for display
  const formatRevenue = (revenue: number) => {
    return `₹${revenue} lakhs`;
  };

  // Convert month number to name
  const getMonthName = (monthNum: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthNum - 1];
  };

  // Prepare seasonal data
  const prepareSeasionalData = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return months.map(month => {
      const monthData = filteredMonthlyData.filter(stat => stat.month === month);
      const totalMonthVisitors = monthData.reduce((sum, stat) => sum + stat.visitors, 0);
      const avgCultural = monthData.length ? monthData.reduce((sum, stat) => sum + stat.culturalTourists, 0) / monthData.length : 0;
      
      return {
        month,
        visitors: totalMonthVisitors || 0,
        culturalPercentage: avgCultural || 0
      };
    });
  };

  const seasonalData = prepareSeasionalData();

  // Prepare pie chart data
  const visitorTypesData = [
    { name: "Cultural Tourism", value: averageCulturalTourists },
    { name: "Adventure Tourism", value: 25 },
    { name: "Beach Tourism", value: 20 },
    { name: "Wildlife Tourism", value: 15 },
    { name: "Religious Tourism", value: 30 },
  ];
  
  const VISITOR_COLORS = ["#E46F44", "#F7D36F", "#297F87", "#594236", "#F8F4E3"];

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani flex items-center">
          Tourism Insights Dashboard
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 rounded-full" 
            onClick={() => setShowInfoModal(!showInfoModal)}
          >
            <Info size={18} className="text-muted-foreground" />
          </Button>
        </h1>
        <p className="text-muted-foreground">
          Analyze visitor data, identify patterns, and discover cultural tourism trends across India
        </p>
      </div>

      {/* Info alert to explain the dashboard */}
      {showInfoModal && (
        <Alert className="mb-6 border-tattva-primary/30 bg-tattva-primary/10">
          <AlertTitle className="flex items-center">
            <Info className="h-4 w-4 mr-2" /> How to use this dashboard
          </AlertTitle>
          <AlertDescription className="text-sm mt-1">
            <p className="mb-2">This dashboard helps you understand tourism trends across India's cultural landscape.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the <strong>Region selector</strong> to filter data for specific states</li>
              <li>The <strong>Seasonal Trends</strong> tab shows visitor patterns throughout the year</li>
              <li>The <strong>State Comparison</strong> tab compares tourism across different states</li>
              <li>The <strong>Visitor Types</strong> tab breaks down different categories of tourists</li>
              <li>The <strong>Hidden Gems</strong> tab highlights under-visited cultural sites</li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3" 
              onClick={() => setShowInfoModal(false)}
            >
              Got it
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* State Selector with Badges */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Region:</label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full md:w-64 border-border bg-card">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="hidden md:flex flex-wrap gap-2 items-center">
          <Badge variant="outline" className="bg-tattva-primary/10 hover:bg-tattva-primary/20 cursor-pointer" onClick={() => setSelectedState("Rajasthan")}>
            Rajasthan
          </Badge>
          <Badge variant="outline" className="bg-tattva-accent/10 hover:bg-tattva-accent/20 cursor-pointer" onClick={() => setSelectedState("Kerala")}>
            Kerala
          </Badge>
          <Badge variant="outline" className="bg-tattva-secondary/10 hover:bg-tattva-secondary/20 cursor-pointer" onClick={() => setSelectedState("Tamil Nadu")}>
            Tamil Nadu
          </Badge>
          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 cursor-pointer" onClick={() => setSelectedState("All States")}>
            Reset
          </Badge>
        </div>
      </div>

      {/* Stats Cards - More interactive with hover effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-border bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {totalVisitors.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  across {selectedState === "All States" ? "all states" : selectedState}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Cultural Tourism %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {averageCulturalTourists.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  travelers seeking cultural experiences
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-tattva-dark" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {formatRevenue(totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  from cultural tourism
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Annual Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-tattva-primary">
                  +{growthRate}%
                </div>
                <p className="text-xs text-muted-foreground">
                  year-over-year increase
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-tattva-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-tattva-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="seasonal" className="w-full">
        <TabsList className="w-full mb-6 sm:w-auto bg-muted/50">
          <TabsTrigger value="seasonal">Seasonal Trends</TabsTrigger>
          <TabsTrigger value="comparative">State Comparison</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Types</TabsTrigger>
          <TabsTrigger value="hidden">Hidden Gems</TabsTrigger>
        </TabsList>

        {/* Seasonal Trends Tab - Enhanced with better descriptions and 3D effects */}
        <TabsContent value="seasonal">
          <div className="mb-4">
            <Alert className="bg-card/70">
              <AlertDescription className="text-sm flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-tattva-primary" />
                <span>This section shows how tourism changes throughout the year. You can see peak seasons and when cultural tourism is most popular.</span>
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani flex items-center">
                  <span>Monthly Visitor Distribution</span>
                  <Badge variant="outline" className="ml-2 bg-tattva-primary/10">2025</Badge>
                </CardTitle>
                <CardDescription>Tourism fluctuations across different months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={seasonalData} className="animate-enter">
                      <defs>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E46F44" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#E46F44" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tickFormatter={(value) => value.substring(0, 3)} />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value.toLocaleString(), "Visitors"]}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="visitors" 
                        fill="url(#colorVisitors)" 
                        name="Total Visitors" 
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted/30 rounded-md">
                  <strong>Key Insight:</strong> {selectedState === "All States" 
                    ? "Winter (October to February) shows the highest tourism activity across India. This is when most festivals occur and the weather is moderate."
                    : `${selectedState} sees peak tourism during specific months, reflecting seasonal demand patterns and regional festivals.`
                  }
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Cultural Tourism Percentage</CardTitle>
                <CardDescription>Interest in cultural experiences throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={seasonalData} className="animate-enter">
                      <defs>
                        <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#297F87" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#297F87" stopOpacity={0.2}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tickFormatter={(value) => value.substring(0, 3)} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(1)}%`, "Cultural Tourism"]}
                        labelFormatter={(label) => `Month: ${label}`}
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="culturalPercentage" 
                        stroke="#297F87" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPercentage)"
                        name="Cultural Tourism %" 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted/30 rounded-md">
                  <strong>Key Insight:</strong> The percentage of visitors interested in cultural experiences tends to be highest during festival seasons like Diwali (October/November) and regional celebrations.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparative Analysis Tab - Improved with better explanations */}
        <TabsContent value="comparative">
          <div className="mb-4">
            <Alert className="bg-card/70">
              <AlertDescription className="text-sm flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-tattva-primary" />
                <span>This section compares tourism statistics between different Indian states, helping identify which regions attract the most cultural tourism.</span>
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card className="border-border bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Tourism Comparison by State</CardTitle>
                <CardDescription>Total visitor distribution across different states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={yearlyData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                      className="animate-enter"
                    >
                      <defs>
                        <linearGradient id="colorStates" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="5%" stopColor="#E46F44" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#F7D36F" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="state" 
                        type="category" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        formatter={(value: number) => [value.toLocaleString(), "Visitors"]} 
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="visitors" 
                        fill="url(#colorStates)" 
                        name="Total Visitors" 
                        radius={[0, 4, 4, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted/30 rounded-md">
                  <strong>Key Insight:</strong> Uttar Pradesh and Tamil Nadu lead in cultural tourism, largely due to their rich heritage sites like the Taj Mahal and UNESCO-recognized temples. Rajasthan follows closely with its forts, palaces and vibrant folk culture.
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Cultural Tourism Percentage by State</CardTitle>
                <CardDescription>Distribution of cultural interest across states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yearlyData} className="animate-enter">
                      <defs>
                        <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#297F87" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#297F87" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="state" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(1)}%`, "Cultural Tourism %"]}
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="culturalTourists" 
                        fill="url(#colorArea)" 
                        stroke="#297F87" 
                        fillOpacity={1}
                        name="Cultural Tourism %"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted/30 rounded-md">
                  <strong>Key Insight:</strong> Rajasthan and Uttar Pradesh have the highest percentage of tourists specifically interested in cultural experiences. This is due to their iconic landmarks, living heritage traditions, and well-preserved historical sites.
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Visitor Types Tab - Enhanced with better explanations */}
        <TabsContent value="visitors">
          <div className="mb-4">
            <Alert className="bg-card/70">
              <AlertDescription className="text-sm flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-tattva-primary" />
                <span>This section breaks down tourism into categories and shows which types are growing fastest. Cultural tourism is just one part of India's diverse tourism industry.</span>
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Tourism Categories</CardTitle>
                <CardDescription>Breakdown of visitor interests and focus areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart className="animate-enter">
                      <Pie
                        data={visitorTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={1500}
                      >
                        {visitorTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={VISITOR_COLORS[index % VISITOR_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(1)}%`, "Percentage"]}
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground mt-4 p-3 bg-muted/30 rounded-md">
                  <strong>Key Insight:</strong> Cultural and religious tourism represent the largest segments of India's tourism industry, accounting for over 50% of all visitors. This reflects the country's rich heritage and spiritual significance.
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Cultural Visitor Growth</CardTitle>
                <CardDescription>Year-over-year increase in cultural tourism</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">International Visitors</span>
                      <Badge variant="outline" className="bg-tattva-primary/10">+18.4%</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-tattva-primary to-tattva-secondary origin-left animate-grow" 
                        style={{ width: "18.4%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Domestic Cultural Tourists</span>
                      <Badge variant="outline" className="bg-tattva-primary/10">+24.7%</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-tattva-primary to-tattva-secondary origin-left animate-grow" 
                        style={{ width: "24.7%", animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Festival Attendance</span>
                      <Badge variant="outline" className="bg-tattva-primary/10">+31.2%</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-tattva-primary to-tattva-secondary origin-left animate-grow" 
                        style={{ width: "31.2%", animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Heritage Site Visitors</span>
                      <Badge variant="outline" className="bg-tattva-primary/10">+15.8%</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-tattva-primary to-tattva-secondary origin-left animate-grow" 
                        style={{ width: "15.8%", animationDelay: "0.6s" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Handicraft Workshops</span>
                      <Badge variant="outline" className="bg-tattva-primary/10">+22.3%</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-tattva-primary to-tattva-secondary origin-left animate-grow" 
                        style={{ width: "22.3%", animationDelay: "0.8s" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-md bg-muted/40 border border-border">
                  <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                    <li>Festival tourism shows the strongest growth post-pandemic</li>
                    <li>Domestic cultural tourism growing faster than international</li>
                    <li>Interactive experiences like workshops gaining popularity</li>
                    <li>Heritage site visits are growing but at a slower pace than experiential tourism</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Under-visited Gems Tab - Enhanced with better explanations */}
        <TabsContent value="hidden">
          <div className="mb-4">
            <Alert className="bg-card/70">
              <AlertDescription className="text-sm flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-tattva-primary" />
                <span>This section highlights cultural treasures that are currently under-visited but have significant cultural importance. These represent opportunities for cultural preservation and sustainable tourism.</span>
              </AlertDescription>
            </Alert>
          </div>
          
          <Card className="border-border bg-card/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-rajdhani">Under-visited Cultural Gems</CardTitle>
              <CardDescription>Hidden treasures with untapped tourism potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {undervisitedHotspots.map((hotspot) => (
                  <Card key={hotspot.id} className="border-l-4 border-l-accent bg-card/50 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium font-rajdhani">{hotspot.name}</h3>
                        <div className="flex items-center">
                          <TrendingDown className="h-4 w-4 text-accent mr-1" />
                          <span className="text-sm">{hotspot.popularityRating}/10</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="h-3 w-3 mr-1" /> {hotspot.state}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                        {hotspot.description}
                      </p>
                      
                      <div className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-1">
                        <span className="font-medium">Art forms: </span>
                        {hotspot.artForms.slice(0, 2).map((art, index) => (
                          <Badge key={index} variant="outline" className="bg-accent/10 text-[10px]">
                            {art}
                          </Badge>
                        ))}
                        {hotspot.artForms.length > 2 && (
                          <Badge variant="outline" className="bg-muted/30 text-[10px]">
                            <Plus className="h-2 w-2 mr-1" /> {hotspot.artForms.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg border border-border bg-muted/30">
                <h3 className="text-base font-medium mb-2 font-rajdhani">Why Promote Under-visited Destinations?</h3>
                <ul className="grid md:grid-cols-2 gap-x-6 gap-y-1 mt-3">
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-tattva-primary mr-2"></div>
                    <span>Reduces overtourism at popular sites</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-tattva-primary mr-2"></div>
                    <span>Provides economic opportunities to local communities</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-tattva-primary mr-2"></div>
                    <span>Preserves unique cultural traditions</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="h-2 w-2 rounded-full bg-tattva-primary mr-2"></div>
                    <span>Offers authentic experiences for travelers</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t border-border">
              <p className="text-sm text-muted-foreground">Supporting these under-visited sites helps preserve cultural diversity and creates sustainable tourism opportunities across India.</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Trends;
