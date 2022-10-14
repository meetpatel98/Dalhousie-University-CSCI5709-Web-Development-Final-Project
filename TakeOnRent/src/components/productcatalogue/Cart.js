import React, { useState } from 'react';
import { Card } from '@mui/material'; 
import { Button } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Cart(props) {
  const { cartItems, onAdd, onRemove } = props;
  const [days,setdays]= useState(1)
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price * days , 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  const navigate = useNavigate();
  const navBill = () => {
    
    navigate("/MainBillingPage");
  };
  
  return (<div className='block'>
    <Card sx={{ maxWidth: 1400, maxHeight: 1000}} >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          
    <h2>Cart Items</h2>
      <div >
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row-text">
            <div className="row-text">
            <div >{item.name}</div>
           
              <button   onClick={() => onRemove(item)}   sx={{
                backgroundColor: "#979AA1",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#6c757d",
                }
              }}>
                -
              </button>
              <button onClick={() => onAdd(item)}  sx={{
                backgroundColor: "#979AA1",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#6c757d",
                }
              }}>
                +
              </button>
           </div>

            <div className="text-right">
            <input type="number" min="1" max="7" placeholder="1" onChange={(event)=>
              {
                setdays(event.target.value)
                console.log(days)
              }}></input>
              days x {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row-text" >
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row-text">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row-text">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row-text" >
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <Button sx={{
                backgroundColor: "#979AA1",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#6c757d",
                }
              }} className='text-right' onClick={navBill}>
                Pay ${totalPrice.toFixed(2)}
              </Button>
            </div>
          </>
        )}
      </div>
 
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    </div>
  );
}
