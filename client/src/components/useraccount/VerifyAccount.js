import "./VerifyAccount.css";
import rentimage from "../../assets/images/HomeGlobeIcon.jpg";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constant from "../../AppConstant.json";

const VerifyAccount=()=>{

const navigate = useNavigate();
const tokenString = useParams().id;


//Get form values once form is submitted
const verifyAccount = (formValues) => {

    const bodyData={verificationData:{
        email:formValues.email,
        tokenString:tokenString
    }};


    axios.post(constant.BE_URL+"userdetails/verifyAccount", bodyData)
    .then(
      response => {
        if(response.data.userVerified){
          toast.success(response.data.message);
          navigate("/signin");

        }else{
          toast.error(response.data.message);
        }        
      }
      )
    .catch(error => {
        console.error('There was an error!', error);
        toast.error("Error while verifiying user account");
    });
  };
  
    return (
      //Formik is a library used for form validation  https://formik.org/
      <Formik
        initialValues={defaultValues}
        validationSchema={validation}
        onSubmit={verifyAccount}
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
                  <h3>Verify Account</h3>
                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                      type="text"
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
                  <div className="d-grid">
                    
                  <center><button
                      type="submit"
                      className="btn btn-secondary"
                      disabled={!(dirty && isValid)}
                    >
                      Verify Account
                    </button></center>
                  </div>
                
                </Form>
                </div>
  {/* rent image has been taken from the "https://www.freepik.com/free-vector/renting-electronic-device-renting-electronics-website-new-device-rent-terms-use-conditions-gadget-rental-test-equipment-lease_13450501.htm#query=equipment%20rental&position=12&from_view=search" */}
                <div className="col-md-6">
                <img src={rentimage} width="111.5%" />
              </div>
            </div>
          );
        }}
      </Formik>
    );
};





const validation = Yup.object().shape({

    email: Yup.string().email("Invalid Email").required("Email is required"),
  
});



const defaultValues = {
    email: "",
  };
export default VerifyAccount;