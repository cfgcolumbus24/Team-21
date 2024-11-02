import React, {useState, useEffect} from 'react';
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

  const [buttonColor, setButtonColor] = useState('bg-green-500');
  const [data, setData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [anamolyData, setAnamolyData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/detect_anomalies');
        const result = await response.json();
        if (result.revenue_anomalies || result.expenses_anomalies) {
          setButtonColor('bg-red-500');
          setData(result);
          setAnamolyData(`Revenue Anomaly: ${result.revenue_anomalies}\nExpense Anomaly: ${result.expenses_anomalies[0].amount}`);
        } else {
          setButtonColor('bg-green-500');
          setData(null);
          setAnamolyData(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <h1 style={{ 
                  color: 'black',           // Sets the text color
                  fontSize: '36px',         // Sets the font size
                  fontFamily: 'Roboto, sans-serif', // Sets the font family
                  fontWeight: 700, // Sets the weight of the font
                  margin: 20
              }}>
                  Netcare Access Analytics
      </h1>

      <div className="relative inline-block">
        <button
          className={`text-white font-bold py-2 px-4 rounded ${buttonColor} transition duration-300 ease-in-out transform hover:scale-105`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Anamoly Detection
        </button>
        {showTooltip && data && (
          <div className="absolute top-full mt-2 px-4 py-2 bg-gray-800 text-white rounded shadow-lg text-sm z-10">
            {anamolyData}
          </div>
        )}
      </div>

    </div>

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
