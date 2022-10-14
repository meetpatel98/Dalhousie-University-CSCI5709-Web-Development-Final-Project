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
import React, { Component } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();
  //Get form values once form is submitted
  const onSubmit = (formValues) => {
    navigate("/userprofile");
  };


  const category = [
    { value: "electric", label: "Electric" },
    { value: "garden", label: "Garden" },
    { value: "civil", label: "Civil" },
  ];

  return (
    <section>
      <div class="form-container">
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <div className="card mx-auto">
              <div class="card-body text-center ">
                <img
                  src={user}
                  alt="avatar"
                  className="rounded-circle img-fluid image-size"
                />

                <div className="col-12 form my-2">
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        id="firstName"
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="lastName"
                        id="lastName"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Mobile No"
                        name="mobileno"
                        id="mobileno"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        name="address"
                        id="address"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        id="password"
                      />
                    </div>
                    <Select isMulti options={category} />

                    <div className="d-grid mt-3">
                      <center>
                        <button  onClick={onSubmit} type="submit" className="btn btn-secondary">
                          Update
                        </button>
                      </center>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
