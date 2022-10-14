import React from "react";
import { useState } from "react";

import swal from 'sweetalert';


import Typography from '@mui/material/Typography';
import { Box, TextField,FormControl,InputLabel,Select,MenuItem} from "@mui/material";



const DetailForm = () => {

    const[firstName , setFirstName] = useState("");
    const[lastName , setLastName] = useState("");
    const[email , setEmail] = useState("");
    const[phoneNumber , setPhoneNumber] = useState("");

    const[address , setAddress] = useState("");
    const[country , setCountry] = useState(1);
    const[state , setState] = useState("");
    const[postalCode , setPostalCode] = useState("");

    const[firstNameError , setFirstNameError] = useState(false);
    const[lastNameError , setLastNameError] = useState(false);
    const[emailError , setEmailError] = useState(false);
    const[phoneNumberError , setPhoneNumberError] = useState(false);

    const[addressError , setAddressError] = useState(false);

    const[stateError , setStateError] = useState(false);
    const[postalCodeError , setPostalCodeError] = useState(false);

    var firstNameFlag = true;
    var lastNameFlag = true;
    var phoneNumnerFlag = true;
    var emailFlag = true;

    const [isDisabled, setDisabled] = useState(false);


    const handleCountryChange = (e) => {
        console.log(e.target.value);
        setCountry(e.target.value);
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        firstNameFlag = true;
        lastNameFlag = true;
        phoneNumnerFlag = true;
        emailFlag = true;
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPhoneNumberError(false);
        setAddressError(false);
       
        setStateError(false);
        setPostalCodeError(false);
        

        if(firstName === '' || firstName.length < 3) {
            setFirstNameError(true)
            firstNameFlag = false;
        }
        if(lastName === '' || lastName.length < 3){
            setLastNameError(true)
            lastNameFlag = false;
        }
        if(email === '' || !email.includes("@") || (email.indexOf("@") < email.length - 1)===false ||(email.includes(".")===false) || (email.indexOf("@") > 0)===false ) {
            setEmailError(true)
            emailFlag = false;
        }
        if(phoneNumber === '' || phoneNumber.length !== 10 || isNaN(phoneNumber)){
            setPhoneNumberError(true)
            phoneNumnerFlag = false;
        }
        if(address === '' || address.length < 10) {
            setAddressError(true)
        }
        
        if(state === '') {
            setStateError(true)
        }
        if(postalCode === ''){
            setPostalCodeError(true)
        }
        

        if(firstNameFlag && lastNameFlag && phoneNumnerFlag && emailFlag && address && state && postalCode){
            swal({
            title: "Address Added!",
            text: "Now you can fill up payment form!",
            icon: "success",
            button: "Payment form!",
            });
            setDisabled(true);
        }

        // if(firstNameError && lastName && email && phoneNumber && address && state && postalCode){
        //     console.log("---------")
        //     swal({
        //     title: "Address Added!",
        //     text: "Now you can fill up payment form!",
        //     icon: "success",
        //     button: "Payment form!",
        //     });
        //     setDisabled(true);
        // }    
    }

    return (
        <div className="container">
            <h3 className="mb-4 pt-3">Billing Details</h3>

            <Typography variant="h6" className="text-color" fontWeight="bold">
                    Saved Address
            </Typography>

            <div className="row g-3 pt-2 pb-4">
                   <div className="col-sm-4">
                        <div className="form-check  pd-5">
                            <div className="p-10 ">
                                <input id="cc" type="radio" name="typesOfPayment" className="form-check-input" ></input>
                                <label  className="fw-bold">Address 1</label>
                                <br/>
                                <label  className="fw-bold">5214 Gerrish Street halifax Nova Scotia</label>
                            </div> 
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="form-check  pd-5">
                            <div className="p-10 ">
                                <input id="cc" type="radio" name="typesOfPayment" className="form-check-input" ></input>
                                <label  className="fw-bold">Address 2</label>
                                <br/>
                                <label  className="fw-bold">5214 Gerrish Street halifax Nova Scotia</label>
                            </div>
                                
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="form-check pd-5">
                            <div className="p-10">
                                <input id="cc" type="radio" name="typesOfPayment" className="form-check-input "  ></input>
                                <label  className="fw-bold">New Address</label>
                                <br/>
                            </div>
                                
                        </div>
                    </div>
                </div>

                <form className="needs-validation" >
                    <Typography variant="h6" fontWeight="bold" className="mb-2 text-color">
                        Personal Information
                    </Typography>
                <div className="row g-2">
                    <div className="col-sm-6">
                       <Box>
                            <TextField variant="outlined" label="First Name" 
                            placeholder="John" margin="normal" fullWidth
                            onChange={(e) => setFirstName(e.target.value)}
                            error={firstNameError}
                            ></TextField>
                        </Box>
                        <div className="valid-feedback">
                            Looks Good!
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <Box>
                            <TextField variant="outlined" label="Last Name" 
                            placeholder="Doe" margin="normal" fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                            error={lastNameError}
                            ></TextField>
                        </Box> <div className="valid-feedback">
                            Looks Good!
                        </div>
                    </div>

                    <div className="col-sm-6">
                        {/* <label className="form-label fw-bold text-muted">Phone Number</label><i className="fa-solid fa-phone px-2"></i>
                        <input id="Phonenumber" type = "number" class="form-control" placeholder="Enter Phone Number" required></input> */}
                        <Box>
                            <TextField variant="outlined" label="Phone Number  📞" 
                            placeholder="Doe" margin="normal" fullWidth
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            error={phoneNumberError}
                            ></TextField>
                        </Box> <div className="valid-feedback"></div>
                        
                        <div className="invalid-feedback">
                            Please Enter Valid Phonenumber
                        </div>
                    </div>

                    <div className="col-sm-6">
                       <Box>
                            <TextField variant="outlined" label="Email Address 📭" 
                            placeholder="Doe" margin="normal" fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                            ></TextField>
                        </Box> 
                        <div className="valid-feedback"></div> <div className="invalid-feedback">
                            Please Enter Valid Email
                        </div>
                    </div>

                </div>

                        <Typography variant="h6" fontWeight="bold" className="mt-4 text-color">
                            Address Information
                        </Typography>

                        <Box>
                            <TextField variant="outlined" label="Address For Delivery" 
                            placeholder="Beverly Hills " margin="normal" fullWidth
                            onChange={(e) => setAddress(e.target.value)}
                            error={addressError}
                            ></TextField>
                        </Box> 

                         <div className="invalid-feedback">
                            Please Enter Valid Email
                        </div>

                        <div className="row g-3">
                            <div className="col-sm-4">

                                <FormControl fullWidth className="mt-3">
                                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={country}
                                        label="Country"
                                        onChange={handleCountryChange}
                                    >
                                    <MenuItem value={1}>America 🇺🇸</MenuItem>
                                    <MenuItem value={2}>Canada 🇨🇦</MenuItem>
                                    <MenuItem value={3}>Mexico 🇲🇽</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-sm-4">
                                <TextField variant="outlined" label="State" 
                            placeholder="California" margin="normal" fullWidth
                                onChange={(e) => setState(e.target.value)}
                                error={stateError}
                            >
                            </TextField>
                                 <div className="invalid-feedback">
                                    Please Enter Valid State
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <TextField variant="outlined" label="Postal Code" 
                                    placeholder="B4L3K3" margin="normal" fullWidth
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    error={postalCodeError}
                                    >
                                </TextField>
                                  <div className="invalid-feedback">
                                    Please enter valid postalcode
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline-secondary mt-4" type="submit" onClick={handleSubmit} disabled={isDisabled}>Add new Address</button>
            </form>

        </div>
    )
}

export default DetailForm;