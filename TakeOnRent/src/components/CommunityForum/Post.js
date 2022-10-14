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

function Post(props) {
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
          <form>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this post?
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClickDeleteClose}>No</Button>
              <Button onSubmit={handleClickDeleteClose} type="submit">
                Yes
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog open={open1} onClose={handleClickDeleteClose}>
          <DialogTitle>Edit Post</DialogTitle>
          <form>
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
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                type="date"
                fullWidth
                variant="outlined"
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
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose1}>Cancel</Button>
              <Button onSubmit={handleClose1} type="submit">
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
