import React from 'react';
import LineChart from './LineChart';

const Dashboard = ({ data }) => {
  return (
    <div className="App">
      <LineChart data={data} width={400} height={300} />
    </div>
  );
}

export default Dashboard;
