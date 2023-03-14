import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import CustomizedTables from "../components/Table";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { GetAllEmployees } from "../Services/Employees";
import "./Employee.css";

function Employees() {
  const admin = useSelector((state: any) => state.loginEvent.login);
  const [employeesList, setEmployeesList] = useState([]);
  const [rows, setRows] = useState(employeesList);
  const [searched, setSearched] = useState<string>("");

  const getEmployees = async () => {
    const adminId = admin._id;
    const employees: any = await GetAllEmployees(adminId, admin.token);
    console.log(employees.data);
    if (employees) {
      setEmployeesList(employees.data);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
  useEffect(() => {
    setRows(employeesList);
  }, [employeesList]);

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
    const filteredRows = employeesList.filter((row: any) => {
      return row.username.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  return (
    <>
      <Typography
        style={{ color: "#1c0c4f", paddingBottom: "20px" }}
        variant="h5"
        gutterBottom
      >
        Employee Details
      </Typography>

      <TextField
        style={{ width: "100%" }}
        id="outlined-select-currency"
        label="Search by Employee Name"
        value={searched}
        onChange={(e) => requestSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon onClick={() => setSearched("")} />
            </InputAdornment>
          ),
        }}
      ></TextField>

      <CustomizedTables employees={rows} setRows={setRows} />

      <div className="addBtn">
        <Fab
          color="primary"
          aria-label="add"
          component={Link}
          to="/addEmployees"
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}

export default Employees;
