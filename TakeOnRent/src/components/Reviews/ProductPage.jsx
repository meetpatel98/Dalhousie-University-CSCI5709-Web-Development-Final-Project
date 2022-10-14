import React from "react";
import Review from "./Review";
import Notes from "./notes";
import { ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../Reviews/ProductPage";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

function ProductPage() {
  let navigate = useNavigate();
  return (
    <div>
      <MDBContainer>
        <MDBRow className="product-img-desc">
          <MDBCol lg="4" md="12" className="prduct-image-left">
            <img src={require("../../assets/images/product.jpg")} alt="product" />
          </MDBCol>

          <MDBCol lg="8" md="12" className="prduct-description">
            <h1>
              Warehouse Forklift, 10,000 lbs.-12,500 lbs., Electric Powered
            </h1>
            <p>
              Lift stock, pallets and other loads easily and securely with this
              warehouse forklift. This heavy-duty lift truck has a maximum
              capacity of 12,500 lbs. It is easy to use and durable. You can
              trust United Rentals with all your material handling needs.
            </p>
            <ul>
              <li>2-stage mast for high visibility</li>
              <li>36V, 48V, 80V power supply</li>
              <li>Travel speed up to 9.4 mph under full load</li>
              <li>Full lift load of up to 71 feet per minute</li>
              <li>Add this warehouse forklift to your cart now</li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <br></br>
      <br></br>
      <br></br>
      <hr></hr>
      <MDBContainer>
        <div className="customer-review">
          <h2>Customers Reviews</h2>
        </div>
      </MDBContainer>

      <MDBContainer>
        <MDBRow>
          <MDBCol lg="4" md="12">
          <MDBContainer>
            <div className="title-heading">
              <h1>Ratings</h1>
            </div>
            <div className="star-container">
              <div class="star">5 Star</div>
              <div class="progress">
                <ProgressBar now={40} />
              </div>
            </div>
            <div className="star-container">
              <div class="star">4 Star</div>
              <div class="progress">
                <ProgressBar now={60} />
              </div>
            </div>

            <div className="star-container">
              <div class="star">3 Star</div>
              <div class="progress">
                <ProgressBar now={20} />
              </div>
            </div>

            <div className="star-container">
              <div class="star">2 Star</div>
              <div class="progress">
                <ProgressBar now={90} />
              </div>
            </div>

            <div className="star-container">
              <div class="star">1 Star</div>
              <div class="progress">
                <ProgressBar now={30} />
              </div>
            </div>

            </MDBContainer>

            <hr></hr>
          <MDBContainer>
            <div className="title-heading">
              <h1>Review this product</h1>
            </div>

            <div className="share-thoughts">
              <h5>Share your thought with other customers</h5>
            </div>

            <div class="btn-customer-review">
              <button
              className="btn"
                onClick={() => {
                  navigate("/createproductreview");
                }}
              >
                <h5>Write a product review</h5>
              </button>
            </div>
            <div class="btn-leave-seller-feedback">
              <button
                className="btn"
                onClick={() => {
                  navigate("/createownerreview");
                }}
              >
                <h5>Leave a seller feedback</h5>
              </button>
            </div>
            <div class="btn-all-posted-reviews">
              <button
                className="btn"
                onClick={() => {
                  navigate("/productreviews");
                }}
              >
                <h5>All Posted Reviews</h5>
              </button>
            </div>
            {/* <div class="btn-analytics">
              <button
                className="btn"
                onClick={() => {
                  navigate("/analytic");
                }}
              >
                <h5>Analytics</h5>
              </button>
            </div> */}
            </MDBContainer>
          </MDBCol>

          <MDBCol lg="8" md="12" className="prduct-description">
            <MDBRow>
              <div className="title-heading-recent-reviews">
                <h1>Most Recent Reviews</h1>
              </div>
            </MDBRow>
            {Notes.map((review) => (
              <Review
                key={review.key}
                title={review.title}
                rating={review.rating}
                content={review.content}
              />
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProductPage;
