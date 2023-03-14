import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

import { DeleteEmployee } from "../Services/Employees";
import { GetAllEmployees } from "../Services/Employees";
import CustomNoRowsOverlay from "../components/NoData";
import EditEmployeesModal from "../components/EditEmployees";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1769aa",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface EmployeeProps {
  employees: {
    _id: string;
    username: string;
    email: string;
    contactNo: string;
    salary: number;
    address: string;
    salaryStatus: string;
  }[];

  setRows: any;
}

export default function CustomizedTables({
  employees,
  setRows,
}: EmployeeProps) {
  const admin = useSelector((state: any) => state.loginEvent.login);

  const handleDelete = async (_id: string) => {
    const employees: any = await DeleteEmployee(_id,admin.token);
    console.log(employees.data);

    const getEmployees: any = await GetAllEmployees(admin._id, admin.token);
    setRows(getEmployees.data);
  };

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">Salary</StyledTableCell>
              <StyledTableCell align="right">Contact No</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Salary Status</StyledTableCell>
              <StyledTableCell align="right"> Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length == 0 && (
              <>
                <StyledTableRow>
                  <StyledTableCell colSpan={7} align="center">
                    {employees.length == 0 && <CustomNoRowsOverlay />}
                  </StyledTableCell>
                </StyledTableRow>
              </>
            )}

            {employees.length > 0 &&
              employees?.map(
                ({
                  _id,
                  username,
                  email,
                  contactNo,
                  salary,
                  address,
                  salaryStatus,
                }) => (
                  <StyledTableRow key={_id}>
                    <StyledTableCell component="th" scope="row">
                      {username}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {email}
                    </StyledTableCell>
                    <StyledTableCell align="right">{salary}</StyledTableCell>
                    <StyledTableCell align="right">{contactNo}</StyledTableCell>
                    <StyledTableCell align="right">{address}</StyledTableCell>
                    <StyledTableCell align="right">
                      {salaryStatus}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <EditEmployeesModal
                          employeData={{
                            _id: _id,
                            username: username,
                            email: email,
                            contactNo: contactNo,
                            salary: salary,
                            address: address,
                            salaryStatus: salaryStatus,
                          }}
                          setRows={setRows}
                        />
                        <Button
                          style={{ marginLeft: "20px" }}
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
