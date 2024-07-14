import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Transactions = () =>
{
  const [ data, setData ] = useState( [] );
  let [ filtering, setFiltering ] = useState( [] );

  async function getData ()
  {
    let { data } = await axios.get(
      `http://localhost:4000/transactions`
    );
    console.log( data );
    setData( data );
    setFiltering(data)
  }

  useEffect(
    () =>
    {
      getData();
    }, [] );
  
  const handleFiltering = ( e ) =>
  {
    setFiltering(
      data.filter( ( item ) => item.amount.toString().includes( e.target.value) )
    );
   }

  return (
    <div>
      <input type="text" className='form-control' onChange={ handleFiltering } placeholder='Search by Amount ' />
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">Customer ID</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          { filtering && filtering.map( ( item, index ) =>
        {
          return (
            <tr key={ index }>
              <td>{ item.customer_id }</td>
              <td>{ item.date }</td>
              <td>{ item.amount }</td>
            </tr>
          );
        }
          ) }
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
