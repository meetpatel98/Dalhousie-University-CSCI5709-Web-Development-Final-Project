import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import "../Reviews/ProductPage.css";

function Review(props) {
  return (
    <div className="review">
      <MDBContainer>
        <MDBRow>
          <div className="props-title">
            <h2>{props.title}</h2>
          </div>
        </MDBRow>
        <MDBRow>
        <div className="props-star">
            <p>{props.rating}</p>
         </div>
        </MDBRow>
        <MDBRow >
            <div className="props-content">
            <p>{props.content}</p>
            </div>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Review;
