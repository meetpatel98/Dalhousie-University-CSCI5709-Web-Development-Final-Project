import React, { useState } from 'react';
import Product from './Product';
import { Typography } from '@mui/material';
import { useResolvedPath } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
export default function Main(props) {
  const { products, onAdd } = props;
  const [searchterm, setsearchterm]=useState("");
  
  const [maxprice, setmaxprice]=useState(5000000)
  return (
    <main className="block">
      <Typography
            variant="h4"
            noWrap
            component="div"
            
            sx={{ display: { xs: 'none', sm: 'block' } }}
      >
            Products
        
          </Typography>
          <input type="text" placeholder='search....' onChange={(event)=>{
            setsearchterm(event.target.value)
          }}></input>
<FilterListIcon></FilterListIcon>
<input type="number" placeholder='max price...' onChange={(event2)=>{
            setmaxprice(event2.target.value)
          }}></input>
         <FilterListIcon></FilterListIcon>
      <div >
        {products.filter((product)=>
        {
          if(searchterm=="")
          {
            return product
          }
         else if (product.name.toLowerCase().includes(searchterm.toLocaleLowerCase()))
         {
          return product
         }
         
        }
        ).filter((product)=>
        {
          if (product.price<maxprice)
          {
           return product
          }

        }).map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
    </main>
  );
}
