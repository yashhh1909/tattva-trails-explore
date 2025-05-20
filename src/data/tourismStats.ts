
export interface TourismStat {
  year: number;
  month: string;
  state: string;
  visitors: number;
  culturalTourists: number; // Percentage of total visitors
  revenue: number; // In lakhs INR
  averageStay: number; // In days
}

export const tourismStats: TourismStat[] = [
  // Rajasthan 2024
  { year: 2024, month: 'January', state: 'Rajasthan', visitors: 280000, culturalTourists: 70, revenue: 560, averageStay: 4.2 },
  { year: 2024, month: 'February', state: 'Rajasthan', visitors: 260000, culturalTourists: 65, revenue: 520, averageStay: 4.0 },
  { year: 2024, month: 'March', state: 'Rajasthan', visitors: 210000, culturalTourists: 60, revenue: 420, averageStay: 3.8 },
  { year: 2024, month: 'April', state: 'Rajasthan', visitors: 150000, culturalTourists: 55, revenue: 300, averageStay: 3.5 },
  
  // Kerala 2024
  { year: 2024, month: 'January', state: 'Kerala', visitors: 220000, culturalTourists: 60, revenue: 440, averageStay: 5.1 },
  { year: 2024, month: 'February', state: 'Kerala', visitors: 200000, culturalTourists: 55, revenue: 400, averageStay: 5.0 },
  { year: 2024, month: 'March', state: 'Kerala', visitors: 180000, culturalTourists: 50, revenue: 360, averageStay: 4.8 },
  { year: 2024, month: 'April', state: 'Kerala', visitors: 160000, culturalTourists: 45, revenue: 320, averageStay: 4.6 },
  
  // Tamil Nadu 2024
  { year: 2024, month: 'January', state: 'Tamil Nadu', visitors: 350000, culturalTourists: 65, revenue: 700, averageStay: 4.0 },
  { year: 2024, month: 'February', state: 'Tamil Nadu', visitors: 320000, culturalTourists: 60, revenue: 640, averageStay: 3.8 },
  { year: 2024, month: 'March', state: 'Tamil Nadu', visitors: 290000, culturalTourists: 55, revenue: 580, averageStay: 3.6 },
  { year: 2024, month: 'April', state: 'Tamil Nadu', visitors: 250000, culturalTourists: 50, revenue: 500, averageStay: 3.4 },
  
  // Uttar Pradesh 2024
  { year: 2024, month: 'January', state: 'Uttar Pradesh', visitors: 400000, culturalTourists: 70, revenue: 800, averageStay: 3.5 },
  { year: 2024, month: 'February', state: 'Uttar Pradesh', visitors: 380000, culturalTourists: 65, revenue: 760, averageStay: 3.3 },
  { year: 2024, month: 'March', state: 'Uttar Pradesh', visitors: 350000, culturalTourists: 60, revenue: 700, averageStay: 3.1 },
  { year: 2024, month: 'April', state: 'Uttar Pradesh', visitors: 300000, culturalTourists: 55, revenue: 600, averageStay: 2.9 },
  
  // Gujarat 2024
  { year: 2024, month: 'January', state: 'Gujarat', visitors: 180000, culturalTourists: 55, revenue: 360, averageStay: 3.8 },
  { year: 2024, month: 'February', state: 'Gujarat', visitors: 170000, culturalTourists: 50, revenue: 340, averageStay: 3.6 },
  { year: 2024, month: 'March', state: 'Gujarat', visitors: 150000, culturalTourists: 45, revenue: 300, averageStay: 3.4 },
  { year: 2024, month: 'April', state: 'Gujarat', visitors: 120000, culturalTourists: 40, revenue: 240, averageStay: 3.2 },

  // 2023 Data for each state (December)
  { year: 2023, month: 'December', state: 'Rajasthan', visitors: 300000, culturalTourists: 75, revenue: 600, averageStay: 4.5 },
  { year: 2023, month: 'December', state: 'Kerala', visitors: 240000, culturalTourists: 65, revenue: 480, averageStay: 5.2 },
  { year: 2023, month: 'December', state: 'Tamil Nadu', visitors: 380000, culturalTourists: 70, revenue: 760, averageStay: 4.2 },
  { year: 2023, month: 'December', state: 'Uttar Pradesh', visitors: 420000, culturalTourists: 75, revenue: 840, averageStay: 3.7 },
  { year: 2023, month: 'December', state: 'Gujarat', visitors: 200000, culturalTourists: 60, revenue: 400, averageStay: 4.0 },
];

// Get yearly data by aggregating monthly data
export const getYearlyData = () => {
  const years = [...new Set(tourismStats.map(stat => stat.year))];
  const states = [...new Set(tourismStats.map(stat => stat.state))];
  
  const yearlyData = [];
  
  for (const year of years) {
    for (const state of states) {
      const stateYearData = tourismStats.filter(
        stat => stat.year === year && stat.state === state
      );
      
      if (stateYearData.length > 0) {
        const totalVisitors = stateYearData.reduce((sum, stat) => sum + stat.visitors, 0);
        const avgCulturalTourists = stateYearData.reduce((sum, stat) => sum + stat.culturalTourists, 0) / stateYearData.length;
        const totalRevenue = stateYearData.reduce((sum, stat) => sum + stat.revenue, 0);
        const avgStay = stateYearData.reduce((sum, stat) => sum + stat.averageStay, 0) / stateYearData.length;
        
        yearlyData.push({
          year,
          state,
          visitors: totalVisitors,
          culturalTourists: avgCulturalTourists,
          revenue: totalRevenue,
          averageStay: avgStay
        });
      }
    }
  }
  
  return yearlyData;
};
