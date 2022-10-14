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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = useState(false);
  const [SnackbarMessage, setSnackbarMessage] = useState(false);
  const [severity, setSeverity] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [expiry_date, setExpiryDate] = useState(0);
  const [coupon_amount, setCouponAmount] = useState(0);
  const [coupon, setCoupon] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setCoupon(event.target.value);
  };

  const navigate = useNavigate();

  const formValidation = () => {
    console.log(code + description + expiry_date + coupon_amount);
    if (
      category.length > 0 &&
      coupon.length > 0 &&
      code.length > 0 &&
      description.length > 0 &&
      coupon_amount > 0
    ) {
      setSnackbarMessage("Coupon created Successfully!!");
      setSeverity("success");
      setOpen(true);
      navigate("/addproducts");
    } else {
      setSnackbarMessage("Please fill all the required fields");
      setSeverity("error");
      setOpen(true);
    }
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
                    value={coupon}
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
                    }
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

export default AddProduct;
