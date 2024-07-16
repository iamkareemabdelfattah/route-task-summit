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

const Chart = () =>
{
  let [ chartDataCust, setChartDataCust ] = useState( {} );
  let [ chartDataTrans, setChartDataTrans ] = useState( {} );

  async function GetDataCustomers ()
  {
    let { data } = await axios.get(
      `http://localhost:4000/customers`
    );
    // let labels = [];
    // let dataCust = [];
    // data.forEach( ( item ) =>
    // { 
    //   labels.push( item.name );
    //   dataCust.push( item.id );
    // } );
    setChartDataCust(
      {
        labels: data.map( ( item ) => item.name ),
        datasets: [
          {
            label: 'Customers',
            data:
            {
              id: data.map( ( item ) => item.id ),
            },
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

  async function GetDataTransaction ()
  {
    let { data } = await axios.get(
      `http://localhost:4000/transactions`
    );
    setChartDataTrans(
      {
        labels: data.map( ( item ) => item.customer_id ),
        datasets: {
          label: 'Transactions',
          data: data.map( ( item ) => item.amount ),
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
      } );
  }

  useEffect(
    () =>
    {
      GetDataCustomers();
      GetDataTransaction();
    }, [] );

  console.log( chartDataCust, chartDataTrans );

  return (
    <div className="chart-container m-auto" style={ {
      position: 'relative', height: '400px', width: '600px',
    } }>
      {
        chartDataCust.datasets && chartDataTrans.datasets && (
          <Bar
            data={ {
              labels: chartDataCust.labels,
              datasets: [
                {
                  label: 'Customers',
                  data: chartDataCust.datasets.data,
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
                {
                  label: 'Transactions',
                  data: chartDataTrans.datasets.data,
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
            } }
          />
        )
      }
    </div>
  );
};

export default Chart;
