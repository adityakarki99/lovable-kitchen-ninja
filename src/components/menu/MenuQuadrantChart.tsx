
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Legend, ReferenceArea } from 'recharts';
import { Star, Puzzle, Horse, Dog } from 'lucide-react';

// Mock data for menu items
const menuItems = [
  // Stars (High profit, High popularity)
  { name: 'Fish & Chips', popularity: 85, profitMargin: 72, category: 'star', price: '$16.50', cost: '$4.62', orders: 250 },
  { name: 'Ribeye Steak', popularity: 75, profitMargin: 68, category: 'star', price: '$32.00', cost: '$10.24', orders: 180 },
  { name: 'Shrimp Pasta', popularity: 68, profitMargin: 70, category: 'star', price: '$18.50', cost: '$5.55', orders: 150 },
  
  // Puzzles (High profit, Low popularity)
  { name: 'Wagyu Steak', popularity: 30, profitMargin: 65, category: 'puzzle', price: '$45.00', cost: '$15.75', orders: 50 },
  { name: 'Lobster Risotto', popularity: 25, profitMargin: 68, category: 'puzzle', price: '$29.50', cost: '$9.44', orders: 45 },
  
  // Plow Horses (Low profit, High popularity)
  { name: 'Margherita Pizza', popularity: 80, profitMargin: 45, category: 'plowHorse', price: '$14.00', cost: '$7.70', orders: 300 },
  { name: 'Burger & Fries', popularity: 78, profitMargin: 42, category: 'plowHorse', price: '$12.50', cost: '$7.25', orders: 290 },
  { name: 'Caesar Salad', popularity: 65, profitMargin: 40, category: 'plowHorse', price: '$10.00', cost: '$6.00', orders: 220 },
  
  // Dogs (Low profit, Low popularity)
  { name: 'Quinoa Salad', popularity: 20, profitMargin: 40, category: 'dog', price: '$12.00', cost: '$7.20', orders: 40 },
  { name: 'Vegetable Soup', popularity: 15, profitMargin: 35, category: 'dog', price: '$8.50', cost: '$5.52', orders: 30 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-kitchen-border rounded-md shadow-apple-sm">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-kitchen-muted-foreground">Price: {item.price}</p>
        <p className="text-sm text-kitchen-muted-foreground">Food Cost: {item.cost}</p>
        <p className="text-sm text-kitchen-muted-foreground">Profit Margin: {item.profitMargin}%</p>
        <p className="text-sm text-kitchen-muted-foreground">Popularity: {item.popularity}%</p>
        <p className="text-sm text-kitchen-muted-foreground">Weekly Orders: {item.orders}</p>
      </div>
    );
  }
  return null;
};

// Custom legend with icons from Lucide
const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <span className="text-xs">Stars</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-blue-500" />
        <span className="text-xs">Puzzles</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-xs">Plow Horses</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <span className="text-xs">Dogs</span>
      </div>
    </div>
  );
};

const MenuQuadrantChart: React.FC = () => {
  // Calculate median values for reference areas
  const medianPopularity = 50;
  const medianProfitMargin = 55;
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          type="number" 
          dataKey="popularity" 
          name="Popularity" 
          domain={[0, 100]} 
          label={{ value: 'Popularity (%)', position: 'bottom', offset: 0 }}
          tickCount={6}
        />
        <YAxis 
          type="number" 
          dataKey="profitMargin" 
          name="Profit Margin" 
          domain={[0, 100]} 
          label={{ value: 'Profit Margin (%)', angle: -90, position: 'insideLeft' }}
          tickCount={6}
        />
        <ZAxis range={[60, 400]} />
        
        {/* Reference areas for quadrants */}
        <ReferenceArea x1={0} x2={medianPopularity} y1={medianProfitMargin} y2={100} fill="#90cdf4" fillOpacity={0.15} />
        <ReferenceArea x1={medianPopularity} x2={100} y1={medianProfitMargin} y2={100} fill="#fbd38d" fillOpacity={0.15} />
        <ReferenceArea x1={0} x2={medianPopularity} y1={0} y2={medianProfitMargin} fill="#feb2b2" fillOpacity={0.15} />
        <ReferenceArea x1={medianPopularity} x2={100} y1={0} y2={medianProfitMargin} fill="#9ae6b4" fillOpacity={0.15} />
        
        <Tooltip content={<CustomTooltip />} />
        
        {/* Scatter plots for each category */}
        <Scatter 
          name="Stars" 
          data={menuItems.filter(item => item.category === 'star')} 
          fill="#F59E0B" 
          shape="circle" 
        />
        <Scatter 
          name="Puzzles" 
          data={menuItems.filter(item => item.category === 'puzzle')} 
          fill="#3B82F6" 
          shape="circle"
        />
        <Scatter 
          name="Plow Horses" 
          data={menuItems.filter(item => item.category === 'plowHorse')} 
          fill="#10B981" 
          shape="circle"
        />
        <Scatter 
          name="Dogs" 
          data={menuItems.filter(item => item.category === 'dog')} 
          fill="#EF4444" 
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MenuQuadrantChart;
