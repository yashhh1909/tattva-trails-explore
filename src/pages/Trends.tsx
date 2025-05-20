
import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tourismStats, getYearlyData } from "@/data/tourismStats";
import { culturalHotspots } from "@/data/culturalHotspots";
import { ArrowUpRight, TrendingUp, TrendingDown, Users, MapPin, DollarSign } from "lucide-react";

const Trends = () => {
  const [selectedState, setSelectedState] = useState<string>("All States");
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

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">Tourism Trends Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Analyze visitor data, identify patterns, and discover under-visited cultural gems
        </p>
      </div>

      {/* State Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">Select State:</label>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            {states.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
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

        <Card>
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

        <Card>
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
      </div>

      <Tabs defaultValue="seasonal" className="w-full">
        <TabsList className="w-full mb-6 sm:w-auto">
          <TabsTrigger value="seasonal">Seasonal Trends</TabsTrigger>
          <TabsTrigger value="comparative">State Comparison</TabsTrigger>
          <TabsTrigger value="hidden">Under-visited Gems</TabsTrigger>
        </TabsList>

        {/* Seasonal Trends Tab */}
        <TabsContent value="seasonal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Monthly Visitor Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={seasonalData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tickFormatter={(value) => value.substring(0, 3)} />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => [value.toLocaleString(), "Visitors"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Bar 
                        dataKey="visitors" 
                        fill="hsl(var(--primary))" 
                        name="Total Visitors" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  {selectedState === "All States" 
                    ? "Winter (October to February) shows the highest tourism activity across India."
                    : `${selectedState} sees peak tourism during specific months, reflecting seasonal demand patterns.`
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Cultural Tourism Percentage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={seasonalData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" tickFormatter={(value) => value.substring(0, 3)} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip 
                        formatter={(value: number) => [`${value.toFixed(1)}%`, "Cultural Tourism"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="culturalPercentage" 
                        stroke="hsl(var(--accent))" 
                        name="Cultural Tourism %" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  The percentage of visitors interested in cultural experiences tends to be highest during festival seasons.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparative Analysis Tab */}
        <TabsContent value="comparative">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Tourism Comparison by State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={yearlyData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="state" 
                        type="category" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip formatter={(value: number) => [value.toLocaleString(), "Visitors"]} />
                      <Legend />
                      <Bar 
                        dataKey="visitors" 
                        fill="hsl(var(--primary))" 
                        name="Total Visitors" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Uttar Pradesh and Tamil Nadu lead in cultural tourism, largely due to their rich heritage sites and religious landmarks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-rajdhani">Cultural Tourism Percentage by State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="state" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Cultural Tourism %"]} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="culturalTourists" 
                        fill="hsl(var(--accent))" 
                        stroke="hsl(var(--accent))" 
                        fillOpacity={0.3}
                        name="Cultural Tourism %"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Rajasthan and Uttar Pradesh have the highest percentage of tourists specifically interested in cultural experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Under-visited Gems Tab */}
        <TabsContent value="hidden">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-rajdhani">Under-visited Cultural Gems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {undervisitedHotspots.map((hotspot) => (
                  <Card key={hotspot.id} className="border-l-4 border-l-accent">
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
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-2">
                        {hotspot.description}
                      </p>
                      
                      <div className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Key art forms:</span>{" "}
                        {hotspot.artForms.slice(0, 3).join(", ")}
                        {hotspot.artForms.length > 3 && "..."}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 bg-accent/10 p-4 rounded-lg">
                <h3 className="text-base font-medium mb-2 font-rajdhani">Why Promote Under-visited Destinations?</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Reduces overtourism at popular sites</li>
                  <li>Provides economic opportunities to local communities</li>
                  <li>Preserves unique cultural traditions</li>
                  <li>Offers authentic experiences for travelers</li>
                  <li>Promotes sustainable tourism development</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Trends;
