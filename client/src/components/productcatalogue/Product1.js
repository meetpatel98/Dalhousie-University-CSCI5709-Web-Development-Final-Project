import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import data from '../../data';

import { Card, Typography } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { Stack } from '@mui/material';
import Review from "../Reviews/Review";	
import Notes from "../Reviews/notes";	
import { ProgressBar } from 'react-bootstrap';	
import { useNavigate } from "react-router-dom";	
import "../Reviews/ProductPage";	
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";	
import constant from "../../AppConstant.json";
export default function Product1(props) {

  const { products } = data;
  const params = useParams();
  const [pro, setProduct] = React.useState([]);
  const [finalErrorMessage, setFinalErrorMessage] = React.useState("");
  const { onAdd } = props;
  let navigate = useNavigate();
  const {id} = useParams()
  const [reviewList, setReviewList] = useState([])
 
  useEffect(() => {
    //UseEffect will only call once
    fetch(constant.BE_URL+`productdetails/product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((product) => {
        
        if (product.success === true) {
          setProduct(product.productRecord);
        } else {
          setFinalErrorMessage(product.message);
        }
      });

      axios.get(constant.BE_URL+`product/${id}`).then((response) => {
        setReviewList(response.data)
      })

  }, [pro]);
  
const productdetail=pro


  return (
    <div>
    <Card sx={{ Width: 1400, Height: 1000 }} className="margin">
      <CardActionArea>

        <img className="product" src={productdetail.productimage} alt={productdetail.name}   ></img>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='margin'>
            {productdetail.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            $ {productdetail.rentamount}
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
          <Typography variant="body2" color="text.secondary">
            {productdetail.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack spacing={2} direction="row">
          <Button sx={{
            backgroundColor: "#979AA1",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#6c757d",
            }
          }} onClick={() => onAdd(productdetail)}>Add To Cart</Button>
        </Stack>
      </CardActions>
    </Card>
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
                  navigate(`/product/${params.id}/review/createproductreview`);
                }}
              >
                <h5>Write a product review</h5>
              </button>
            </div>
            <div class="btn-leave-seller-feedback">
              <button
                className="btn"
                onClick={() => {
                  navigate(`/product/${params.id}/review/createownerreview`);
                }}
              >
                <h5>Leave a seller feedback</h5>
              </button>
            </div>
            <div class="btn-all-posted-reviews">
              <button
                className="btn"
                onClick={() => {
                  const username = localStorage.getItem('firstname')+" "+localStorage.getItem('lastname');
                  navigate(`/review/${username}`);
                }}
              >
                <h5>All Posted Reviews</h5>
              </button>
            </div>
            <div class="btn-all-posted-reviews">
              <button
                className="btn"
                onClick={() => {
                  const username = localStorage.getItem('firstname')+" "+localStorage.getItem('lastname');
                  navigate(`/review/owner/${username}`);
                }}
              >
                <h5>Posted Review for Owner</h5>
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
            {reviewList.map((review) => (
              <Review
                key={review.key}
                date={review.reviewDate.split('T')[0]}
                initials={review.userName.split(' ')[0].charAt(0).toUpperCase()+review.userName.split(' ')[1].charAt(0).toUpperCase()}
                name={review.userName}
                title={review.reviewTitle}
                rating={review.reviewRating}
                desc={review.reviewDescription}
              />
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
</div>
  )
}
