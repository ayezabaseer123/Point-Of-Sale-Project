import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_INVOICE } from "../redux/invoice-actions";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";


import Box from "@mui/material/Box";
import InvoiceTables from "../components/InvoicesTables";
import {GetAllInvoice} from '../Services/Invoice'
interface InvoiceProps{
  
  invoiceList:  {_id: string;
    customerName: string;
    email: string;
    address: string;
    date: string;
    cartItem: {
      _id: string;
      productname: string;
      price: number;
      quanity: number;
      image: string;
      category: string;
      itemQuantity: number;
    }[];
  }[];
  
  tableHead:string[]
}
function Invoices() {
  const [searched, setSearched] = useState<string>("");
  const [invoiceList,setInvoiceList]=useState([])
  const [rows, setRows] = useState(invoiceList);
  useEffect(() => {
    setRows(invoiceList);
  }, [invoiceList]);
  const admin = useSelector(
    (state: any) => state.loginEvent.login
  );
  const InvoiceList = useSelector(
    (state: any) => state.invoiceEvents.invoiceList
  );

  const requestSearch = (searchedVal: string) => {

    setSearched(searchedVal);
    const filteredRows = InvoiceList.filter((row: any) => {
      return row.customerName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
    // dispatch({ type
    //   :GET_INVOICE, payload: filteredRows });
   
  };

  

   const  handleInvoice=async()=> {
    const getInvoice=await GetAllInvoice(admin._id,admin.token)
    dispatch({ type
      :GET_INVOICE, payload: getInvoice?.data });
     setInvoiceList(getInvoice?.data)
   }
  const dispatch = useDispatch();
  useEffect(() => {
    handleInvoice()
   
  }, [])
  const tableHead=["Invoice No", "Customer Name", "Email","Address","Date","Action"]
  

  return <> <Typography style={{ color: "#1c0c4f" }} variant="h5" marginBottom={2} gutterBottom>
  Invoices
</Typography>
<TextField
        style={{ width: "100%" }}
        id="outlined-select-currency"
        label="Search by Customer Name"
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
      

<Box  >
   <InvoiceTables list={rows} tableHead={tableHead} />
</Box> 



</>;
}

export default Invoices;
