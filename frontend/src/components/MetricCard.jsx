import React from 'react';
import './MetricCard.css'; // Make sure to create this CSS file

const MetricCard = ({ color, icon, amount, label, change }) => {
    return (
        <div className="card">
            <div className="card-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <div className="card-content">
                <h3>{amount}</h3>
                <p>{label}</p>
                <small>{change}</small>
            </div>
        </div>
    );
}

export default MetricCard;