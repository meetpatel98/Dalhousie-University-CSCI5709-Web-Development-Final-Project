import "./Signup.css";
import rentimage from "../../assets/images/HomeGlobeIcon.jpg";
import {  Link } from 'react-router-dom';
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  
  const navigate = useNavigate();


  //Get form values once form is submitted
const signupForm = (formValues) => {
  console.log("form values are "+formValues);
  navigate("/productpage");
};
  return (
  //Formik is a library used for form validation  https://formik.org/
    <Formik
      initialValues={defaultValues}
      validationSchema={SignupFormValidation}
      onSubmit={signupForm}
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
          <div className="form-container row">
            <div className="col-md-6 form">
              <Form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
               
                  <div className="mb-2">
                    <label>First name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.firstName && touched.firstName ? (
                      <span className="error-feedback">{errors.firstName}</span>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label>Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      name="lastName"
                      id="lastName"
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                      {errors.lastName && touched.lastName ? (
                      <span className="error-feedback">{errors.lastName}</span>
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
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
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
                <div className="mb-2">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    id="password"
                    value={values.password}
		    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                    {errors.password && touched.password ? (
                      <span className="error-feedback">{errors.password}</span>
                    ) : null}
                </div>
                <div className="d-grid pt-2">
                  <center><button type="submit" className="btn btn-secondary"  disabled={! ( dirty && isValid)} >
                    Sign Up
                  </button></center>
                </div>
                <p className="existing-user text-left">
                  <center>Already a user? <Link to="/signin">sign in</Link></center>
                  
                </p>
              </Form>
            </div>
{/* rent logo has been taken from the "https://www.freepik.com/free-vector/renting-electronic-device-renting-electronics-website-new-device-rent-terms-use-conditions-gadget-rental-test-equipment-lease_13450501.htm#query=equipment%20rental&position=12&from_view=search" */}
            <div className="col-md-6">
              <img  src={rentimage} width="111.5%" />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};



const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobileno: "",
  address: "",
  password: "",
};



const SignupFormValidation = Yup.object().shape({

  firstName: Yup.string().required("First name is required"),

  lastName: Yup.string().required("Last name is required"),

  email: Yup.string().email("Invalid Email").required("Email is required"),

  mobileno:Yup.number().required("Mobile no is required"),

  address: Yup.string().required("Address is required").max(100,"Maximum 100 characters are allowed"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be 8 chars minimum")
    .max(12, "Password length is 12 chars maximum")
  .matches(/^(?=.*\d)(?=.+[&!$%@?#])[A-Za-z\d!*$%@?&#]{8,12}$/,"Password should contains at least one number and special character" )


});





export default Signup;
