import React, { useState } from 'react';
import Product from './Product';
import { Typography } from '@mui/material';
import { useEffect } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import constant from "../../AppConstant.json";


export default function Main(props) {
  const { products, onAdd, addItemToCart } = props;
  const [searchterm, setsearchterm] = useState("");
  const [pro, setProduct] = React.useState([]);
  const [finalErrorMessage, setFinalErrorMessage] = React.useState("");
  const [maxprice, setmaxprice] = useState(5000000)



  useEffect(() => {
    //UseEffect will only call once

    let userId=localStorage.getItem("documentId");

    fetch(constant.BE_URL+`productdetails/products/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((products) => {
        if (products.success === true) {
          setProduct(products.productRecord);
        } else {
          setFinalErrorMessage(products.message);
        }
      });
  }, [pro]);
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
      <input type="text" placeholder='search....' onChange={(event) => {
        setsearchterm(event.target.value)
      }}></input>
      <FilterListIcon></FilterListIcon>
      <input type="number" placeholder='max price...' onChange={(event2) => {
        setmaxprice(event2.target.value)
      }}></input>
      <FilterListIcon></FilterListIcon>
      <div >
        {
        
        pro.filter((product) => {
         
          if(searchterm=="")
          {
            //console.log("This is Empty")
            return product
          }
        
          else if (product.name.toLowerCase().includes(searchterm.toLocaleLowerCase()))
         {
          //console.log("This is asjdkhakdjs")
          return product
         }

        }
        ).filter((product) => {
          if (product.rentamount < maxprice) {
            return product
          }

        }).filter((product) => {
          if (product.userid != " 2") {
            return product
          }
        }).map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd} addItemToCart={addItemToCart}></Product>
        ))}
      </div>
    </main>
  );
}
