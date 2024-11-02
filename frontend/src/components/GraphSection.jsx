import React from 'react';
import MyBarChart from '../components/MyBarChart';
import LineGraph from '../components/LineGraph';
import MyPieChart from '../components/MyPieChart';
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
                fontWeight: 700           // Sets the weight of the font
            }}>
                Netcare Access Analytics
            </h1>
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
          padding: '20px',
          
      }}>       
        <h2 style={headerStyle}>Pie</h2>
        <ResponsiveContainer>
          <MyBarChart/>
        </ResponsiveContainer>
        <h2 style={headerStyle}>Scatter</h2>
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
          padding: '20px',
      }}>
        <h2 style={headerStyle}>Line</h2>
        <ResponsiveContainer>
          <MyPieChart/>
        </ResponsiveContainer>
        <h2 style={headerStyle}>Bar</h2>
        <ResponsiveContainer>
          <MyBarChart/>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    
  );  
};

export default GraphSection;
