import React from 'react'
import Customers from '../Customers/Customers';
import Transactions from '../Transactions/Transactions';
import Chart from '../Chart/Chart';

const Home = () =>
{  
  return (
    <div className=''>
      <p className='fs-1 text-center'>
        Info Customers & Transactions & Chart
      </p>
      
      <div className=' w-75 rounded border shadow p-4 m-auto'>
        <Customers />
      </div>
      <div className=' w-75 rounded border shadow p-4 m-auto my-3'>
        <Transactions />
      </div>
      <div className=' w-75 rounded border shadow p-4 m-auto my-3'>
        <Chart/>
      </div>
    </div>

  )
}

export default Home
