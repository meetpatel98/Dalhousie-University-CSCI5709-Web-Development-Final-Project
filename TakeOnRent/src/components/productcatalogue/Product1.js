import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import data from '../../data';

import { Card, Typography } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import { Stack } from '@mui/material';
export default function Product1(props) {
    const [productdetail,setproductdetail]=useState({id: null});
    const { products } = data;
    const params = useParams();
    const { product, onAdd } = props;
    const fetch = () => {
        products.forEach(product1 => {
            if(product1.id==params.id) {
                setproductdetail(product1);
            }
        });
        
    }
    useEffect(()=>
    {
        fetch();
        console.log("here")
    }, [])
    
  return (
    <Card sx={{ Width: 1400, Height: 1000}} className="margin">
    <CardActionArea>
  
      <img className="product" src={productdetail.image} alt={productdetail.name}   ></img>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='margin'>
          {productdetail.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          $ {productdetail.price}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
        <Typography variant="body2" color="text.secondary">
          {productdetail.description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
    <Stack spacing={2} direction="row">
    <Button  sx={{
                backgroundColor: "#979AA1",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#6c757d",
                }
              }} onClick={() => onAdd(productdetail)}>Add To Cart</Button>
  </Stack>
    </CardActions>
  </Card>
  
  )
}
