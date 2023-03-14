import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RoutesToPages from "../Routes/Routes";
import SidebarItems from "./SidebarItems";
import { useDispatch } from "react-redux";
import { LOGOUT_ADMIN } from "../redux/login-action";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const dispatch = useDispatch();
  function Logout() {
   window.location.reload()
  
    console.log("log");
    // dispatch({ type: LOGOUT_ADMIN });
  };
 

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <SidebarItems />
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "space-evenly",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                Point Of Sale
              </Typography>
              <div style={{ marginLeft: "1400px" }}>
                <Button color="inherit" onClick={() => Logout()}>
                  Logout
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <RoutesToPages />
      </Box>
    </Box>
  );
}
