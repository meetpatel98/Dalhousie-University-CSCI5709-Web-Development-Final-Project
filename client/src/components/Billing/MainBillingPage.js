

import React, { useEffect, useState } from "react";
import DetailForm from './DetailForm'
import { useNavigate } from "react-router-dom";
import Payment from './Payment'

export default function MainBillingPage() {

  const navigate = useNavigate();
  const[arrval , setarrval] = useState([]);
  const[total , setTotal] = useState(localStorage.getItem("totalprice"));
  const[isPaypalBtnDisable , setPaypalButtonDisable] = useState(true);
  const arr = [
    //product id                       name of product              days     price
    ["bf077895-db49-4bae-93ae-1f9d9f5d5dbf","e48f3673-56c9-4516-bd31-53eb815f27e7","2ace6373-a98f-4479-b49e-1051937d733c"],[6,7,8],[120,130,140]
  ]
  

  useEffect(()=>{
      
        //const lclStrArr = localStorage.setItem("arr" , JSON.stringify(arr))
        // if(arr.length > 0){
        //     console.log("The length is high")
        //     localStorage.setItem("arr" , JSON.stringify(arr))
        //     localStorage.setItem("totalprice" , totalprice + vatValue+GST + ins)
        // }
        if(localStorage.getItem("arr") === null) {
            console.log("Navigate to front")
            navigate('/cart')
        }
        else {
            setarrval(JSON.stringify(localStorage.getItem("arr")))

            //setTotal(localStorage.getItem("totalprice"))
            console.log("++++++++++"+total)
           // console.log("--------" + localStorage.getItem("totalprice"))
        }
    },[])


  // const totalPrice = 400;



  return (
    <div>
        <DetailForm setPaypalButtonDisable={setPaypalButtonDisable}/>
        <Payment arr = {arrval} totalprice = {parseInt(total)} isPaypalBtnDisable={isPaypalBtnDisable}/>
    </div>
  )
}
