import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import cart from '../images/cart.jpg';
import employees from '../images/employees.png'
import products from '../images/products.jpg'
import invoices from '../images/invoices.jpg'
import { Link } from "react-router-dom";
const navigation = [
   
    {
      title: "Cart",
      href: "/cart",
      image:cart,
      alt:"cart"
    },
    {
      title: "Employees",
      href: "/employees",
      alt:"employees",
      image:employees ,
    },
    {
      title: "Products",
      href: "/products",
      alt:"products",
      image:products ,
    },
    {
      title: "Invoices",
      href: "/invoices",
      alt:"invoices",
      image:invoices
    },
    
   
  
  ];

export default function MediaCard() {
  return (<div>  <Grid container marginTop={5} spacing={3} >
  {navigation.map((item, index) => (  <Grid item xs={3}>
    <Card sx={{ maxWidth: 345,boxShadow:6}}>
      <CardMedia
        component="img"
        height="260"
        image={item.image}
        alt={item.alt}
      />
     
        <Typography gutterBottom marginLeft={1} marginTop={2} variant="h5" component="div">
          {item.title}
        </Typography>
      
      <CardActions>
      <Button component={Link} to={item.href} variant="contained">Open</Button>
      </CardActions>
    </Card>
    </Grid>
    ))}
     </Grid></div>
    
  );
}
