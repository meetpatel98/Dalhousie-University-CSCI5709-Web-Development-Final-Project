import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  // Referenced from: https://mui.com/system/styles/basics/
  flex: {
    display: "flex",
    justifyContent:"space-between",
  },
  displayFlex:{
    display: "flex"
  },
  avatar:{
    // background: "#5BC85B",
    marginRight: "15px"
  },
  center:{
    margin:"auto",
  },
  headerCenter:{
    textAlign:"center",
    fontWeight:"lighter"
  },
  buttonDiv:{
    margin:"auto",
    display:"flex",
    justifyContent:"center",    position:"relative",
    marginBottom:"25px"
  },
  // button:{
  //   backgroundColor:"#a6dced"

  // },
  
  button: {
    backgroundColor: '#979AA1',
    '&:hover': {
      backgroundColor: '#6c757d',
  }},
  flexButton:{
    position:"absolute",
    right:0,
    left:0
  },
  filter:{
    // display:"flex",
    position:"absolute",
    right:0,
    top:0
  },
  chip:{
    marginLeft:"12px"
  }
});

export default useStyles;