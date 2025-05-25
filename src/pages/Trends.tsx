
import React, { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tourismStats } from "@/data/tourismStats";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Users, MapPin, Calendar, BarChart3, LineChart as LineChartIcon, PieChartIcon, Newspaper } from "lucide-react";

const Trends = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedChart, setSelectedChart] = useState<'bar' | 'line' | 'pie'>('bar');
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const years = [...new Set(tourismStats.map(stat => stat.year))].sort((a, b) => b - a);
  const selectedData = tourismStats.filter(stat => stat.year === selectedYear);
  
  const totalVisitors = selectedData.reduce((sum, stat) => sum + stat.visitors, 0);
  const avgCulturalTourists = selectedData.reduce((sum, stat) => sum + stat.culturalTourists, 0) / selectedData.length;
  
  const chartColors = ['#E46F44', '#F5D547', '#2E7D83', '#8B4513', '#FF6B35'];

  const formatVisitors = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const insightData = [
    {
      title: "Heritage Tourism Boom",
      description: "Traditional art destinations seeing 45% growth in cultural tourism",
      trend: "up",
      icon: TrendingUp,
      value: "+45%"
    },
    {
      title: "Digital Art Integration", 
      description: "Modern technology enhancing traditional art experiences",
      trend: "up",
      icon: Users,
      value: "+32%"
    },
    {
      title: "Rural Art Revival",
      description: "Increased interest in village-based authentic art forms",
      trend: "up", 
      icon: MapPin,
      value: "+28%"
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Vintage Newspaper-style Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-4 border-amber-200 dark:border-amber-800"></div>
          <div className="relative p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Newspaper className="h-10 w-10 text-amber-700 mr-3" />
              <div className="text-xs font-bold text-amber-700 tracking-widest">EST. 2024 • CULTURAL EDITION</div>
            </div>
            <h1 className="text-6xl font-black mb-2 font-serif text-amber-900 dark:text-amber-100 leading-tight">
              THE CULTURAL HERALD
            </h1>
            <div className="w-full h-1 bg-amber-700 mb-4"></div>
            <p className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2">
              Tourism & Heritage Analytics
            </p>
            <p className="text-lg text-amber-700 dark:text-amber-300 max-w-4xl mx-auto font-medium">
              Comprehensive analysis of India's cultural tourism patterns, heritage site statistics, 
              and emerging trends in traditional art appreciation
            </p>
            <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-amber-600 dark:text-amber-400">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Updated {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{totalVisitors.toLocaleString()} Annual Visitors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vintage Controls Panel */}
        <div className="mb-8">
          <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-900 dark:text-amber-100">
                <BarChart3 className="h-5 w-5 mr-2" />
                Data Controls & Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Year:</span>
                  {years.map(year => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedYear(year)}
                      className={selectedYear === year ? "bg-amber-700 text-white" : "border-amber-300 text-amber-700 hover:bg-amber-100"}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={selectedChart === 'bar' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedChart('bar')}
                    className={selectedChart === 'bar' ? "bg-amber-700" : "border-amber-300 text-amber-700"}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={selectedChart === 'line' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedChart('line')}
                    className={selectedChart === 'line' ? "bg-amber-700" : "border-amber-300 text-amber-700"}
                  >
                    <LineChartIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={selectedChart === 'pie' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedChart('pie')}
                    className={selectedChart === 'pie' ? "bg-amber-700" : "border-amber-300 text-amber-700"}
                  >
                    <PieChartIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vintage Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {insightData.map((insight, index) => (
            <Card key={insight.title} className={`border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 transform transition-all duration-700 ${animatedStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${index * 150}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <insight.icon className="h-8 w-8 text-amber-700" />
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    {insight.value}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">{insight.title}</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Chart Section */}
        <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/10">
          <CardHeader>
            <CardTitle className="text-amber-900 dark:text-amber-100 text-xl">
              Cultural Tourism Statistics - {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {selectedChart === 'bar' && (
                  <BarChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d97706" opacity={0.3} />
                    <XAxis dataKey="state" stroke="#92400e" fontSize={12} />
                    <YAxis stroke="#92400e" fontSize={12} tickFormatter={formatVisitors} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fef3c7', 
                        border: '2px solid #d97706',
                        borderRadius: '8px',
                        color: '#92400e'
                      }}
                      formatter={(value: number) => [formatVisitors(value), 'Visitors']}
                    />
                    <Bar dataKey="visitors" fill="#d97706" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
                
                {selectedChart === 'line' && (
                  <LineChart data={selectedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d97706" opacity={0.3} />
                    <XAxis dataKey="state" stroke="#92400e" fontSize={12} />
                    <YAxis stroke="#92400e" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fef3c7', 
                        border: '2px solid #d97706',
                        borderRadius: '8px',
                        color: '#92400e'
                      }}
                    />
                    <Line type="monotone" dataKey="culturalTourists" stroke="#d97706" strokeWidth={3} dot={{ fill: '#d97706', strokeWidth: 2, r: 6 }} />
                  </LineChart>
                )}
                
                {selectedChart === 'pie' && (
                  <PieChart>
                    <Pie
                      data={selectedData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#d97706"
                      dataKey="visitors"
                      label={({ state, percent }) => `${state} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {selectedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fef3c7', 
                        border: '2px solid #d97706',
                        borderRadius: '8px',
                        color: '#92400e'
                      }}
                      formatter={(value: number) => [formatVisitors(value), 'Visitors']}
                    />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Vintage Footer Section */}
        <div className="mt-12 p-6 border-2 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg text-center">
          <div className="text-sm text-amber-700 dark:text-amber-300 font-medium">
            © {new Date().getFullYear()} The Cultural Herald • Data sourced from Ministry of Tourism, India
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">
            "Preserving Heritage, Tracking Progress, Inspiring Discovery"
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Trends;
