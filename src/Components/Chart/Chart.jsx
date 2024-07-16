import axios from 'axios';
import React, { useEffect, useState } from 'react'

import
  {
    Chart as ChartJS, BarElement,
  CategoryScale,LinearScale,
  Tooltip,Legend
 } from 'chart.js';

import
  {Bar} from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

const Chart = () =>
{
  let [ chartDataCust, setChartDataCust ] = useState( {} );
  let [ chartDataTran, setChartDataTran ] = useState( {} );

  async function getInfoCustomers ()
  {

    let { data } = await axios.get(
      `http://localhost:4000/customers`
    );

    setChartDataCust( {
      labels: data.map( ( item ) => item.name ),
      datasets: [
        {
          label: 'Income Total Transaction Amount Per Day',
          data: data.map( ( item ) => item.name ),
          backgroundColor: '#F24D66',
          borderColor: '#00FFFF',
          borderWidth: 3
        }
      ]
    } );

    console.log( data.map( ( item ) =>
    {
      return (
        {
          name: item.name,
        }
      );
    }
    ) );
    console.log( {
      labels: data.map( ( item ) => item.id ),
      datasets: [
        {
          label: 'Customer',
          data: data.map( ( item ) => item.name ),
        }
      ]
    } );
  }
  async function getInfoTransaction ()
  {

    let { data } = await axios.get(
      `http://localhost:4000/transactions`
    );

    setChartDataTran( {
      labels: data.map( ( item ) => item.date ),
      datasets: [
        {
          label: 'Income Total Transaction Amount Per Day',
          data: data.map( ( item ) => item.amount ),
          backgroundColor: '#F24D66',
          borderColor: '#00FFFF',
          borderWidth: 3
        }
      ]
    } );

    console.log( data.map( ( item ) =>
    {
      return (
        {
          date: item.date,
          amount: item.amount
        }
      );
    }
    ) );
    console.log( {
      labels: data.map( ( item ) => item.date ),
      datasets: [
        {
          label: 'Income',
          data: data.map( ( item ) => item.amount ),
        }
      ]
    } );
  }

  useEffect(
    () =>
    {
      getInfoCustomers();
      getInfoTransaction();
    }, [] );

  // useEffect( () =>
  // {
  //   let fetchData = async () =>
  //   {
  //     let { data } = await axios.get(
  //       `http://localhost:4000/transactions`
  //     );
  //     setChartData(
  //       {
  //         labels: data.map( ( item ) => item.date ),
  //         datasets: [
  //           {
  //             label: 'Income',
  //             data: data.map( ( item ) => item.amount ),
  //             backgroundColor: '#ff0000',
  //             borderColor: '#ff0000',
  //             borderWidth: 3
  //           }
  //         ]
  //       }
  //     );
  //     console.log( data.map( ( item ) =>
  //     {
  //       return (
  //         {
  //           date: item.date,
  //           amount: item.amount
  //         }
  //       );
  //     }
  //     ) );
  //     console.log( {
  //       labels: data.map( ( item ) => item.date ),
  //       datasets: [
  //         {
  //           label: 'Income',
  //           data: data.map( ( item ) => item.amount ),
  //           backgroundColor: '#ff0000',
  //           borderColor: '#ff0000',
  //           borderWidth: 3
  //         },
  //       ]
  //     } );
  //   };
  //   fetchData();
  // }
  //   , [] );

  console.log( 'Cust',chartDataCust,"Trans" ,chartDataTran);

  return (
    <div className="chart-container m-auto" style={ {
      position: 'relative', height: '400px', width: '600px',
    } }>
      {
        chartDataCust && chartDataTran ?
          <Bar
            data={ {
              labels: chartDataCust.labels,
              datasets: [
                {
                  label: 'Customer',
                  data: chartDataCust.datasets[ 0 ].data,
                  backgroundColor: '#ff0000',
                  borderColor: '#ff0000',
                  borderWidth: 3
                },
                {
                  label: 'Transaction',
                  data: chartDataTran.datasets[ 0 ].data,
                  backgroundColor: '#00ff00',
                  borderColor: '#00ff00',
                  borderWidth: 3
                },
              ]
            } }
            options={ {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: 'Customers Transaction Amount'
                },
              }
            } }
          /> : null
      }
    </div>
  )
}

export default Chart
