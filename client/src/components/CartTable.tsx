import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { UPDATE_CART } from "../redux/cart-action";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

import "./CartTable";
import CustomNoRowsOverlay from "../components/NoData";
import { GET_CART, DELETE_CART } from "../redux/cart-action";
import { CartData } from "../Data";
import { EditCart, GetAllCart, DeleteCart } from "../Services/Cart";
import { EditProduct, GetAllProducts } from "../Services/Products";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1769aa",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function productSum(number: number, quantity: number) {
  let sum = priceRow(number, quantity);

  return `${sum.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

interface MyFormValues {
  _id: string;
  productname: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  itemQuantity: number;
  productId: string;
}

export default function CartTable() {
  const [_subtotal, setSubtotal] = useState(0);

  const cartList = useSelector((state: any) => state.cartEvents.cartList);
  const admin = useSelector((state: any) => state.loginEvent.login);
  const dispatch = useDispatch();
  const handleCart = async () => {
    const getCart: any = await GetAllCart(admin._id,admin.token);
    dispatch({ type: GET_CART, payload: getCart.data });
  };
  useEffect(() => {
    handleCart();
  }, []);

  useEffect(() => {
    let total = 0;
    cartList &&
      cartList?.forEach(
        (item: MyFormValues) => (total = total + item.price * item.itemQuantity)
      );
    setSubtotal(total);
  }, [cartList]);

  const handleDelete = async (_id: string, productId: string) => {
    dispatch({ type: DELETE_CART, payload: _id });
    const cart: any = await DeleteCart(_id, productId,admin.token);

    console.log(_id, "cartid");
    
  };
  const quantityDecrement = async (product: MyFormValues) => {
    if (product.itemQuantity != 1) {
      const productQuantityIncrement = await EditProduct({
        _id: product.productId,
        quantity: product.quantity + 1,
      },admin.token);
      console.log(productQuantityIncrement);

      const cartQuantityIncrement = await EditCart({
        ...product,
        quantity: product.quantity + 1,
        itemQuantity: product.itemQuantity - 1,
        adminEmail:admin.email
      },admin.token);
      console.log(cartQuantityIncrement);

      dispatch({
        type: UPDATE_CART,
        payload: {
          ...product,
          itemQuantity: product.itemQuantity - 1,
          quantity: product.quantity + 1,
        },
      });
    }
  };

  const quantityIncrement = async (product: MyFormValues) => {
    if (product.quantity == 0) {
      toast.warning(`No Stock Available`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const productQuantityIncrement = await EditProduct({
        _id: product.productId,
        quantity: product.quantity - 1,

      },admin.token);
      console.log(productQuantityIncrement);

      const cartQuantityIncrement = await EditCart({
        ...product,
        quantity: product.quantity - 1,
        itemQuantity: product.itemQuantity + 1,
        adminEmail:admin.email
      },admin.token);
      console.log(cartQuantityIncrement);

      dispatch({
        type: UPDATE_CART,
        payload: {
          ...product,
          itemQuantity: product.itemQuantity + 1,
          quantity: product.quantity - 1,
        },
      });
    }
  };
  return (
    <TableContainer
      component={Paper}
      style={{
        boxShadow:
          " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b>Product</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>Image</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Quantity</b>{" "}
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Price</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Sum</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Action</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(!cartList || cartList?.length == 0) && (
            <TableCell colSpan={7} align="center">
              <CustomNoRowsOverlay />{" "}
            </TableCell>
          )}

          {cartList &&
            cartList?.length > 0 &&
            cartList
              .filter((product: MyFormValues) => product.itemQuantity > 0)
              .map((product: MyFormValues) => (
                <TableRow key={product.productname}>
                  <TableCell><Typography>{product.productname}</Typography></TableCell>
                  <TableCell>
                    <img width="40" height="40" src={product.image} />
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      size="small"
                    >
                      {" "}
                      <Button
                        disabled={product.itemQuantity == 1}
                        onClick={() => quantityDecrement(product)}
                      >
                        <RemoveCircleOutlineIcon sx={{ color: "white" }} />
                      </Button>
                      <b
                        style={{
                          paddingTop: "3px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                      >
                        {product.itemQuantity}
                      </b>
                      <Button onClick={() => quantityIncrement(product)}>
                        <AddCircleOutlineIcon sx={{ color: "white" }} />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="right"><Typography>Rs.{product.price} {}</Typography></TableCell>
                  <TableCell align="right">
                    <Typography>
                    {productSum(product.price, product.itemQuantity)}
                    </Typography>
                   
                  </TableCell>
                  <TableCell align="right">
                    <Button size="medium"
                      onClick={() =>
                        handleDelete(product._id, product.productId)
                      }
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <ToastContainer />
                  </TableCell>
                </TableRow>
              ))}

          {cartList.length > 0 && (
            <TableRow>
              <TableCell rowSpan={1} />
              <TableCell colSpan={3}>
              <Typography>Total</Typography>  
              </TableCell>
              <TableCell align="right"><Typography>{ccyFormat(_subtotal)}</Typography></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
