import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import BillTable from "../components/BillTable";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Button from "@mui/material/Button";

function CustomerInvoice() {
  const location = useLocation();
  const componentRef = useRef<HTMLDivElement>(null);

  const [total, setTotal] = useState(0);
  console.log(total, "total");
  const handleTotal = (num: number) => {
    setTotal(num);
  };
  console.log(componentRef.current,"Print")
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" style={{marginBottom:"20px"}}>
        <Button
          style={{ right: "30px" }}
          variant="contained"
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button
          href={`mailto:${location.state.email}?subject=Invoice&body=Dear Customer,Your total is Rs. ${total}`}
          style={{ right: "20px" }}
          variant="contained"
        >
          Send Email
        </Button>
      </Box>
      <div
        style={{
          margin: "auto",
          width: "80%",
          boxShadow: " 5px 5px 5px 5px #aaaaaa",
          borderRadius: "5px",
        }}
      >
        <div ref={componentRef}>
           <div style={{padding: "20px"}}>
           <Typography align="center" variant="h5" >
            Invoice
          </Typography>
           </div>
       
        
          
          
          <div style={{ marginTop: "30px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                p: 1,
                m: 1,
              }}
            >
              <Box>
                <Typography variant="h6">Bill To</Typography>
                <Typography sx={{ paddingTop: 1 }} color="grey">
                  {location.state.customerName}
                </Typography>
                <Typography sx={{ paddingTop: 1 }} color="grey">
                  {location.state.email}
                </Typography>
                <Typography sx={{ paddingTop: 1 }} color="grey">
                  {location.state.address}
                </Typography>
              </Box>

              <Box>
                <Typography>
                  Invoice No:{" "}
                  <span style={{ color: "grey" }}> {location.state._id}</span>{" "}
                </Typography>
                <Typography sx={{ paddingTop: 1 }}>
                  Invoice Date:{" "}
                  <span style={{ color: "grey" }}>{location.state.date}</span>{" "}
                </Typography>
              </Box>
            </Box>
            <div style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:"10px"}}>
            <BillTable
              cartList={location.state.cartList}
              handleTotal={handleTotal}
            />
            </div>
           
            <Typography align="center" sx={{ paddingTop: 2, paddingBottom: 2 }}>
              Thanks for purchasing from our store
            </Typography>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default CustomerInvoice;
