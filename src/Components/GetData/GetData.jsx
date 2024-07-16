import axios from 'axios';
import React, { useState, useEffect } from 'react';

const GetData = () =>
{
  // const [ customers, setCustomers ] = useState( [] );
  // const [ transactions, setTransaction ] = useState( [] );
  let [ filtering, setFiltering ] = useState( [] );

  async function getData ( )
  {
    let { data } = await axios.get( `https://iamkareemabdelfattah.github.io/jsonerver/db.json` );
    console.log( 'parent', data );
    setFiltering( data );
  }

  useEffect( () =>
  {
    getData( 'customers', setCustomers );
    getData( 'transactions', setTransaction );
  }, [] );

  const handleFiltering = ( e ) =>
  {
    setTransaction(
      filtering.filter( ( item ) =>
      {
        return item.amount.toString().includes( e.target.value.toString() );
      } )
    );
    setCustomers(
      customers.filter( ( item ) =>item.name.toLowerCase().includes( e.target.value.toLowerCase() )
      )
    );
  };

  return (
    <div className='container'>

      <input type="text" className='form-control' onChange={ handleFiltering } placeholder='Search by Name Or Amount ' />

      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            filtering && transactions.map( ( item ) => (
              <tr key={ item.id }>
                <td>{ item.id }</td>
                <td>{ item.customer_id }</td>
                <td>
                  {
                    customers.map(
                      ( customers ) => (
                        customers.id === item.customer_id && customers.name
                      )
                    )
                  }
                </td>
                <td>{ item.date }</td>
                <td>{ item.amount }</td>
              </tr>
            )
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default GetData;
