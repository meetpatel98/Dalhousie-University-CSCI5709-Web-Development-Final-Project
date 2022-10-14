/**
 *   @author : Rutvik Patel (B00897762)
 *
 *   @description : Front-end form for adding the equipment information
 */

import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { palette } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constant from "../../AppConstant.json";
import axios from "axios";

function AddProduct() {
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = useState(false);
  const [SnackbarMessage, setSnackbarMessage] = useState(false);
  const [severity, setSeverity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rentamount, setRentAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [securitydeposit, setDeposit] = useState(0);
  const [availablefordays, setAvailableFor] = useState(0);
  const [coupon_type, setCoupon] = useState("");
  const [productimage, setImage] = useState([]);
  const [userid, setuserId] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    setuserId(localStorage.getItem("userid"));
  }, []);

  const handleChangeCoupon = (event) => {
    setCoupon(event.target.value);
  };

  const fileUpload = (file) => {
    console.log("uploaded file");
    console.log(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      console.log("file uploaded");
    };
    reader.readAsDataURL(file);
  };

  const navigate = useNavigate();

  const formValidation = (e) => {
    e.preventDefault();
    const productdata = {
      userid: userid,
      name: name,
      description: description,
      productimage: productimage,
      category: category,
      quantity: quantity,
      rentamount: rentamount,
      address: address,
      securitydeposit: securitydeposit,
      availablefordays: availablefordays,
      coupon_type: coupon_type,
    };

    console.log("Product data");
    //calling the api for posting the equipment data
    axios
      .post(constant.BE_URL + "productdetails/addproducts", productdata)
      .then((response) => {
        if (response.data.productAdded) {
          // toast.success(response.data.message);
          navigate("/products");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error("Error while adding the product");
      });
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item md={10} style={{ padding: "55px" }}>
        <Card component={"form"}>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Snackbar open={open} autoHideDuration={6000}>
              <Alert severity={severity} sx={{ width: "100%" }}>
                {SnackbarMessage}
              </Alert>
            </Snackbar>
            <Grid item xs={12} md={5}>
              <Typography
                variant="h3"
                component="div"
                gutterBottom
                className="header"
                sx={{
                  color: "#979AA1",
                }}
              >
                Add Equipment
              </Typography>
            </Grid>

            <Grid item container spacing={2} justifyContent="center">
              <Grid item xs={10} md={4}>
                <TextField
                  fullwidth
                  id="outlined-basic"
                  label="Name"
                  value={name}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <FormControl sx={{ width: "100%" }} required>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Agricultural_equipment"}>
                      Agricultural equipment
                    </MenuItem>
                    <MenuItem value={"Audio_equipment"}>
                      Audio equipment
                    </MenuItem>
                    <MenuItem value={"Electrical_equipment"}>
                      Electrical equipment
                    </MenuItem>
                    <MenuItem value={"Hiking_equipment"}>
                      Hiking equipment
                    </MenuItem>
                    <MenuItem value={"Medical_equipment"}>
                      Medical equipment
                    </MenuItem>
                    <MenuItem value={"HouseHold_equipment"}>
                      Household equipment
                    </MenuItem>
                    <MenuItem value={"Construction_equipment"}>
                      Construction equipment
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item container spacing={2} justifyContent="center">
              <Grid item xs={10} md={8}>
                <Button
                  fullWidth
                  className="uploadImage"
                  variant="outlined"
                  // onChange={onImageChange}
                  accept="productimage"
                  value={productimage}
                >
                  {" "}
                  <input
                    type="file"
                    name="file"
                    required
                    onChange={(e) => {
                      fileUpload(e.currentTarget.files[0]);
                    }}
                  />{" "}
                </Button>
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
                  label="Quantity"
                  value={quantity}
                  sx={{ width: "100%" }}
                  inputProps={{ type: "number" }}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Rent Amount"
                  value={rentamount}
                  inputProps={{ type: "number" }}
                  sx={{ width: "100%" }}
                  onChange={(e) => setRentAmount(e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Grid item container justifyContent="center" spacing={2}>
              <Grid item xs={10} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Address"
                  value={address}
                  multiline
                  aria-label="minimum height"
                  minRows={4}
                  placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Grid item container spacing={2} justifyContent="center">
              <Grid item xs={10} md={4}>
                <TextField
                  variant="outlined"
                  label="Security Deposit"
                  value={securitydeposit}
                  min="0"
                  inputProps={{ type: "number" }}
                  sx={{
                    width: "100%",
                    pattern: "[0-9]",
                  }}
                  onChange={(e) => setDeposit(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <TextField
                  variant="outlined"
                  label="Available for"
                  value={availablefordays}
                  inputProps={{ type: "number" }}
                  pattern="^[1-9]\d*$"
                  min="1"
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) => setAvailableFor(e.target.value)}
                  required
                />
              </Grid>
            </Grid>

            <Grid item container spacing={2} justifyContent="center">
              <Grid item xs={10} md={8}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Coupon</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coupon_type}
                    label="Coupon"
                    onChange={handleChangeCoupon}
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

            <Grid item sx={12} md={8}>
              <Box>
                <Button
                  className="buttonHover"
                  type="Submit"
                  onClick={formValidation}
                  variant="contained"
                  sx={{
                    mb: 5,
                    color: "white",
                    bgcolor: "text.secondary",
                    hover: "#6c757d",
                    "&:hover": {
                      backgroundColor: "#6c757d",
                    },
                  }}
                >
                  ADD PRODUCT
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
