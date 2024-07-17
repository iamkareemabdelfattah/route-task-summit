import React from 'react'
import ChartData from '../ChartData/ChartData';
import Data from './../Data/Data';
// import Chart from './../Chart/Chart';
// import Customers from './../Customers/Customers';
// import Transactions from './../Transactions/Transactions';

const Home = () =>
{  
  return (
    <div className=''>
      <p className='fs-1 text-center'>
        Info Customers & Transactions & Chart
      </p>
      <div className=' w-75 rounded border shadow p-4 m-auto'>
        <Data />
      </div>

      <div className='rounded border shadow  my-3'>
        <ChartData />
      </div>

      {/* <div className=' w-75 rounded border shadow p-4 m-auto'>
        <Customers />
      </div>
      <div className=' w-75 rounded border shadow p-4 m-auto'>
        <Transactions />
      </div>
      <div className='rounded border shadow  my-3'>
        <Chart />
      </div> */}
    </div>

  )
}

export default Home
