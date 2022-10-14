import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  // Referenced from: https://mui.com/system/styles/basics/
  flex: {
    display: "flex",
    justifyContent:"space-between",
  },
  avatar:{
    background: "#5BC85B",
  },
  center:{
    margin:"auto",
  },
  headerCenter:{
    textAlign:"center",
    fontWeight:"lighter",
    display: "flex",
    justifyContent:"center",
  },
  buttonDiv:{
    margin:"auto",
    display:"flex",
    justifyContent:"center",
  },
  button:{
    backgroundColor:"#a6dced"

  },
  filter:{
    // display:"flex",
    position:"absolute",
    right:0
  },
  alignCenterError:{
      textAlign:"center",
      fontWeight:"lighter",
      justifyContent:"center",
      color:"red"
  },
  errorMessage:{
    color:"red"
  },
  errorMessageCenter:{
    color:"red",
    textAlign:"center",
  },
  buttonCenter:{
    alignContent:"center",
    color:"green"
    
  },
  flexMargin:{
    margin:"15px",
    display: "flex",
    justifyContent:"space-between",
  }
});

export default useStyles;