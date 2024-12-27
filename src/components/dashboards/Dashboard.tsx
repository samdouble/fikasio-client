import React from 'react';
import LineChart from './LineChart';

const Dashboard = ({ data }) => {
  return (
    <div className="App">
      <LineChart
        data={data}
        height={300}
        width={400}
      />
    </div>
  );
}

export default Dashboard;
