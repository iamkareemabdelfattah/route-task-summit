import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Customers = () =>
{
  const [ data, setData ] = useState( [] );
  let [ filtering, setFiltering ] = useState( [] );

  async function getData ()
  {
    let { data } = await axios.get(
      `https://iamkareemabdelfattah.github.io/jsonerver/db.json`
    );
    console.log( data.transactions );
    setData( data.transactions );
    setFiltering( data.transactions );
  }

  useEffect(
    () =>
    {
      getData();
    }, [] );

  function handleFiltering ( e )
  {
    setFiltering(
      data.transaction.filter( ( item ) => item.amount.toString().includes( e.target.value ))
    );
    console.log( e.taget.value );
  }

  return (
    <div>

      <input type="text" className='form-control' onChange={ handleFiltering } placeholder='Search By Name' />
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>
              Id
            </th>
            <th>
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          { filtering && filtering.map( ( item, index ) =>
          {
            return (
              <tr key={ index }>
                <td>{ item.id }</td>
                <td>{ item.customers_id }</td>
                <td>{ item.date }</td>
                <td>{ item.amount}</td>
              </tr>
            );
          }
          ) }
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
