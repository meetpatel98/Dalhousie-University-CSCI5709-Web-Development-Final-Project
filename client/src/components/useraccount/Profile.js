import user from "../../assets/images/user.jpg";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDungeon,
  faEnvelope,
  faLocationPin,
  faMessage,
  faMobilePhone,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import React, { Component, useState, useEffect } from "react";
// import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constant from "../../AppConstant.json";
import axios from "axios";

let preferenceValues=[];

const Profile = () => {

  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState([]);

  const [preference, setPreference] = useState([]);

  // const [firstNameState, setFirstName] = useState("");
  // const [lastNameState, setLastName] = useState("");
  // const [mobilenoState, setMobileno] = useState("");
  // const [address, setAddress] = useState("");
  const [profileDefaulValue, setProfileDefaulValue] = useState({
    firstName: "",
    lastName: "",
    mobileno: "",
    address: "",
    preference:[]
  });
  const [documentId, setDocumentId] = useState("");
  // let firstNameValue = "";
  // let lastNameValue = "";
  // let mobileNoValue = "";  
  // let addressValue = "";

  //Get form values once form is submitted
  const onSubmit = (formValues) => {
    // navigate("/userprofile");

    let prefStr = "";
    preference.forEach(preference => {
      prefStr = prefStr + preference.value + ",";
    });
    prefStr = prefStr.slice(0, -1);


    const dataToBeUpdate = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      mobileNo: formValues.mobileno,
      address: formValues.address,
      profileImage: profilePic,
      documentId: documentId,
      userPreference:prefStr
    }


    let token=localStorage.getItem("token");

    axios.post(constant.BE_URL + "userdetails/updateProfileDetails", dataToBeUpdate, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(
        response => {
          toast.success("User details updated succesfully");
          window.location.href = '/userprofile';
        }
      )
      .catch(error => {
        console.error('There was an error!', error);
        toast.error("Error while retreiving updated profile details");
      });

  };



  // const defaultValues = {
  //   firstName: firstNameState,
  //   lastName: lastNameState,
  //   mobileno: mobilenoState,
  //   address: address
  // };


  useEffect(() => {





    const bodyData = { userId: localStorage.getItem("userid") }

    let token=localStorage.getItem("token");
    axios.post(constant.BE_URL + "userdetails/getDataByUserId", bodyData,{ headers: {"Authorization" : `Bearer ${token}`} })
      .then(
        response => {
          setProfileDefaulValue({
            firstName: response.data.userData.firstName,
            lastName: response.data.userData.lastName,
            mobileno: response.data.userData.mobileNo,
            address: response.data.userData.address
          });
          setDocumentId(response.data.userData._id);
          setProfilePic(response.data.userData.profileImage);
          localStorage.setItem("username", response.data.userData.firstName + response.data.userData.lastName);

          let profielDataString = response.data.userData.userPreference;
      if (profielDataString) {
        preferenceValues=[];

        let preferenceArray = profielDataString.split(",");

        for (let index = 0; index < preferenceArray.length; index++) {

          let preferenceJson = { value: preferenceArray[index], label: preferenceArray[index].toString().toUpperCase() };
    
          preferenceValues.push(preferenceJson);
        }
        setPreference(preferenceValues);
      }


        }
      )
      .catch(error => {
        console.error('There was an error!', error);
        toast.error("Error while login into useraccount");
      });

  }, [])


  const category = [
    { value: "electric", label: "Electric" },
    { value: "garden", label: "Garden" },
    { value: "civil", label: "Civil" },
  ];



  const profileFormValidation = Yup.object().shape({

    firstName: Yup.string().required("First name is required"),

    lastName: Yup.string().required("Last name is required"),

    mobileno: Yup.number().required("Mobile no is required"),

    address: Yup.string()
      .required("Address is required")
      .max(100, "Maximum 100 characters are allowed"),

  });




  const ProfileForm = ({
    values,
    errors,
    touched,
    isValid,
    dirty,
    handleChange,
    handleSubmit,
    handleBlur,
    setProfilePic,
    profilePic,
    setPreference,
    preference
  }) => {

    const fileUpload = (
      file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    };


    const phandleChange = (
      newValue) => {
      console.group('Value Changed');
      setPreference(newValue)
    };

    return (
      <section>
        <div class="form-container">
          <div class="row justify-content-center">
            <div class="col-lg-4">
              <div className="card mx-auto">
                <div class="card-body text-center ">
                  <img
                    src={profilePic}
                    alt="no profile pic"
                    className="rounded-circle img-fluid image-size"
                  />

                  <div className="col-12 form my-2">
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
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

                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
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
                      <div className="mb-3">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Mobile No"
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
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
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
                      <div className="mb-3">
                        <input
                          type="file"
                          className="form-control-file"
                          placeholder="Upload profile picture"
                          name="file"
                          onChange={(event) => { fileUpload(event.currentTarget.files[0]) }}
                        />
                      </div>
                      {/* <Select isMulti options={category} /> */}
                      <CreatableSelect
                        isMulti
                        value={preference}
                        options={preferenceValues}
                        onChange={phandleChange}
                        name="preference"
                      />

                      <div className="d-grid mt-3">
                        <center>
                          <button type="submit" className="btn btn-secondary" disabled={!(isValid)}>
                            Update
                          </button>
                        </center>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };





  return (
    //Formik is a library used for form validation  https://formik.org/
    <Formik
      initialValues={profileDefaulValue}
      validationSchema={profileFormValidation}
      enableReinitialize={true}
      onSubmit={onSubmit}
      component={(props) => <ProfileForm {...props} setProfilePic={setProfilePic} profilePic={profilePic} 
      setPreference={setPreference} preference={preference}
      ></ProfileForm>} />
  );

};





export default Profile;
