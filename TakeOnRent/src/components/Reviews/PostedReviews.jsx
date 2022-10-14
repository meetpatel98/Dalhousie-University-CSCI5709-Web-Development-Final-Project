import React from "react";
import Review from "./Review";
import Notes from "./notes";
import "../Reviews/PostedReviews.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

function PostedReviews() {
  return (
    <div>
      <MDBContainer>

          <div className="all-posted-reviews-heading">
            <h1>All Posted Reviews</h1>
          </div>

        <hr></hr>
        <br></br>
        <MDBRow>
          <MDBCol lg="3" md="2"></MDBCol>
          <MDBCol lg="6" md="8" className="prduct-description">
          {Notes.map((review) => (
              <Review
                key={review.key}
                title={review.title}
                rating={review.rating}
                content={review.content}
              />
            ))}
          </MDBCol>
          <MDBCol lg="3" md="2"></MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default PostedReviews;
