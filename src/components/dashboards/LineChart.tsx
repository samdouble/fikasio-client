import React from 'react';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';

const options = {
  scales: {
    /*
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    */
  },
};

const LineChart = props => {
  const xAxis: string[] = [];
  if (props.data.length) {
    const firstX = DateTime.fromJSDate(new Date(props.data[0].x));
    const lastX = DateTime.fromJSDate(new Date(props.data[props.data.length - 1].x));
    for (let x = firstX; x < lastX; x = x.plus({ days: 1 })) {
      xAxis.push(x.toFormat('yyyy-MM-dd'));
    }
  }
  return (
    <Line
      data={{
        labels: xAxis,
        datasets: [
          {
            label: 'Progrès',
            data: props.data
              .map(d => ({
                ...d,
                x: DateTime.fromJSDate(new Date(d.x)).toFormat('yyyy-MM-dd'),
              })),
            fill: false,
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0.2)',
          },
        ],
      }}
      options={options}
    />
  );
};

export default LineChart;
