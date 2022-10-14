import React, { useEffect, useState } from "react";
import Review from "./Review";
import "../Reviews/PostedReviews.css";
import { Container } from "@mui/system";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import { Button, Card, Grid } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useStyles from "./Style";
import { useNavigate } from "react-router-dom";
import constant from "../../AppConstant.json";

function PostedOwnerReviews() {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {

    const username = localStorage.getItem('firstname')+" "+localStorage.getItem('lastname');
    axios.get(constant.BE_URL+`review/owner/${username}`).then((response) => {
      setReviewList(response.data);
    });
  }, []);

  return (
    <div>
      <Container>
        <div className="all-posted-reviews-heading">
          <h1>Posted Reviews for Owner  </h1>
        </div>

        {reviewList.map((review) => (
          <div>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Review
                    name={review.userName}
                    date={review.reviewDate.split("T")[0]}
                    initials={
                      review.userName.split(" ")[0].charAt(0).toUpperCase() +
                      review.userName.split(" ")[1].charAt(0).toUpperCase()
                    }
                    title={review.reviewTitle}
                    rating={review.reviewRating}
                    desc={review.reviewDescription}
                  ></Review>
                </Grid>
              </Grid>
            </Card>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default PostedOwnerReviews;
