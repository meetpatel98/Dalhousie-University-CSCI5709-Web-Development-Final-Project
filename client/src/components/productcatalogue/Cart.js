import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { Button } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';


export default function Cart(props) {
  const { cartItems, onAdd, onRemove } = props;
  const [days, setdays] = useState(1)
  const [qty1, setqty1] = useState(1)
  const [itemPrice, setItemPrice] = useState(0);

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price * days, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + shippingPrice;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"+qty1)
    let temp = 0;
    
    for (let j = 0; j < cartItems.length; j++) {
      temp += cartItems[j].qty * cartItems[j].rentamount;
    }
    setItemPrice(temp)



  }, [])
  const id = [];
  const q1 = [];
  const price = [];
  const sent = [];

  useEffect(() => {
    let add=0
    for (let i = 0; i < cartItems.length; i++) {
      id.push(cartItems[i].id)
      q1.push(cartItems[i].qty)
      price.push(cartItems[i].rentamount)
     

    }
    sent.push(id);
    sent.push(q1);
    sent.push(price);

    console.log("------" + sent )
    console.log("------" + add )

  localStorage.setItem("arr", JSON.stringify(sent))

  localStorage.setItem("totalprice", JSON.stringify(itemPrice+shippingPrice))


})




  console.log("Added itme data");

  const navBill = () => {

    navigate("/MainBillingPage");
  };
  useEffect(() => {
    console.log(cartItems)
  }, [])
  return (<div className='block'>
    <Card sx={{ maxWidth: 1400, maxHeight: 1000 }} >
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

                    {/* <button   onClick={() => onRemove(item)}   sx={{
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
              </button> */}
                  </div>

                  <div className="text-right">
                    {/* <input type="number" min="1" max="7" placeholder="1" onChange={(event)=>
              {
                setdays(event.target.value)
                console.log(days)
              }}></input> */}
                    {item.qty} X ${item.rentamount.toFixed(2)}
                  </div>
                </div>
              ))}

              {cartItems.length !== 0 && (
                <>
                  <hr></hr>
                  <div className="row-text" >
                    <div className="col-2">Items Price</div>
                    <div className="col-1 text-right">${itemPrice.toFixed(2)}</div>
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
                      <strong>${(itemPrice + shippingPrice).toFixed(2)}</strong>
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
                      Pay ${(itemPrice + shippingPrice).toFixed(2)}
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
