import "./Forgetpswd.css";
import rentimage from "../../assets/images/HomeGlobeIcon.jpg";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Forgetpswd = () => {

  const navigate = useNavigate();

//Get form values once form is submitted
const forgetpswdForm = (formValues) => {
  navigate("/signup");
};

  return (
    //Formik is a library used for form validation  https://formik.org/
    <Formik
      initialValues={defaultValues}
      validationSchema={ResetpswdFormValidation}
      onSubmit={forgetpswdForm}
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
                <h3>Forget password</h3>
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
                    Send reset password link
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
  
});



const defaultValues = {
    email: "",
    password: "",
  };


export default Forgetpswd;