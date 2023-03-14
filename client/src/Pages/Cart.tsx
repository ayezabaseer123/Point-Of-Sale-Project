import Typography from "@mui/material/Typography";
import CartTable from "../components/CartTable";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { CartData } from "../Data";
import { GET_CART } from "../redux/cart-action";
import Modal from "../components/Modal";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import { GetAllCart } from "../Services/Cart";
function Cart() {
  const dispatch = useDispatch();
  const admin = useSelector((state: any) => state.loginEvent.login);
  const getCartInfo = async () => {
    const adminId = admin._id;
    const cart: any = await GetAllCart(adminId,admin.token);
    console.log(cart.data);
    if (cart) {
      dispatch({ type: GET_CART, payload: cart.data });
    }
  };

  useEffect(() => {
    getCartInfo();
  }, []);
  const cartList = useSelector((state: any) => state.cartEvents.cartList);
  return (
    <>
      <Typography style={{ color: "#1c0c4f" }} variant="h5" gutterBottom>
        Cart
      </Typography>
      <div style={{ marginTop: "20px" }}>
        <CartTable />
      </div>

      {cartList && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "20px",
            }}
          >
            <Modal />
          </div>
        </>
      )}
    </>
  );
}
export default Cart;
