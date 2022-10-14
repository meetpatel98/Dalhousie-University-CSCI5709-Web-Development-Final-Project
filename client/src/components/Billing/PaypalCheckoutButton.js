import React, { useState , useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PaypalCheckoutButton = (props) => {
  const { product , disabled } = props;
  const navigate = useNavigate();

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [val , setVal] = useState(product.price)


  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  const makeOrder = (actions) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@"+localStorage.getItem("totalprice"))
    return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  value: localStorage.getItem("totalprice"),
                },
                shipping: {
                  shipping_detail: {
                    address : {
                      value : "This is Sample address"
                  }
              }
            }
          },
            ],
          });
  }

  useEffect(()=>{
    setVal(product.price)
    //console.log("[[[[[[[[[[[" +product.price);
  },[product.price])

  if (paidFor) {
      console.log("Payment Done")
    navigate("/thank");
  }

  if (error) {
    alert(error);
  }
 // console.log("Inside Checkout" + product.price)
//  setVal(product.price)
  return (
    <PayPalScriptProvider>
      <PayPalButtons disabled={disabled} className="mt-10 "
        onClick={(data, actions) => {
          const hasAlreadyBoughtCourse = false;
          if (hasAlreadyBoughtCourse) {
            setError("You Already bought this item.");
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => makeOrder(actions)}
        onApprove={async (data, action) => {
          const order = await action.order.capture();
          console.log("order", order);

          handleApprove(data.orderID);
        }}
        onCancel={() => {}}
        onError={(err) => {
          setError(err);
          console.log("PayPal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckoutButton;
