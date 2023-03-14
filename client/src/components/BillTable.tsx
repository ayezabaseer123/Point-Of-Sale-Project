import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

import "./CartTable";


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
        itemQuantity: number
  
}

interface invoiceProp {
   cartList:{ _id: string;
    productname: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    itemQuantity: number}[]
    ,
    handleTotal:any
  
}

export default function BillTable({cartList,handleTotal}:invoiceProp) {
  const [_subtotal, setSubtotal] = useState(0);

 


  useEffect(() => {
    let total = 0;
    cartList?.forEach(
      (item: MyFormValues) => (total = total + item.price * item.itemQuantity)
    );
    setSubtotal(total);
    handleTotal(total)
  }, [cartList]);
  console.log(cartList,"cartinvoice")

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
         
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell>Image.</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Sum</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartList?.length > 0 &&
            cartList
              .filter((product: MyFormValues) => product.itemQuantity > 0)
              .map((product: MyFormValues) => (
                <TableRow key={product.productname}>
                  <TableCell>{product.productname}</TableCell>
                  <TableCell>
                    <img width="30" height="30" src={product.image} />
                  </TableCell>
                  <TableCell align="right">
                    <div className="icons">
                      
                      <b style={{ padding: "10px" }}>{product.itemQuantity}</b>
                      
                    </div>{" "}
                  </TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    {productSum(product.price, product.itemQuantity)}
                  </TableCell>
                </TableRow>
              ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(_subtotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
