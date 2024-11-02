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

const data2 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// stackedbar chart would be good for the showing the funding sources per month

const GraphSection = () => {
  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        marginTop: '20px' // Optional, for better spacing around the entire container
    }}>
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
        <h2 style={{ color: "black", margin: '10px 0' }}>UV and PV Line Chart</h2>
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
        <h2 style={{ color: "black", marginTop: '30px' }}>StackedBar Chart</h2>
        <ResponsiveContainer>
        <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
  
      </div>
  
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
        <h2 style={{ color: "black", margin: '10px 0' }}>Fund</h2>
        <ResponsiveContainer>
        <BarChart
            width={500}
            height={300}
            data={data2}
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
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );  
};

export default GraphSection;
