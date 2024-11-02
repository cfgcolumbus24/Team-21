import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'January', patients: 400, discharges: 120, intakes: 80, assets: 1000, donors: 150, revenue: 500 },
  { name: 'February', patients: 300, discharges: 110, intakes: 90, assets: 1050, donors: 120, revenue: 450 },
  { name: 'March', patients: 500, discharges: 130, intakes: 85, assets: 1100, donors: 200, revenue: 600 },
  { name: 'April', patients: 450, discharges: 125, intakes: 88, assets: 1150, donors: 180, revenue: 550 },
  { name: 'May', patients: 480, discharges: 135, intakes: 92, assets: 1200, donors: 160, revenue: 580 },
  { name: 'June', patients: 470, discharges: 140, intakes: 95, assets: 1250, donors: 170, revenue: 610 },
  { name: 'July', patients: 460, discharges: 115, intakes: 75, assets: 1300, donors: 165, revenue: 620 },
  { name: 'August', patients: 430, discharges: 118, intakes: 82, assets: 1350, donors: 158, revenue: 590 },
  { name: 'September', patients: 410, discharges: 112, intakes: 79, assets: 1400, donors: 175, revenue: 570 },
  { name: 'October', patients: 420, discharges: 123, intakes: 84, assets: 1450, donors: 182, revenue: 560 },
  { name: 'November', patients: 450, discharges: 120, intakes: 86, assets: 1500, donors: 190, revenue: 600 },
  { name: 'December', patients: 500, discharges: 130, intakes: 90, assets: 1550, donors: 200, revenue: 630 }
];

const MyStackedBarChart = () => {
  return (
      <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          flexDirection: 'column',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>               
        <h2 style={{ color: "black", marginTop: '10px' }}></h2>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="patients" stackId="a" fill="#8884d8" />
          <Bar dataKey="discharges" stackId="a" fill="#82ca9d" />
          <Bar dataKey="intakes" stackId="a" fill="#ffc658" />
          <Bar dataKey="assets" stackId="a" fill="#00C49F" />
          <Bar dataKey="donors" stackId="a" fill="#0088FE" />
          <Bar dataKey="revenue" stackId="a" fill="#FFBB28" />
        </BarChart>
        </ResponsiveContainer>
      </div>
  );  
};

export default MyStackedBarChart;
