import React from 'react';
import { BarChart, Bar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, Legend } from 'recharts';

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
];

// stackedbar chart would be good for the showing the funding sources per month

const BarChart = () => {
  return (
      <div style={{ 
          width: '100%', 
          height: 800, 
          display: 'flex', 
          alignItems: 'center',
          flexDirection: 'column',
          border: '1px solid #ccc', // Adding a border
          padding: '20px', // Optional, for padding inside the div
          borderRadius: '10px', // Optional, for rounded corners
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Optional, for a subtle shadow
      }}>               
        <h2 style={{ color: "black", marginTop: '30px' }}>StackedBar Chart</h2>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
  );  
};

export default BarChart;
