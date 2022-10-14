import React from 'react'
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import constant from "../../AppConstant.json"
import emailjs from 'emailjs-com'
import sendEmail from './sendEmail';


function Thank() {
  // if(localStr.length == 0){
  //   //Go to cart
  // }
  const navigate = useNavigate();
  if(localStorage.length > 0){
     console.log("Nothing is avaiable there")
     
   }
   const localStr = JSON.parse(localStorage.getItem("arr"))

   const totalPrice = localStorage.getItem("totalprice")
   const address = localStorage.getItem("address")
   console.log(localStr)
   console.log(address)
   console.log(totalPrice)
   let body = { arr: localStr , address : address , totalPrice : totalPrice };

  useEffect(() => {
    if(localStorage.getItem("arr") === null) {
            console.log("Navigate to front")
            navigate('/cart')
    }else {
        if(localStr.length > 0) {

        axios.post(constant.BE_URL + "billingdetails/saveordertodb", body)
        //axios.post("http://localhost:8080/unitedrental/billingdetails/save")
        .then((res) => {
          console.log("Data Added Sucessfully")
          const u = localStorage.getItem("totalprice")
          const nnn = localStorage.getItem("username")
          sendEmail(
            nnn,u.toString()
          )
          localStorage.removeItem("arr");
          localStorage.removeItem("totalprice");
          localStorage.removeItem("address");
        })
        .catch((err) => {
          console.log("There is an error " + err)
        })

    }else {
      navigate('/cart')
      return
    }
    }
    
  }, [])

	
  const redirect=()=>{

    navigate("/products");
  }

  return (
    <div>
        {/* <img src={require('../image/8401.jpg')} height="40%" width="40%" className="image-class"></img> */}
        <div className="title-class">Thank you For Shopping</div>
        <button onClick={redirect} className="button-class" >Go to home page</button>
        
    </div>
  )
}

export default Thank