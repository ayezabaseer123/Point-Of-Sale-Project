import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import CustomizedTables from './Table'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import {useSelector} from "react-redux"

const Example = () => {
  const employeesList = useSelector((state:any) => state.employeeEvents.employeesList);
    const componentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
        <div ref={componentRef}>
        {/* <CustomizedTables employees={employeesList} /> */}
        <Button variant="contained" onClick={handlePrint}>Print this out!</Button>
</div>
<Box marginTop={3} textAlign='center'>
<Button variant="contained" onClick={handlePrint}>Print this out!</Button>
</Box>
    
   
    </div>
  );
};

export default Example