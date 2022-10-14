import "./Signin.css";
import rentimage from "../../assets/images/HomeGlobeIcon.jpg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constant from "../../AppConstant.json";
import axios from "axios";

const Signin = () => {

  const navigate = useNavigate();
  //Get form values once form is submitted
  const signinForm = (formValues) => {



    const bodyData = {signindata: {email:formValues.email,password:formValues.password}}

    axios.post(constant.BE_URL + "userdetails/signin", bodyData)
      .then(
        response => {
          if (response.data.userLogin) {
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("userid",response.data.userDetails.useId);
            localStorage.setItem("firstname",response.data.userDetails.firstName);
            localStorage.setItem("lastname",response.data.userDetails.lastName);
            localStorage.setItem("emailAddress",response.data.userDetails.emailAddress);
            localStorage.setItem("documentId",response.data.userDetails._id);

             localStorage.setItem("userdetails",response.data.userDetails);
            toast.success(response.data.message);
            
            //navigate("/userprofile");
            window.location.href = '/products';
          } else {
            toast.error(response.data.message);
          }
        }
      )
      .catch(error => {
        console.error('There was an error!', error);
        toast.error("Error while login into useraccount");
      });
  };


  return (
    //Formik is a library used for form validation  https://formik.org/
    <Formik
      initialValues={defaultValues}
      validationSchema={SigninFormValidation}
      onSubmit={signinForm}
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
                <h3>Sign In</h3>
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

                <div className="mb-3">
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
                </div>

                <div className="d-grid">

                  <center><button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={!(dirty && isValid)}
                  >
                    Sign In
                  </button></center>
                </div>
                <p className="forget-password text-left">
                  <center><a href="/forgetpswd">Forget password?</a></center>
                </p>
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




const SigninFormValidation = Yup.object().shape({

  email: Yup.string().email("Invalid Email").required("Email is required"),

  password: Yup.string().required("Password is required")

});



const defaultValues = {
  email: "",
  password: "",
};


export default Signin;