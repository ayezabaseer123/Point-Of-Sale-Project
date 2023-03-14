import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { TextField } from "formik-material-ui";
// import Select from '@mui/material/Select';
import { useDispatch } from "react-redux";
import { ProductsData } from "../Data";
import { useSelector } from "react-redux";
import { Select } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuid } from "uuid";
import { ADD_PRODUCTS } from "../redux/products-action";

import {CreateProduct} from "../Services/Products";
import {EditCart} from "../Services/Cart";
interface MyFormValues {
  productname: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

function AddProducts() {
  const location = useLocation();
  const editProduct=location?.state?.product
  const admin = useSelector(
    (state: any) => state.loginEvent.login
  );

  const cartList = useSelector(
    (state: any) => state.cartEvents.cartList
  );
  const dispatch = useDispatch();
  const onSubmit = async(values: MyFormValues, { resetForm }: any) => {
    let findCart:any;
    const productResponse =await CreateProduct({...values,adminId:admin._id,_id:editProduct?._id},admin.token);
    if(productResponse){
      console.log(productResponse)
     console.log(productResponse?.data)
     if(!location.state){
      toast.success("Product Added Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return resetForm()
     }
     else{
     
      if(cartList){
        
       findCart= cartList.find((c:any) => c.productId ==editProduct?._id)

      }
      console.log(findCart,"cartabhi")
      findCart && await EditCart({...values,_id:findCart._id},admin.token)
      toast.success("Product Updated Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
     }
      
    }
  
    if(!location.state){
      resetForm();
    }
   
    
  };

  const validationSchema = Yup.object({
    productname: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    quantity: !location?.state ? (Yup.number().required("Required").min(11)):Yup.number().required("Required"),
    price: Yup.number().required("Required"),
    category: Yup.string().required("Required"),
  });

  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Card
          sx={{
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;",
            alignContent: "center",
          }}
        >
          <Typography
            style={{
              display: "flex",
              color: "#1c0c4f",
              justifyContent: "center",
              padding: "20px",
            }}
            variant="h5"
            gutterBottom
          >
           {location.state?"Edit Products":"Add Products"} 
          </Typography>
          <Formik
            initialValues={{
              productname:editProduct?.productname || "",
              price:editProduct?.price || 0,
              quantity: editProduct?.quantity || 0,
              image:editProduct?.image ||"",
              category:editProduct?.category ||"",
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <div style={{ padding: " 15px 30px 15px 30px" }}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="text"
                  name="productname"
                  label="Product Name"
                  component={TextField}
                />
              </div>

              <div style={{ padding: " 15px 30px 15px 30px" }}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="number"
                  name="price"
                  label="Price"
                  component={TextField}
                />
              </div>

              <div style={{ padding: " 15px 30px 15px 30px" }}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="number"
                  name="quantity"
                  label="Quantity"
                  component={TextField}
                />
              </div>

              <div style={{ padding: " 15px 30px 15px 30px" }}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="text"
                  name="image"
                  label="Image"
                  component={TextField}
                />
              </div>

              <div
                style={{ padding: " 15px 30px 15px 30px", marginTop: "20px" }}
              >
                <Field
                  component={Select}
                  type="text"
                  label="Category"
                  name="category"
                  style={{ width: "600px" }}
                  inputProps={{ name: "category", id: "category" }}
                >
                  <MenuItem value="fruits">Fruits</MenuItem>
                  <MenuItem value="vegetables">Vegetables</MenuItem>
                  <MenuItem value="meat">Meat</MenuItem>
                  <MenuItem value="beverages">Beverages</MenuItem>
                  <MenuItem value="icecreams">Ice Creams</MenuItem>
                </Field>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: " 15px 30px 15px 30px",
                }}
              >
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <ToastContainer />
              </div>
            </Form>
          </Formik>
        </Card>
      </div>
    </>
  );
}

export default AddProducts;
