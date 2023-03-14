import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import { TextField } from "formik-material-ui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./SignUp.css";
import {Register} from "../Services/Admin"
import signup from "../images/signup.jpg";

function SignUp() {
  interface MyFormValues {
    adminName: string;
    email: string;
    password: string;
  }

  const onSubmit = async(values: Record<string,string>, { resetForm }: any) => {
    let registerResponse=await Register(values)
    if(registerResponse){
      toast.success("User registered successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    console.log(registerResponse,"registerResponse")
    resetForm();
  };

  const validationSchema = Yup.object({
    adminName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),

    password: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="main">
        <div className="box">
          <div className="innerBox">
            <div className="flexRow-container">
              <div className="flexColumn-container">
                <div>
                  <h3 className="heading">Point of Sale System</h3>
                </div>
                <div className="form">
                  <h3 className="heading">SignUp</h3>
                  <Formik
                    initialValues={{
                      adminName: "",
                      email: "",
                      password: "",
                    }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
                  >
                    <Form>
                      <div style={{ padding: " 10px 25px 10px 25px" }}>
                        <Field
                          style={{ width: "100%" }}
                          type="text"
                          name="adminName"
                          label="Admin Name"
                          component={TextField}
                        />
                      </div>
                      <div style={{ padding: " 10px 25px 5px 25px" }}>
                        <Field
                          style={{ marginTop: "10px", width: "100%" }}
                          type="text"
                          name="email"
                          label="Email"
                          component={TextField}
                        />
                      </div>

                      <div style={{ padding: " 10px 25px 5px 25px" }}>
                        <Field
                          style={{ marginTop: "10px", width: "100%" }}
                          type="text"
                          name="password"
                          label="Password"
                          component={TextField}
                        />
                      </div>

                      <div
                        style={{
                          padding: " 10px 25px 5px 25px",
                        }}
                      >
                        <Button
                          style={{ width: "100%", height: "40px" }}
                          type="submit"
                          variant="contained"
                        >
                          Sign Up
                        </Button>

                        <ToastContainer />
                      </div>

                      <div
                        style={{
                          padding: " 10px 25px 5px 25px",
                        }}
                      >
                        <Button
                          style={{
                            width: "100%",
                            height: "40px",
                            backgroundColor: "green",
                          }}
                          component={Link}
          to="/login"
                         
                          variant="contained"
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <img
                  width="100%"
                  height="100%"
                  alt="point of sale "
                  src={signup}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
