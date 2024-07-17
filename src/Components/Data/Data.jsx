import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Data = () =>
{
  const [ customers, setCustomers ] = useState( [] );
  const [ transactions, setTransactions ] = useState( [] );
  const [ input, setInput ] = useState( [] );

  async function getData ()
  {
    const { data } = await axios.get( `https://iamkareemabdelfattah.github.io/jsonerver/db.json` );
    setCustomers( data.customers );
    setTransactions( data.transactions );
    console.log( 'AllData', data );
    console.log( 'customers', data.customers );
    console.log( 'transactions', data.transactions );
  }

  useEffect( () =>
  {
    getData();
  }, [] );

  function SearchBar ( value )
  {
    fetch( `https://iamkareemabdelfattah.github.io/jsonerver/db.json` ).then( ( response ) => response.json() ).then(
      ( { customers, transactions } ) =>
      {
        let results = transactions.filter( ( item ) =>
        {
          const customer = customers.find( ( cust ) => cust.id === item.customer_id );
          return (
            item.amount.toString() === value.toString() ||
            ( customer && customer.name.toLowerCase().includes( value.toLowerCase() ) )
          );
        }
        );
        setTransactions( results );
        console.log( results );
      }
    );
  }

  let handleChange = ( value ) =>
  {
    setInput( value );
    SearchBar( value );
  };

  return (
    <div className='container'>

      <div className="form-group">
        <label htmlFor="Search">Search</label>
        <input type="text"
          value={ input }
          className="form-control" name="Search" id="Search" placeholder="Search by Name or amount"
          onChange={ ( e ) => handleChange( e.target.value ) } />
      </div>

      <table className="table table-striped table-responsive table-hover table-secondary">
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
          {/* <td><tr>1</tr></td>
          <td><tr>1</tr></td>
          <td><tr>ahmed</tr></td>
          <td><tr>1-1-2022</tr></td>
          <td><tr>2022</tr></td> */}
          {
            transactions.map( ( transactions ) =>
            {
              return (
                <tr key={ transactions.id }>
                  <td>{ transactions.id }</td>
                  <td>{ transactions.customer_id }</td>
                  <td>{
                    customers.find( ( customer ) => customer.id === transactions.customer_id ).name

                  }</td>
                  <td>{ transactions.date }</td>
                  <td>{ transactions.amount }</td>
                </tr>
              );
            } ) }

        </tbody>
      </table>
    </div>
  );
};

export default Data;
