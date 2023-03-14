import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useSelector } from "react-redux";

import ProductCards from "../components/ProductCards";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tabs from "../components/Tabs";
import { GET_PRODUCTS } from "../redux/products-action";
import {GetAllProducts} from '../Services/Products'

import "./Employee.css";

function Products() {
  const admin= useSelector(
    (state: any) => state.loginEvent.login
  );
  const dispatch = useDispatch();
  const getProducts=async()=>{
    const adminId=admin._id
   const products:any=await GetAllProducts(adminId,admin.token)
   console.log(products.data)
   if(products){ 
   
    dispatch({ type: GET_PRODUCTS, payload: products?.data});
  }
  

  }

  useEffect(() => {
    getProducts()
   
    
  }, []);

  return (
    <>
      <Tabs />
      <div className="addBtn">
        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/addProducts"
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}

export default Products;
