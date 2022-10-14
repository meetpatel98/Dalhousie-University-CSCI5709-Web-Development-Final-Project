import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Icon } from "@mui/material";
import { Avatar } from "@mui/material";
import useStyles from "./Style";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";
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
import constant from "../../AppConstant.json";
import axios from "axios";
import { useState } from "react";

function Post(props) {
  const classes = useStyles();

  const options = ["Edit", "Delete"];
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [open1, setOpen1] = React.useState(false);

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  //localStorage.setItem('userid','hardcodeID');
  let id = localStorage.getItem("userid");
  //localStorage.setItem('fullname','Hardcode name');
  let name = localStorage.getItem("username");

  const handleClickDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleClickEditClose = (e) => {
    e.preventDefault();
    setDeleteOpen(false);
  }

  const handleClickDeleteNo = () => {
    setDeleteOpen(false);
  }

  const handleClickDeleteClose = (e) => {
    e.preventDefault();
    setDeleteOpen(false);

    axios.post(constant.BE_URL + "deletePost", 
        {
        _id:props.id,
        }
      
    )
    .then(function (response) {
      console.log(response);
      window.location.reload();
      // localStorage.setItem("email",email)
      
    })
    .catch(function (error) {
      console.log(error);
    });


  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose2 = () => {
    setOpen1(false);
  }

  const handleClose1 = (e) => {
    e.preventDefault();
    setOpen1(false);

    axios.post(constant.BE_URL + "updatePost", {
      updatePost:{
        _id:props.id,
        category:category,
        description:description,
        }
      
    })
    .then(function (response) {
      console.log(response);
      window.location.reload();
      // localStorage.setItem("email",email)
      
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    //Referenced from https://mui.com/material-ui/react-card/
    <Card >
      <CardContent>
        <div className={classes.flex}>
          <div className={classes.displayFlex}>
            {/* Referenced from: https://mui.com/material-ui/react-avatar/ */}
            <Avatar className={classes.avatar}>{props.initials}</Avatar>
            <div>
            <Typography gutterBottom variant="body6" component="div">
              {props.name}
              </Typography>
              <Typography gutterBottom variant="body4" component="div">
                {props.date}
              </Typography>
            </div>

            {/* Referenced from https://mui.com/material-ui/react-chip/ */}
            <Chip label={props.category} className={classes.chip} />
          </div>

          {/* Referenced from: https://mui.com/material-ui/icons/ */}
          {props.userId == id ? (
          <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        ) : null}
          
          {/* Referenced from: https://mui.com/material-ui/react-menu/ */}
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {/* {options.map((option) => ( */}
            <MenuItem
              key="Edit"
              selected={"Edit" === "Pyxis"}
              onClick={handleClickOpen1}
            >
              Edit
            </MenuItem>
            <MenuItem
              key="Delete"
              selected={"Delete" === "Pyxis"}
              onClick={handleClickDeleteOpen}
            >
              Delete
            </MenuItem>
            {/* ))} */}
          </Menu>
        </div>

        <Typography variant="body2" color="text.secondary">
          {props.desc}
        </Typography>

        <Dialog open={deleteOpen} onClose={handleClickDeleteClose}>
          <DialogTitle>Delete Post</DialogTitle>
          <form onSubmit={handleClickDeleteClose}>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this post?
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClickDeleteNo}>No</Button>
              <Button type="submit">
                Yes
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={open1} onClose={handleClickEditClose}>
          <DialogTitle>Edit Post</DialogTitle>
          <form onSubmit={handleClose1}>
            <DialogContent>
              <DialogContentText>
                To edit the post, please fill all the below required
                information:
              </DialogContentText>

              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Category"
                fullWidth
                variant="outlined"
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              />
              {/* <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                type="date"
                fullWidth
                variant="outlined"
              /> */}
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
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose2}>Cancel</Button>
              <Button type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}

export default Post;
