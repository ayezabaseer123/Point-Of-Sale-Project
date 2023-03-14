import Typography from "@mui/material/Typography";
import React from "react"
import Button from "@mui/material/Button";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import { TextField } from "formik-material-ui";
import { useSelector } from "react-redux";

import {CreateEmployee} from "../Services/Employees";

interface MyFormValues {
  username: string;
  email: string;
  salary: number;
  contactNo: string;
  address: string;
}

function AddEmployees() {
  const admin = useSelector(
    (state: any) => state.loginEvent.login
  );
  
  const onSubmit = async(values: Record<string,string|number>, { resetForm }: any) => {
    console.log("Form data", values);
    const employeeResponse =await CreateEmployee({...values,adminId:admin._id},admin.token);
    if(employeeResponse){
     console.log(employeeResponse?.data)
      toast.success("Employee Added Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
     
    }
   
    resetForm();
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    salary: Yup.number().required("Required").min(1000),
    contactNo: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  return (
    <div>
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
            Add Employee
          </Typography>
          <Formik
            initialValues={{
              username: "",
              email: "",
              salary: 0,
              contactNo: "",
              address: "",
              salaryStatus: "unpaid",
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <div style={{  padding:" 15px 30px 15px 30px" }}>
                <Field
                  style={{ width: "600px" }}
                  type="text"
                  name="username"
                  label="Employee Name"
                  component={TextField}
                />
              </div>
              <div style={{ padding:" 15px 30px 15px 30px"}}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="text"
                  name="email"
                  label="Email"
                  component={TextField}
                />
              </div>
              <div style={{padding:" 15px 30px 15px 30px" }}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="number"
                  name="salary"
                  label="Salary"
                  component={TextField}
                />
              </div>
              <div style={{ padding:" 15px 30px 15px 30px"}}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="text"
                  name="contactNo"
                  label="Contact No"
                  component={TextField}
                />
              </div>
              <div style={{ padding:" 15px 30px 15px 30px" }}>
                <Field
                  style={{ marginTop: "20px", width: "600px" }}
                  type="text"
                  name="address"
                  label="Address"
                  component={TextField}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  padding:" 15px 30px 15px 30px"
                }}
              >
                <Button
                  style={{ width: "100px", height: "50px" }}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
                <ToastContainer />
              </div>
            </Form>
          </Formik>
        </Card>
      </div>
    </div>
  );
}

export default AddEmployees;
