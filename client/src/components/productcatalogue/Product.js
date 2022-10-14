import React, { useEffect } from "react";
import { Card, Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useStyles from "./Style";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import constant from "../../AppConstant.json";
import axios from "axios";
import {
  faDungeon,
  faEnvelope,
  faLocationPin,
  faMessage,
  faMobilePhone,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";

export default function Product(props) {
  const { product, onAdd } = props;

  const classes = useStyles();
  const [subject, setSubject] = React.useState();
  const [description, setDescription] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [pro, setProduct] = React.useState([]);
  const [confirmSend, setConfirmSend] = React.useState(false);
  const [finalErrorMessage, setFinalErrorMessage] = React.useState("");
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [finalError, setFinalError] = React.useState();

  useEffect(() => {

    let userId=localStorage.getItem("documentId");
    console.log("Inside Product.js");
    console.log(userId);

    //UseEffect will only call once
    fetch(constant.BE_URL+`productdetails/products/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((products) => {
        if (products.success === true) {
          setProduct(products.productRecord);
        } else {
          setFinalErrorMessage(products.message);
        }
      });
  }, [pro]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setConfirmSend(false);
  };

  const routeChange = (e) => {
    e.preventDefault();
    if (emailErrorMessage != "") {
      setFinalErrorMessage("Please re-enter the invalid fields!");
      setFinalError(true);
    } else {
      setFinalErrorMessage("");
      setFinalError(false);
      setConfirmSend(true);
      let userIdFetch = product.userid;
      let ownerEmail = null;
      console.log(userIdFetch);
      let token=localStorage.getItem("token");
      axios
        .post(constant.BE_URL + "userdetails/" + "getDataByUserId", {
          userId: userIdFetch,
        },{ headers: {"Authorization" : `Bearer ${token}`} })
        .then(function (response) {
          console.log(response);
          ownerEmail = response.data.userData.emailAddress;
          console.log(ownerEmail);
          // localStorage.setItem("email",email)
          let useremail = localStorage.getItem("emailAddress");
          
          axios
            .post(constant.BE_URL + "sendMessageToOwner", {
              data: {
                toEmail: ownerEmail,
                ccEmail: useremail,
                subject: subject,
                description: description
              },
            })
            .then(function (response) {
              console.log(response);
              // window.location.reload();
              // localStorage.setItem("email",email)
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 1400, maxHeight: 1000 }} className="margin">
        <CardActionArea
          onClick={() => {
            handleClick(product._id);
          }}
        >
          <img className="product" src={product.productimage} alt={product.name}></img>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="margin"
            >
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              $ {product.rentamount}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <div className={classes.flexMargin}>
          <div>
            <Button
              sx={{
                backgroundColor: "#979AA1",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#6c757d",
                }
              }}
              onClick={() => onAdd(product)
              }
            >
              Add To Cart
            </Button>
          </div>
          <div>
            <Button onClick={handleClickOpen}>
              <div  sx={{
                color: "#979AA1"
              }}>
                Please click here to message the owner -
              </div>
              <div  sx={{
                color: "#979AA1"
              }}>
                {/* <svg
                      onClick={handleClickOpen}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg> */}
                <FontAwesomeIcon icon={faMessage} />
              </div>
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={confirmSend}>
        <DialogContent>
          <DialogTitle variant="h6" align="center">
            Email sent!
          </DialogTitle>
          <form>
            <center>
              <Button
                onClick={handleCloseConfirm}
                className={classes.buttonCenter}
              >
                Cancel
              </Button>
            </center>
          </form>
        </DialogContent>
      </Dialog>

      {/* Referenced from: https://mui.com/material-ui/react-dialog/ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogTitle variant="h5" align="center">
            Send a message
          </DialogTitle>
          <DialogContentText>
            The message will be sent to the registered email address of the
            owner of this product:
          </DialogContentText>
          <form onSubmit={(e) => routeChange(e)}>
            <div></div>

            <TextField
              autoFocus
              required
              margin="dense"
              id="subject"
              label="Subject"
              fullWidth
              variant="outlined"
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Description"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />

            <div className={classes.errorMessageCenter}>
              {finalErrorMessage != "" ? (
                <div className="error"> {finalErrorMessage} </div>
              ) : null}
            </div>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onSubmit={handleClose} type="submit">
                Send
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
