import "./Forgetpswd.css";
import rentimage from "../../assets/images/HomeGlobeIcon.jpg";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useNavigate,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constant from "../../AppConstant.json";
import axios from "axios";
import bycrypt from "bcryptjs";

const ResetPassword = () => {

  const navigate = useNavigate();
  const tokenString = useParams().token;

//Get form values once form is submitted
const resetpswdForm = async (formValues) => {

    const salt = await bycrypt.genSalt(12);
    const hashedPswd = await bycrypt.hash(formValues.newpassword, salt);


  const bodyData={resetPswdData:{
    email:formValues.email,
    code:tokenString,
    newpassword:hashedPswd
}};


  console.log(bodyData);

    axios.post(constant.BE_URL + "userdetails/resetPassword", bodyData)
      .then(
        response => {
          if (response.data.pswdReset) {
            toast.success(response.data.message);
            navigate("/signin");
          } else {
            toast.error(response.data.message);
          }
        }
      )
      .catch(error => {
        console.error('There was an error!', error);
        toast.error("Error while updating password");
      });
};

  return (
    //Formik is a library used for form validation  https://formik.org/
    <Formik
      initialValues={defaultValues}
      validationSchema={ResetpswdFormValidation}
      onSubmit={resetpswdForm}
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
                <h3>Reset password</h3>
                <div className="mb-3">
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
                  <label>New password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="newpassword"
                    id="newpassword"
                    value={values.newpassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.newpassword && touched.newpassword ? (
                    <span className="error-feedback">{errors.newpassword}</span>
                  ) : null}
                </div>
                <div className="d-grid">
                  
                <center><button
                    type="submit"
                    className="btn btn-secondary"
                    disabled={!(dirty && isValid)}
                  >
                    Reset password
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






const ResetpswdFormValidation = Yup.object().shape({

    email: Yup.string().email("Invalid Email").required("Email is required"),
    newpassword: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be 8 chars minimum")
    .max(12, "Password length is 12 chars maximum")
    .matches(
      /^(?=.*\d)(?=.+[&!$%@?#])[A-Za-z\d!*$%@?&#]{8,12}$/,
      "Password should contains at least one number and special character"
    ),
  
});



const defaultValues = {
    email: "",
    newpassword: "",
  };


export default ResetPassword;