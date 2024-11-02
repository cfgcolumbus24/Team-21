import React, { useState, useEffect } from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const generateData = () => {
  let basePatients = 1000; // Starting number of patients for January
  let baseAmount = 500;    // Starting amount for January
  return [
    { name: 'January', patients: basePatients, amt: baseAmount },
    { name: 'February', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'March', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'April', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'May', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'June', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'July', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'August', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'September', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'October', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'November', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
    { name: 'December', patients: basePatients += Math.floor(Math.random() * 1000), amt: baseAmount += Math.floor(Math.random() * 500) },
  ];
};


const LineGraph = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    // Dynamically update data every 5 seconds (as an example)
    const interval = setInterval(() => setData(generateData()), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center',
      flexDirection: 'column',
      border: '1px solid #ccc',
      padding: '0 20px 20px 20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>               
      <h2 style={{ color: "black", marginTop: '10px' }}></h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="patients" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );  
};

export default LineGraph;
