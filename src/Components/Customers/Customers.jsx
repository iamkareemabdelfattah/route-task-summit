import axios from 'axios';
import React, { useState,useEffect } from 'react'

const Customers = () =>
{
  const [ data, setData ] = useState( [] );
  let [ filtering, setFiltering ] = useState([]);

  async function getData ()
  {
    let { data } = await axios.get(
      `http://localhost:4000/customers`
    );
    console.log( data );
    setData( data );
    setFiltering(data)
  }

  useEffect(
    () =>
    {
      getData(data)
    }, [] );
  
  function handleFiltering ( e )
  {
    setFiltering(
      data.filter(( customer ) => customer.name.toLowerCase().includes( e.target.value.toLowerCase() ))
    );
    console.log(e.taget.value)
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
                  Customers Id
                </th>
                <th>
                  Name
                </th>
                <th>
                  Date
                </th>
                <th>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
          { filtering &&filtering.map( ( item, index ) =>
              {
                return (
                  <tr key={ index }>
                    <td>{ item.id }</td>
                    <td>{ item.name }</td>
                    <td>{ item.name }</td>
                    <td>{ item.name }</td>
                    <td>{ item.name }</td>
                  </tr>
                );
              }
              ) }
            </tbody>
            </table>
          </div>
  )
}

export default Customers;
