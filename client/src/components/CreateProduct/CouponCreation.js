/**
 *   @author : Rutvik Patel (B00897762)
 *
 *   @description : Front-end form for adding the coupon information
 */

import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constant from "../../AppConstant.json";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CouponCreation() {
  const [open, setOpen] = useState(false);
  const [SnackbarMessage, setSnackbarMessage] = useState(false);
  const [severity, setSeverity] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [expiry_date, setExpiryDate] = useState("");
  const [coupon_amount, setCouponAmount] = useState(0);
  const [coupon_type, setCoupon] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setCoupon(event.target.value);
    console.log(event.target.value);
  };

  const formValidation = (e) => {
    e.preventDefault();
    const coupondata = {
      code: code,
      coupon_type: coupon_type,
      description: description,
      expiry_date: expiry_date,
      coupon_amount: coupon_amount,
    };

    console.log("coupon data");
    console.log(coupondata);

    //calling the api for posting the coupon data
    axios
      .post(constant.BE_URL + "coupondetails/addcoupon", coupondata)
      .then((response) => {
        if (response.data.couponAdded) {
          // toast.success(response.data.message);
          navigate("/addproducts");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("Error while adding the coupon");
      });

    console.log(coupondata);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item md={10} style={{ padding: "90px" }}>
        <Card component={"form"}>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Snackbar open={open} autoHideDuration={6000}>
              <Alert severity={severity} sx={{ width: "100%" }}>
                {SnackbarMessage}
              </Alert>
            </Snackbar>

            <Grid item xs={10} md={5}>
              <Typography
                variant="h3"
                component="div"
                gutterBottom
                className="header"
                sx={{
                  color: "#979AA1",
                }}
              >
                Create Coupon
              </Typography>
            </Grid>

            <Grid item container spacing={2} justifyContent="center">
              <Grid item xs={10} md={4}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Coupon-code"
                  value={code}
                  variant="outlined"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <FormControl sx={{ width: "100%" }} required>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coupon_type}
                    label="Coupon"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Percent-off coupon"}>
                      Percent-off Coupon
                    </MenuItem>
                    <MenuItem value={"Free gift with rent"}>
                      Free Gift with Rent
                    </MenuItem>
                    <MenuItem value={"BOGO coupon"}>BOGO Coupon</MenuItem>
                    <MenuItem value={"Mystery deals"}>Mystery deals</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item container justifyContent="center" spacing={2}>
              <Grid item xs={10} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Description"
                  value={description}
                  multiline
                  aria-label="minimum height"
                  minRows={4}
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Grid item container spacing={2} justifyContent="center">
              <Grid item xs={10} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Expiry Date"
                  value={expiry_date}
                  inputProps={{ type: "date" }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Coupon Amount"
                  value={coupon_amount}
                  inputProps={{ type: "number" }}
                  onChange={(e) => setCouponAmount(e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Grid item sx={10} md={8}>
              <Box>
                <Button
                  className="buttonHover"
                  type="Submit"
                  onClick={formValidation}
                  variant="contained"
                  sx={{
                    margin: 2,
                    color: "white",
                    bgcolor: "text.secondary",
                    hover: "#6c757d",
                    "&:hover": {
                      backgroundColor: "#6c757d",
                    },
                  }}
                >
                  ADD COUPON
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CouponCreation;
