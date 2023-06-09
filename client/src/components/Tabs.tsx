import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";
import ProductCard from "./ProductCards";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  cards: {
    marginTop: theme.spacing(2),
  },
}));
interface MyFormValues {
  _id:string
  productname: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  adminId:string
}

export default function Tabs() {

  const productsList = useSelector(
    (state: any) => state.productEvents.productsList
  );

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Fruits" value="1" />
            <Tab label="Vegetables" value="2" />
            <Tab label="Meat" value="3" />
            <Tab label="Beverages" value="4" />
            <Tab label="Ice Creams" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className={classes.root}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {productsList.length > 0 &&
                productsList
                  ?.filter(
                    (product: MyFormValues) => product.category == "fruits"
                  )
                  .map((product: MyFormValues) => (
                    <ProductCard product={product} />
                  ))}
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value="2">
        <div className={classes.root}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {productsList.length > 0 &&
                productsList
                  ?.filter(
                    (product: MyFormValues) => product.category == "vegetables"
                  )
                  .map((product: MyFormValues) => (
                    <ProductCard product={product} />
                  ))}
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value="3"><div className={classes.root}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {productsList.length > 0 &&
                productsList
                  ?.filter(
                    (product: MyFormValues) => product.category == "meat"
                  )
                  .map((product: MyFormValues) => (
                    <ProductCard product={product} />
                  ))}
            </Grid>
          </div></TabPanel>
          <TabPanel value="4"><div className={classes.root}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {productsList.length > 0 &&
                productsList
                  ?.filter(
                    (product: MyFormValues) => product.category == "beverages"
                  )
                  .map((product: MyFormValues) => (
                    <ProductCard product={product} />
                  ))}
            </Grid>
          </div></TabPanel>
          <TabPanel value="5"><div className={classes.root}>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              {productsList.length > 0 &&
                productsList
                  ?.filter(
                    (product: MyFormValues) => product.category == "icecreams"
                  )
                  .map((product: MyFormValues) => (
                    <ProductCard product={product} />
                  ))}
            </Grid>
          </div></TabPanel>
      </TabContext>
      
    </Box>
  );
}
