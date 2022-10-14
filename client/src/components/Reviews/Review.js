import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import "../Reviews/ProductPage.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Icon } from "@mui/material";
import { Avatar } from "@mui/material";
import useStyles from "./Style";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Review(props) {
  const classes = useStyles();

  const options = ["Edit", "Delete"];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [open1, setOpen1] = React.useState(false);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleClickDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className="review">
      <Card >
      <CardContent>
        <div className={classes.flex}>
          <div className={classes.displayFlex}>
            <Avatar className={classes.avatar}>{props.initials}</Avatar>
            <div>
            <Typography variant="h6" component="div">
              {props.name}
              </Typography>
              <Typography variant="subtitle2" component="div">
              Reviewed on {props.date}
              </Typography>
            </div>

          </div>
          
        </div>

        <Typography sx={{
              marginTop: "5px"}} variant="subtitle1" gluttertop component="div">
              Rating: {props.rating}/5
              </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.desc}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
    </div>
  );
}

export default Review;
