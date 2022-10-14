import React from "react";
import { Rating } from "react-simple-star-rating";
import "../Reviews/CreateReview.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import { useNavigate } from "react-router-dom";

function CreateOwnerReview() {

  const navigate = useNavigate();
  //Get form values once form is submitted
  const onSubmit = (formValues) => {
    navigate("/productreviews");
  };
  

  return (
    <div>
      <MDBContainer>
        <div className="cerate-review-product">
          <h1>Create Owner Review</h1>
        </div>

        <hr></hr>
        <MDBRow>
          <MDBCol lg="3" md="2"></MDBCol>
          <MDBCol lg="6" md="8">
            <div className="product-heading">
              <h2>Appario Retail Private LTD</h2>
            </div>
            <div className="star-rating">
              <p>Overall Rating</p>
            </div>
            <div className="rating">
              <Rating />
            </div>

            <div className="add-heading">
              <h2>Add Heading</h2>
            </div>

            <div className="input">
              <MDBInput type="input" outline size="lg" />
            </div>

            <div className="add-review">
              <h2>Add Written Review</h2>
            </div>
            <div className="input">
              <MDBInput type="textarea" outline />
            </div>

            <div class="submit-button">
              <button
                className="btn"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
            <MDBCol lg="3" md="2"></MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default CreateOwnerReview;
