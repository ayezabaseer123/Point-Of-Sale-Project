import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useSelector } from "react-redux";
import { Button, CardActions } from "@mui/material";
import { Grid, Typography } from "@material-ui/core/";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { ADD_CART } from "../redux/cart-action";
import { GET_PRODUCTS } from "../redux/products-action";

import { CartData } from "../Data";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import { CreateCart } from "../Services/Cart";
import {DeleteProduct,EditProduct} from '../Services/Products'
import {GetAllProducts} from '../Services/Products'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  cards: {
    marginTop: theme.spacing(2),
  },
  fiCardContent: {
    color: "#ffffff",
  },
}));
interface ProductProps {
  product: {
    _id: string;
    productname: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    adminId: string;
  };
}

export default function ProductCards({ product }: ProductProps) {
  const cartList = useSelector((state: any) => state.cartEvents.cartList);
  const navigate = useNavigate();
  const admin = useSelector((state: any) => state.loginEvent.login);

  const dispatch = useDispatch();
  const {_id, productname, price, category, quantity, image,adminId } = product;
  const classes = useStyles();

  const Edit = () => {
    navigate("/addProducts", { state: { product } });
  };

  const Delete = async() => {
    await DeleteProduct(_id,admin?.token)
    let getProducts=await GetAllProducts(adminId,admin.token);
    
      dispatch({ type: GET_PRODUCTS, payload: getProducts?.data });
    
   
  };

  const AddToCart = async () => {
    console.log(product,"product")
    console.log(product._id,"product")
    const quantityLeft=quantity-1;
    const productResponse = await CreateCart({
      ...product,
      productId:product._id,
      quantity:quantity-1,
      itemQuantity: 1,
      adminId: admin._id,
      adminEmail:admin.email
    },admin.token);
    if (productResponse) {
      console.log(productResponse?.data);
      toast.success("Added to Cart", {
        position: toast.POSITION.TOP_CENTER,
      });

      dispatch({ type: ADD_CART, payload: productResponse?.data });
      CartData.push({ ...product, itemQuantity: 1,quantity:quantity-1 });
      if(quantityLeft==10){
        toast.warning(`Product Quantity is 10 . Kindly refill the stock`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }

   const changeProductQuantity=await EditProduct({...product,quantity:quantity-1},admin.token)
     console.log(changeProductQuantity)
  };

  return (
    <Grid item xs={2}>
      <Card
        sx={{
          maxWidth: 280,
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "flex-end",
            padding: "5px",
          }}
        >
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => Edit()}
          >
            <EditIcon />
          </Fab>
          <Fab
            style={{ marginLeft: "10px" }}
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => Delete()}
          >
            <DeleteIcon />
          </Fab>
        </div>

        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={productname}
        />

        <Typography align="center" gutterBottom variant="h6" component="div">
          {productname}
        </Typography>
        <Typography
          style={{ color: "#404040" }}
          align="center"
          gutterBottom
          variant="h6"
          component="div"
          
        >
          Rs.{price}
        </Typography>

        <Button
          style={{ width: "100%" }}
          size="large"
          color="primary"
          variant="contained"
          onClick={AddToCart}
          disabled={quantity==0}
        >{quantity==0?"Out Of Stock":"Add To Cart"}
          
        </Button>
        <ToastContainer />
      </Card>

      {/* </Grid> */}
    </Grid>
  );
}
