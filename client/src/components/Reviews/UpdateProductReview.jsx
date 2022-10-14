import React, { useEffect, useState } from "react";
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import "../Reviews/CreateReview.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import constant from "../../AppConstant.json";

function UpdateProductReview() {
  const navigate = useNavigate();
  const [reviewRating, setReviewRating] = useState();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("")

  const [reviewList, setReviewList] = useState([]);

  const {id} = useParams()

 const onSubmit=()=>{
      const username = localStorage.getItem('firstname')+" "+localStorage.getItem('lastname');

  navigate(`/review/${username}`);
  window.location.reload();

  const review = {
    userName: username,
    reviewRating: reviewRating,
    reviewTitle: reviewTitle,
    reviewDescription: reviewDescription
  }
  console.log(review);

  axios.put(constant.BE_URL+`product/${id}/review/updateproductreview`, review,)
  .then(res => console.log(res.data))
 }

 useEffect(() => {
    axios.get(constant.BE_URL+`product/find/${id}`).then((response) => {
      setReviewList(response.data);
    });
  }, []);

  return (
    <div>
    
      <MDBContainer>
          <div className="cerate-review-product">
            <h1>Update Product Review</h1>
          </div>
        <hr></hr>
        <MDBRow>
          <MDBCol lg="3" md="2"></MDBCol>
          <MDBCol lg="6" md="8">
            <div className="product-heading">
              
            </div>
            <div className="star-rating">
              <p>Overall Rating</p>
            </div>
            <div className="mb-2">
                  <div>
                    <select
                      id="ratings"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                    >
                      <option value="0">0/5</option>
                      <option value="1">1/5</option>
                      <option value="2">2/5</option>
                      <option value="3">3/5</option>
                      <option value="4">4/5</option>
                      <option value="5">5/5</option>
                    </select>
                  </div>
                  </div>
            <div className="add-heading">
              <h2>Add Heading</h2>
            </div>

            <div className="input">
              <MDBInput type="input"
              
               outline size="lg" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
            </div>

            <div className="add-review">
              <h2>Add Written Review</h2>
            </div>
            <div className="input">
              <MDBInput type="textarea" outline placeholder={reviewList.map((review) => (review.reviewDescription))} value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)} />
            </div>
              <div class="submit-button">
                <button
                  className="btn"
                  onClick={onSubmit}
                  type="submit"
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

export default UpdateProductReview;
