import axios from 'axios';
import React, { useEffect, useState } from 'react';

import
{
  Chart as ChartJS, BarElement,
  CategoryScale, LinearScale,
  Tooltip, Legend
} from 'chart.js';

import
{ Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const ChartData = () =>
{
  let [ chartData, setchartData] = useState( {} );

  async function ChartInfo ()
  {
    let { data } = await axios.get(
      `https://iamkareemabdelfattah.github.io/jsonerver/db.json`
    );
    setchartData(
      {
        labels: data.transactions.map( ( item ) => item.date ),
        datasets: [
          {
            label: 'Transaction Amount',
            data: data.transactions.map( ( tran ) => tran.amount ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      } );
  }


  useEffect(
    () =>
    {
      ChartInfo();
    }, [] );

  console.log( chartData );

  return (
    <div className="chart-container m-auto" style={ {
      position: 'relative', height: '400px', width: '600px',
    } }>
      {
        chartData &&chartData.datasets && (
          <Bar
            options={
              {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Customers',
                  },
                  tooltip: {
                    callbacks: {
                      labelTextColor: function ()
                      {
                        return 'white';
                      }
                    },
                    backgroundColor: [
                      'rgba(255, 99, 132)',
                    ],
                    titleColor: 'white',
                    bodyColor: 'white',                    
                  },
                },
              }
            }
            data={ chartData }
          />
        )
      }
    </div>
  );
};

export default ChartData;
