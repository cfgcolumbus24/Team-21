import React from 'react';


import Discharges from '../components/Discharges';
import IntakesTable from '../components/IntakesTable';
import NumClients from '../components/IntakesTable';
import RaceEthnicityDischarge from '../components/RaceEthnicityDischarge';
import SexualOrientationDischarge from '../components/SexualOrientationDischarge';
import TableGender from '../components/TableGender';
import TableLenghtStay from '../components/TableLenghtStay';
import TransgenderDischarge from '../components/TransgenderDischarge';

// bar 
// line
// scatter 
// pie chart
const GenerateReport = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex flex-col">
        <div className="justify-center w-full">
          <NumClients />
          <IntakesTable />
          <Discharges />
          <TableLenghtStay />
          <TableGender />
          <TransgenderDischarge />
          <SexualOrientationDischarge />
          <RaceEthnicityDischarge />
        </div>
    </div>
  );
};

export default GenerateReport;