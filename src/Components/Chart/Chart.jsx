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
  let [ chartData, setChartData ] = useState( {} );

  async function getData ()
  {

    let { data } = await axios.get(
      `http://localhost:4000/transactions`
    );

    setChartData( {
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
      getData();
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

  console.log( chartData );

  return (
    <div className="chart-container m-auto" style={{ position: 'relative', height: '400px', width: '600px',
}}>
      {
        chartData && chartData.datasets && (
          <Bar
            data={ chartData }
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
            }}
          />
        )
      }
    </div>
  )
}

export default Chart
