import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'January',
    patients: 2400,
  },
  {
    name: 'February',
    patients: 1398,
  },
  {
    name: 'March',
    patients: 9800,
  },
  {
    name: 'April',
    patients: 3908,
  },
  {
    name: 'May',
    patients: 4800,
  },
  {
    name: 'June',
    patients: 3800,
  },
  {
    name: 'July',
    patients: 4300,
  },
  {
    name: 'August',
    patients: 3500,  // Example adjustment
  },
  {
    name: 'September',
    patients: 4600,  // Example adjustment
  },
  {
    name: 'October',
    patients: 4700,  // Example adjustment
  },
  {
    name: 'November',
    patients: 3200,  // Example adjustment
  },
  {
    name: 'December',
    patients: 4100,  // Example adjustment
  },
];




// stackedbar chart would be good for the showing the funding sources per month

const MyBarChart = () => {
  return (
      <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          flexDirection: 'column',
          border: '1px solid #ccc', // Adding a border
          padding: '20px', // Optional, for padding inside the div
          borderRadius: '10px', // Optional, for rounded corners
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Optional, for a subtle shadow
      }}>               
        <h2 style={{ color: "black", marginTop: '10px' }}></h2>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
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
          <Bar dataKey="patients" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </ResponsiveContainer>
      </div>
  );  
};

export default MyBarChart;
