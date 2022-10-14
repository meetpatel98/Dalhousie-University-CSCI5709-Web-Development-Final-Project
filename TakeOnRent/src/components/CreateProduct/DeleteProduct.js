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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { palette } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteProduct() {
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = useState(false);
  const [SnackbarMessage, setSnackbarMessage] = useState(false);
  const [severity, setSeverity] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [rent_amount, setRentAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [security_deposit, setDeposit] = useState(0);
  const [available, setAvailableFor] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [image, setImage] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
    setCoupon(event.target.value);
  };

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  // const handleClickDeleteOpen = () => {
  //   setDeleteOpen(true);
  // };

  const handleClickDeleteClose = () => {
    setDeleteOpen(false);
  };

  function onImageChange(e) {
    setImage([...e.target.files]);
  }

  const formValidation = () => {
    setDeleteOpen(true);
    setSnackbarMessage("Equipment Deleted Successfully!!");

    // if (
    //   category.length > 0 &&
    //   coupon.length > 0 &&
    //   name.length > 0 &&
    //   description.length > 0 &&
    //   quantity > 0 &&
    //   rent_amount > 0 &&
    //   address.length > 0 &&
    //   (security_deposit > 0) & (available > 0)
    // ) {
    //   setSnackbarMessage("Equipment Deleted Successfully!!");
    //   setSeverity("success");
    //   setOpen(true);
    //   // } else {
    //   //   setSnackbarMessage("Please fill all the required fields");
    //   //   setSeverity("error");
    //   //   setOpen(true);
    // }
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
              >
                Delete Equipment
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
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <FormControl sx={{ width: "100%" }}>
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
                  onChange={onImageChange}
                  accept="image"
                  value={image}
                >
                  {" "}
                  <input type="file" />{" "}
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
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Rent Amount"
                  value={rent_amount}
                  inputProps={{ type: "number" }}
                  sx={{ width: "100%" }}
                  onChange={(e) => setRentAmount(e.target.value)}
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
                />
              </Grid>
            </Grid>

            <Grid item container spacing={2} justifyContent="center">
              <Grid item xs={10} md={4}>
                <TextField
                  variant="outlined"
                  label="Security Deposit"
                  value={security_deposit}
                  min="0"
                  inputProps={{ type: "number" }}
                  sx={{
                    width: "100%",
                    pattern: "[0-9]",
                  }}
                  onChange={(e) => setDeposit(e.target.value)}
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <TextField
                  variant="outlined"
                  label="Available for"
                  value={available}
                  inputProps={{ type: "number" }}
                  pattern="^[1-9]\d*$"
                  min="1"
                  sx={{
                    width: "100%",
                  }}
                  onChange={(e) => setAvailableFor(e.target.value)}
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
                  }}
                >
                  DELETE
                </Button>
                <Dialog open={deleteOpen} onClose={handleClickDeleteClose}>
                  <DialogTitle>Delete Equipment</DialogTitle>
                  <form>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete this equipment?
                      </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleClickDeleteClose}>No</Button>
                      <Button
                        onSubmit={handleClickDeleteClose}
                        type="submit"
                        autofocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DeleteProduct;
