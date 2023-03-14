import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Formik, Form, Field } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { UPDATE_EMPLOYEES } from "../redux/actions";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { useSelector } from "react-redux";

import {EditEmployee} from '../Services/Employees'
import {GetAllEmployees} from '../Services/Employees'
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft:7,
  paddingRight:7
};

interface Employees {
  employeData: {
    _id?: string;
    username: string;
    email: string;
    salary: number;
    contactNo: string;
    address: string;
    salaryStatus: string;
  };
  setRows:any
}

export default function EditEmployeesModal({ employeData,setRows }: Employees) {
  const admin= useSelector(
    (state: any) => state.loginEvent.login
  );
  const { _id, username, email, salary, contactNo, address, salaryStatus } =
    employeData;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date().toLocaleString();

  const onSubmit = async(values: any, { resetForm }: any) => {
    console.log("Form data", values);
    const employees:any=await EditEmployee({...values,_id:_id},admin.token)
    console.log(employees.data)

    const getEmployees:any=await GetAllEmployees(admin._id,admin.token)
    setRows(getEmployees.data)
    console.log(employees.data)

    
    
   
    
    // dispatch({
    //   type: UPDATE_EMPLOYEES,
    //   payload: { values: { ...values, _id: _id }, _id: _id },
    // });

    resetForm();

    handleClose();
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    salary: Yup.number().required("Required"),
    contactNo: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<EditIcon />}>
        Edit
      </Button>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
          <Typography variant="h6" style={{ color: "#1c0c4f" }}> Edit Employees</Typography>
            <Formik
              initialValues={{
                username: username || "",
                email: email || "",
                salary: salary || 0,
                contactNo: contactNo || "",
                address: address || "",
                salaryStatus: salaryStatus || "",
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              enableReinitialize
            >
              <Form>
                
                <Field
                  style={{ marginTop: "25px", width:"330px" }}
                  type="text"
                  name="username"
                  label="Employee Name"
                  component={TextField}
                />
                <Field
                  style={{ marginTop: "25px" , width:"330px"}}
                  type="text"
                  name="email"
                  label="Email"
                  component={TextField}
                />
                <Field
                  style={{ marginTop: "25px", width:"330px" }}
                  type="text"
                  name="salary"
                  label="Salary"
                  component={TextField}
                />
                <Field
                  style={{ marginTop: "25px", width:"330px" }}
                  type="text"
                  name="contactNo"
                  label="contact No"
                  component={TextField}
                />
                <Field
                  style={{ marginTop: "25px", width:"330px" }}
                  type="text"
                  name="address"
                  label="Address"
                  component={TextField}
                />
                <Field
                  style={{ marginTop: "25px" , width:"330px"}}
                  type="text"
                  name="salaryStatus"
                  label="Salary Staus"
                  component={TextField}
                />
                <div style={{ marginTop: "25px" ,display: "flex",
  justifyContent: "center",
  alignContent: "center",}}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </div>
              </Form>
            </Formik>
          </Box>
        </Modal>
      </div>
    </>
  );
}

