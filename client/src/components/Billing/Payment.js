import React, { useEffect, useState } from "react";
import { Box, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import PaypalCheckoutButton from "./PaypalCheckoutButton";


const Payment = ({arr , totalprice , isPaypalBtnDisable}) => {

    const[cardName , setCardName] = useState("");
    const[cardNumber , setCardNumber] = useState("");
    const[cvv , setCvv] = useState("");
    const[expiryDate , setExpiryDate] = useState("");
    const navigate = useNavigate();
    const[ins , setIns] = useState(0);
    const[checkboxcheck , setCheckboxCheck] = useState(false);
    const[totalPriceforPaypal , setForPaypal] = useState(totalprice + totalprice * 0.05+totalprice * 0.2);

    const[cardNameError , setCardNameError] = useState(false);
    const[cardNumberError , setCardNumberError] = useState(false);
    const[cardCVVError , setcardCVVError] = useState(false);
    const[cardExpiryDateError , setcardExpiryDateError] = useState(false);
    const[productState , setproductState] = useState({
        description: "product List",
        price: totalPriceforPaypal
    })
    

    var cardNameFlag = true;
    var cardNumberFlag = true;
    var cvvFlag = true;
    var expiryFlag = true;

    const vatValue = totalprice * 0.05;

    const GST = totalprice * 0.2

    var insurance = 0.0;

    const changeinsurance = (e) => {
        if(e.target.checked){
            setCheckboxCheck(true)
        //    setIns(totalprice * 0.10)
        //    localStorage.setItem("totalprice" , totalprice + vatValue+GST + totalprice * 0.10)
        //    setForPaypal(totalprice + vatValue+GST + totalprice * 0.10)
        //    console.log("Checked :- "+totalPriceforPaypal)

        }else {
            setCheckboxCheck(false)
            // setIns(insurance = 0)
            // localStorage.setItem("totalprice" , totalprice + vatValue+GST)
            // setForPaypal(totalprice + vatValue+GST)
            // console.log(totalPriceforPaypal)
        }
       // console.log(ins)
        
    }

    const makeDesc = () => {
        var text = ""
        for (let i = 0; i < arr[1].length; i++) {
            text += arr[1][i] + " ,";
        }
        return text
    }
    
    const product = {
        description: "Products",
        price: totalPriceforPaypal
    };

   // console.log("-----------" + parseFloat(localStorage.getItem("totalprice")));
    

    useEffect(()=> {
        console.log("+++++++++++++++++++++++++++++++++++++++++++++")
        if(checkboxcheck){
            setIns(totalprice * 0.10)
           localStorage.setItem("totalprice" , totalprice + vatValue+GST + totalprice * 0.10)
           
           setForPaypal(totalprice + vatValue+GST + totalprice * 0.10)
           console.log("Checked :- "+totalPriceforPaypal)
        }
        else {
            setIns(insurance = 0)
            localStorage.setItem("totalprice" , totalprice + vatValue+GST)
            setForPaypal(totalprice + vatValue+GST)
            console.log(totalPriceforPaypal)
        }
        const ttt =  localStorage.getItem("totalprice")
        setproductState({
            description: "Products",
            price: ttt
        })
       // console.log("****************" + localStorage.getItem("totalprice"))
    },[checkboxcheck])

    useEffect(()=>{
        //const lclStrArr = localStorage.setItem("arr" , JSON.stringify(arr))

        // if(localStorage.getItem("arr") === null) {
        //     console.log("Navigate to front")
        //     navigate('/cart')
        // }
        // // if(arr.length > 0){
        // //     console.log("The length is high")
        // //     //localStorage.setItem("arr" , JSON.stringify(arr))
        // //     //localStorage.setItem("totalprice" , totalprice + vatValue+GST + ins)
        // // }
        // if(localStorage.getItem("arr" === null) ){
        //     navigate('/cart')
        // }
    },[])

    
    const isPaylpalBtnDisable = () => {
        if(cardNameFlag && cardNumberFlag && cvvFlag && expiryFlag){
            console.log(cardNameFlag + " " + cardNumberFlag + " " + cvvFlag + " " + expiryFlag)
            return false;
        }
        return true
    }
    console.log(productState)
    return (
        
        <div className="container payment pb-10 mb-10">

            <div className="mt-4">
                <Typography variant="h6" className="text-color" fontWeight="bold">
                    Payment Information
                </Typography>
            </div>
            <div className="mt-1 mb-3 d-flex row g-3">
                <div className="col-sm-4">
                    
                   <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Description</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >Total Item Price</td>
                                <td>${totalprice}</td>
                            </tr>
                            <tr>
                                <td>Vat </td>
                                <td>${vatValue}</td>
                            </tr>
                            <tr>
                                <td>GST</td>
                                <td>${GST}</td>
                            </tr>
                            <tr>
                                <td>Insurance</td>
                                <td>${ins}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>${totalprice + vatValue + GST + ins}</td>
                            </tr>
                        </tbody>
                    </table>
                            
                </div>

                <div className="col-sm-8">
                    <div className="mt-10">
                         <h4 style={{color:"#ffffff"}}>________</h4>
                        <Typography variant="h6" color="light" fontWeight="bold">
                            Insurance Coverage
                         </Typography>
                    </div>
                    <div>

                        <div className="mb-2">Our platform will provide the insurance on the product that you buy from us.It will cover various types of damages includes broken items,dent,scratch, etc.</div>
                        <div>So our insurance prices includes 10% of your overall purchase and it will added to your total payment on the paypal page.You will get a short email after paymet.</div>
                        
                    </div>
                    <div className="form-check mt-3">
                                <input id="cc" type="checkbox" name="typesOfPayment" className="form-check-input" onChange={e => changeinsurance(e)}></input>
                                <label className="fw-bold">Yes,I want insurance of my rental equipment</label>
                    </div>
                    
                </div>
            </div>
            <PaypalCheckoutButton product={productState} disabled={isPaypalBtnDisable}/>
            <div className="mt-10">
                <h1 style={{color:"#ffffff"}}>________</h1>
            </div>
            </div>
    )
}

export default Payment;
