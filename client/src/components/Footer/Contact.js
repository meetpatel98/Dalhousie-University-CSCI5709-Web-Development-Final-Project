import rentimage from "../../assets/images/HomeGlobeIcon.jpg";
import {  Link } from 'react-router-dom';
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import React from "react";
import axios from "axios";
import constant from "../../AppConstant.json";

const Contactus = () => {
  
    const navigate = useNavigate();
  
    //Get form values once form is submitted
  const contactForm = (formValues) => {
    console.log("form values are "+formValues);
  
    axios
            .post(constant.BE_URL +"contactUsEmail", {
              data: {
                email: formValues.email,
                subject: "QueryDetails",
                address: formValues.address
              },
            })
            .then(function (response) {
              console.log(response);
              // window.location.reload();
              // localStorage.setItem("email",email)
            })
            .catch(function (error) {
              console.log(error);
            });


    navigate("/signin");
  };
    return (
    //Formik is a library used for form validation  https://formik.org/
      <Formik
        initialValues={defaultValues}
        validationSchema={SignupFormValidation}
        onSubmit={contactForm}
      >
        {(formik) => {
          const {
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleChange,
            handleSubmit,
            handleBlur,
          } = formik;
  
          return (
            <div className="form-container">
           
                <Form onSubmit={handleSubmit}>
                  <h3>Contact Us</h3>
                  
                    <div className="mb-2">
                      <label>First name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Fullname"
                        name="fullname"
                        id="fullname"
                        value={values.fullname}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {errors.fullname && touched.fullname ? (
                        <span className="error-feedback">{errors.fullname}</span>
                      ) : null}
                    </div>
                  
                  <div className="mb-2">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="email"
                      id="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                 {errors.email && touched.email ? (
                        <span className="error-feedback">{errors.email}</span>
                      ) : null}
                  </div>
                  <div className="mb-2">
                    <label>Mobile No</label>
                    <input
                      format="(###) ###-####"
                      type="number"
                      className="form-control"
                      placeholder="Enter mobile no"
                      name="mobileno"
                      id="mobileno"
                      value={values.mobileno}
              onBlur={handleBlur}
                      onChange={handleChange}
                    />
                         {errors.mobileno && touched.mobileno ? (
                        <span className="error-feedback">{errors.mobileno}</span>
                      ) : null}
                  </div>
                  <div className="mb-2">
                    <label>Query Details</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Query Details"
                      row="5"
                      name="address"
                      id="address"
                      value={values.address}
              onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.address && touched.address ? (
                        <span className="error-feedback">{errors.address}</span>
                      ) : null}
                  </div>
                
                  <div className="d-grid pt-2">
                    <center><button type="submit" className="btn btn-secondary"  disabled={! ( dirty && isValid)} >
                      Submit
                    </button></center>
                  </div>
                </Form>
              
            </div>
          );
        }}
      </Formik>
    );
  };
  
  
  
  const defaultValues = {
    fullname: "",
    email: "",
    mobileno: "",
    address: ""
  };
  
  
  
  const SignupFormValidation = Yup.object().shape({
  
    fullname: Yup.string().required("First name is required"),
  
    email: Yup.string().email("Invalid Email").required("Email is required"),
  
    mobileno:Yup.number().required("Mobile no is required"),
  
    address: Yup.string().required("Address is required").max(100,"Maximum 100 characters are allowed"),
  
  });
  
  
  
  
  
  export default Contactus;
  