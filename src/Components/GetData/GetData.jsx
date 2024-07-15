import axios from 'axios';
import React, { useState,useEffect } from 'react'

const GetData = () =>
{
  const [ customers, setCustomers ] = useState( [] );
  const [ transactions, setTransaction ] = useState( [] );
  let [ filtering, setFiltering ] = useState( [] );

  async function getData ( sales, callback )
  {
    let { data } = await axios.get( `http://localhost:4000/${ sales }` );
    console.log( data );
    callback( data );
    setFiltering( data )
  }

  useEffect( () =>
  {
    getData( 'customers', setCustomers );
    getData( 'transactions', setTransaction );

  }, [] );

  function handleFiltering (e )
  {
    setFiltering(
      transactions.filter( ( item ) => item.amount.toString().includes( e.target.value ) )
    );
    // setFiltering(
    //     customers.filter(( customer ) => customer.name.toLowerCase().includes( e.target.value.toLowerCase() ))
    //     );
  }

  return (
    <div className='container'>

      <input type="text" className='form-control' onChange={ handleFiltering } placeholder='Search by Amount ' />

      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">Customer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          { filtering&&filtering.map( ( item, index ) =>
          {
            return (
              <tr key={ index }>
                <td>{ item.customer_id }</td>
                <td>
                  { customers.find( ( customer ) => customer.id === item.customer_id ).name }
                </td>
                <td>{ item.date }</td>
                <td>{ item.amount }</td>
              </tr>
            );
          }
          ) }
        </tbody>
      </table>
    </div>
  )
}

export default GetData;
