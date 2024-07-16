import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Data = () =>
{
  const [ customer, setCustomer ] = useState( [] );
  const [ transaction, setTransaction ] = useState( [] );

  async function getData ( info, callback )
  {
    // http://localhost:4000/transactions/
    let { data } = await axios.get( `http://localhost:4000/${ info }/` );
    callback( data );
    console.log( ...data );
    setCustomer( data );
    setTransaction( data );
  }

  useEffect( () =>
  { 
    getData( 'customers', setCustomer );
    getData( 'transactions', setTransaction );
  }, [] )
//   console.log(  customer.find( ( customer ) => customer.id === transaction.customer_id ).name
  // )
  // console.log( customer.filter(
  //   ( customer ) => customer.id === transaction.customer_id
  // ).map( ( customer, index ) =>
  // {
  //   return (
  //     <div key={ index }>{ customer.name }</div>
  //   );
  // } ) )
  console.log(
    customer.filter( ( customer ) => { if ( customer.id === transaction.customer_id ) { return customer.name; } }
  ))
  return (
    <div>
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          { transaction.map( ( transaction, index ) =>
          {
            return (
              <tr key={ index }>
                <td>{ transaction.id }</td>
                <td>{ transaction.customer_id }</td>
                <td>{ transaction.date }</td>
                <td>{ transaction.amount }</td>
                <td>
                  { customer.filter(( customer ) =>{if ( customer.id === transaction.customer_id){return customer.name}})}
                </td>
              </tr>
            )
            }
          ) }
        </tbody>
      </table>
    </div>
  )
}

export default Data
