import Example from "../components/Print";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import CustomNoRowsOverlay from '../components/NoData'
const Sales = () => (
  <>
    <Typography style={{ color: "#1c0c4f" }} variant="h5" gutterBottom>
      Sales
    </Typography>
   
   <CustomNoRowsOverlay/>
  </>
);

export default Sales;
