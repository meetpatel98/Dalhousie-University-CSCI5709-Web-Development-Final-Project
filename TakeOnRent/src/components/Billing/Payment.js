import React, { useState } from "react";
import { Box, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const Payment = () => {

    const[cardName , setCardName] = useState("");
    const[cardNumber , setCardNumber] = useState("");
    const[cvv , setCvv] = useState("");
    const[expiryDate , setExpiryDate] = useState("");
    const navigate = useNavigate();

    const[cardNameError , setCardNameError] = useState(false);
    const[cardNumberError , setCardNumberError] = useState(false);
    const[cardCVVError , setcardCVVError] = useState(false);
    const[cardExpiryDateError , setcardExpiryDateError] = useState(false);


    var cardNameFlag = true;
    var cardNumberFlag = true;
    var cvvFlag = true;
    var expiryFlag = true;

   
    const callme = () => {
        
    }

    const [isDisabled, setDisabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        cardNameFlag = true;
        cardNumberFlag = true;
        cvvFlag = true;
        expiryFlag = true;

        setCardNameError(false);
        setCardNumberError(false);
        setcardCVVError(false);
        setcardExpiryDateError(false);

        if(cardName === '' || cardName.length < 3) {
            setCardNameError(true)
            cardNameFlag = false;
        }
        if(cardNumber === '' || cardNumber.length !== 16 || isNaN(cardNumber)){
            setCardNumberError(true)
            cardNumberFlag = false;
        }
        if(cvv === '' || cvv.length !== 3 || isNaN(cvv)) {
            setcardCVVError(true)
            cvvFlag = false;
        }
        if(expiryDate === '' || !expiryDate.includes("/")){
            setcardExpiryDateError(true)
            expiryFlag = false;
        }
        if(cardNameFlag && cardNumberFlag && cvvFlag && expiryFlag){
            console.log("---------")
            swal({
            title: "Payment Sucess!",
            text: "Shortly you will get an Email from us!",
            icon: "success",
            button: "OK",
            });
            setDisabled(true);
            navigate('/Thank')
        }
    }

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
                                <td>$130</td>
                            </tr>
                            <tr>
                                <td>Vat </td>
                                <td>$7.3</td>
                            </tr>
                            <tr>
                                <td>GST</td>
                                <td>$2.77</td>
                            </tr>
                            <tr>
                                <td>Insurance</td>
                                <td>$5</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>$150</td>
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

                        <div className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took </div>
                        <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took </div>
                        
                    </div>
                    <div className="form-check mt-3">
                                <input id="cc" type="checkbox" name="typesOfPayment" className="form-check-input" ></input>
                                <label className="fw-bold">Yes,I want insurance of my rental equipment</label>
                    </div>
                    
                </div>
            </div>
            
        <form className="needs-validation mt-4" noValidate onSubmit={handleSubmit}>
            

                    <div className="mt-4 mb-4">
                         <Typography variant="h6" className="text-color" fontWeight="bold">
                            Payment Details
                        </Typography>
                    </div>
                    <div className="row g-3">
                        <div className="col-sm-4">
                            <div className="form-check">
                                <input id="cc" type="radio" name="typesOfPayment" className="form-check-input" required></input>
                                <label className="fw-bold">Debit Card</label>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="form-check">
                                <input id="cc" type="radio" name="typesOfPayment" className="form-check-input" required></input>
                                <label className="fw-bold">Credit Card</label>
                            </div>
                        </div>
                    </div>


                        <div className="row g-3">
                            <div className="col-sm-4 mt-4">
                                <Box>
                                        <TextField variant="outlined" label="Name on Card" 
                                        placeholder="John Doe" margin="normal" fullWidth
                                        onChange={(e) => setCardName(e.target.value)}
                                        error={cardNameError}
                                        ></TextField>
                                </Box>
                                <div className="invalid-feedback">
                                    Please Enter Valid cardName
                                </div>
                            </div>

                            <div className="col-sm-5 mt-4">
                                <Box>
                                        <TextField variant="outlined" label="Card Number" 
                                        placeholder="1111 2222 3333 4444" margin="normal" fullWidth
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        error={cardNumberError}
                                        ></TextField>
                                </Box>
                                <div className="invalid-feedback">
                                    Please Enter Valid cardName
                                </div>
                            </div>

                        </div>

                         <div className="row g-3">
                            <div className="col-sm-2">
                                <Box>
                                        <TextField variant="outlined" label="CVV" 
                                        placeholder="123" margin="normal" fullWidth
                                        onChange={(e) => setCvv(e.target.value)}
                                        error={cardCVVError}
                                        ></TextField>
                                </Box>
                                <div className="invalid-feedback">
                                    Please Enter Valid CVV
                                </div>
                            </div>

                            <div className="col-sm-2">
                               <Box>
                                        <TextField variant="outlined" label="Expiry Date" 
                                        placeholder="01/23" margin="normal" fullWidth
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        error={cardExpiryDateError}
                                        ></TextField>
                                </Box> <div className="invalid-feedback">
                                    Please Enter Valid Expiry Date
                                </div>
                            </div>
                            <div className="col-sm-4 p-2">
                            <h6>Verified By
                                <i className="fa-brands fa-paypal fa-2x m-2" ></i> 
                            <i className="fa-brands fa-cc-mastercard fa-2x m-2"></i>
                            <i className="fa-brands fa-cc-visa fa-2x m-2"></i>
                            <i className="fa-brands fa-cc-diners-club fa-2x m-2"></i>
                            </h6>
                    
                        </div>
                        </div>

                        

                        <button className="btn btn-outline-secondary mt-4" type="submit" disabled={isDisabled} onSubmit={callme}>Proceed to book</button>
            </form>
            <div className="mt-10">
                <h1 style={{color:"#ffffff"}}>________</h1>
            </div>
            </div>
    )
}

export default Payment;
