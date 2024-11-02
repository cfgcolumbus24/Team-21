import React, { useState } from 'react';
import MyBarChart from '../components/MyBarChart';
import LineGraph from '../components/LineGraph';
import MyPieChart from '../components/MyPieChart';
import MyStackedBarChart from './MyStackedBarChart';
import MetricCard from '../components/MetricCard';
import { ResponsiveContainer } from 'recharts';

const headerStyle = {
    color: "black",
    margin: '20px 0', // Increased margin for better visual separation
    fontSize: '20px', // Larger font size for better visibility
    fontWeight: 'bold', // Makes the text bold
    fontFamily: '"Roboto", sans-serif' // Apply Roboto font
};
// total patients per month as a bar graph
// total patients by month cumulative line graph
// revenue based on sources stacked bar graph
// demographic pie chart


const GraphSection = () => {
  return (
    <div>
    <h1 style={{ 
                color: 'black',           // Sets the text color
                fontSize: '36px',         // Sets the font size
                fontFamily: 'Roboto, sans-serif', // Sets the font family
                fontWeight: 700, // Sets the weight of the font
                margin: 20
            }}>
                Netcare Access Analytics
    </h1>

    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
    <MetricCard 
      color="#4caf50" // Green for positive health outcomes
      icon="🩺"
      amount="320"
      label="PATIENTS TREATED"
      change="🔺 8% Since last month"
    />
    {/* <button onClick={handleSearch}>HEYYYYYy</button> */}
    <MetricCard 
    color="#f44336" // Red for urgency and critical care
    icon="❤️"
    amount="95%"
    label="PATIENT SATISFACTION"
    change="🔺 5% Since last month"
/>

<MetricCard 
    color="#ff9800" // Orange for warmth and attention
    icon="📞"
    amount="40"
    label="CALL RESPONSE TIME"
    change="🔺 20% Since last month"
/>

<MetricCard 
    color="#2196f3" // Blue for trust and security
    icon="💲"
    amount="450"
    label="DONATIONS RECEIVED"
    change="🔺 15% Since last month"
/>

    </div>

    <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        marginTop: '10px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
          width: '100%', 
          height: 800, 
          display: 'flex', 
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: '10px',
          padding: '0 20px 20px 20px',
          backgroundColor: 'white'
          
      }}>       
        <h2 style={headerStyle}>Monthly Patient Volume</h2>
        <ResponsiveContainer>
          <MyBarChart/>
        </ResponsiveContainer>
        <h2 style={headerStyle}>Monthly Cumulative Patient Count</h2>
        <ResponsiveContainer>
          <LineGraph/>
        </ResponsiveContainer>
      </div>
  
      <div style={{ 
          width: '100%', 
          height: 800, 
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: '10px',
          padding: '0 20px 20px 20px',
          backgroundColor: 'white'
      }}>
        <h2 style={headerStyle}>Demographic Profile of Patients This Month</h2>
        <ResponsiveContainer>
          <MyPieChart/>
        </ResponsiveContainer>
        <h2 style={headerStyle}>Funding Sources Breakdown</h2>
        <ResponsiveContainer>
          <MyStackedBarChart/>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    
  );  
};

export default GraphSection;
