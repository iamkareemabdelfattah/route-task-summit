import React from 'react'
import Chart from '../Chart/Chart';
import GetData from './../GetData/GetData';

const Home = () =>
{  
  return (
    <div className=''>
      <p className='fs-1 text-center'>
        Info Customers & Transactions & Chart
      </p>
      
      <div className=' w-75 rounded border shadow p-4 m-auto'>
        <GetData />
      </div>
      <div className='rounded border shadow  my-3'>
        <Chart/>
      </div>
    </div>

  )
}

export default Home
