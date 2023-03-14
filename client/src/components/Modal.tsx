import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Formik, Form, Field } from "formik";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ADD_INVOICE } from "../redux/invoice-actions";
import { EMPTY_CART } from "../redux/cart-action";
import { v4 as uuid } from "uuid";
import { CartData } from "../Data";
import { useNavigate } from "react-router-dom";
import { InvoiceData } from "../Data";
import { CreateInvoice } from "../Services/Invoice";
import { EmptyCart } from "../Services/Cart";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Customer {
  customerName: string;
  email: string;
  address: string;
}

export default function InvoiceModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = uuid();
  const date = new Date().toLocaleString();

  const cartList = useSelector((state: any) => state.cartEvents.cartList);

  const admin = useSelector((state: any) => state.loginEvent.login);

  const onSubmit = async (values: Customer, { resetForm }: any) => {
    console.log("Form data", values);

    let cartData = cartList;
    const postInvoice: any = await CreateInvoice(
      { ...values, adminId: admin._id, cartList: cartData, date: date },
      admin.token
    );

    InvoiceData.push(postInvoice?.data);

    dispatch({ type: ADD_INVOICE, payload: postInvoice?.data });
    const emptyCart = await EmptyCart(admin._id, admin.token);
    navigate("/customer/invoice", { state: postInvoice?.data });

    resetForm();
    dispatch({ type: EMPTY_CART, payload: [] });
    //   while(CartData.length > 0) {
    //     CartData.pop();
    // }
    handleClose();
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    address: Yup.string().required("Required"),
  });

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Genearte Invoice
      </Button>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{
              customerName: "",
              email: "",
              address: "",
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <Field
                style={{ marginTop: "20px", width: "325px" }}
                inputProps={{ name: "customerName", id: "customerName" }}
                type="text"
                name="customerName"
                label="Customer Name"
                component={TextField}
              />
              <Field
                style={{ marginTop: "20px", width: "325px" }}
                type="text"
                name="email"
                label="Email"
                component={TextField}
              />
              <Field
                style={{ marginTop: "20px", width: "325px" }}
                type="text"
                name="address"
                label="Address"
                component={TextField}
              />
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
