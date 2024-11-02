import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';

const data = [
  { name: 'Caucasian', value: 400 },
  { name: 'African American', value: 300 },
  { name: 'Hispanic', value: 300 },
  { name: 'Asian', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MyPieChart = () => {
  const onPieEnter = (_, index) => {
    console.log(`Pie segment ${index} (${data[index].name}) was clicked.`);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', // Specifying a concrete height for responsiveness
      display: 'flex', 
      alignItems: 'center',
      flexDirection: 'column',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>               
      <h2 style={{ color: "black", marginTop: '10px' }}></h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="90%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onClick={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          <LabelList 
            dataKey="name" 
            position="outside" 
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', fill: 'black', fontWeight: 'bold' }} 
          />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );  
};

export default MyPieChart;
