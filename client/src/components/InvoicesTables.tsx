import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useNavigate} from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:'#1769aa' ,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


interface Props{
  list:Record<string,any>[],
  tableHead:string[]
}

export default function InvoiceTables({list,tableHead}:Props) {
    const navigate = useNavigate()

const openInvoice=(_id:string,customerName:string,email:string,address:string,date:string,cartList:{}[])=>{
    navigate("/customer/invoice", {state:{ _id:_id,cartList:cartList,date:date,customerName:customerName,email:email,address:address}})


}
  return (
    <TableContainer component={Paper} style={{boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"}}>
      <Table sx={{ minWidth: 600}} aria-label="customized table">
        <TableHead>
          <TableRow>
            {list?.length>0 && tableHead.map((element:string)=>(
                 <StyledTableCell >{element}</StyledTableCell>
            ))}
           </TableRow>
        </TableHead>
        <TableBody>
          {list?.length>0 && list?.map(({_id,customerName,email,address,date,cartList}:any) =>(
            <StyledTableRow key={_id}>
               <StyledTableCell component="th" scope="row">
                {_id}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {customerName}
              </StyledTableCell>
              <StyledTableCell >{email}</StyledTableCell>
              <StyledTableCell>{address}</StyledTableCell>
              <StyledTableCell >{date}</StyledTableCell>
              <StyledTableCell >< VisibilityIcon sx={{ "&:hover": { color: "#1976d2" } }}onClick={()=>openInvoice(_id,customerName,email,address,date,cartList)}/></StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody> 
        <div></div>
      </Table>
    </TableContainer>
  );
}
