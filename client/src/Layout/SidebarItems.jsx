import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GroupsIcon from "@mui/icons-material/Groups";
import InventoryIcon from '@mui/icons-material/Inventory';

import './sidebar.css'
const navigation = [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
   
    {
      title: "Employees",
      href: "/employees",
      icon: <GroupsIcon />
    },
    {
      title: "Products",
      href: "/products",
      icon: <InventoryIcon />
    },
    {
      title: "Cart",
      href: "/cart",
      icon: <ShoppingCartIcon />
    },
    {
      title: "Invoices",
      href: "/invoices",
      icon: <ReceiptIcon />,
    },
    
   
  
  ];
function SidebarItems() {
    return (
        <List>
        {navigation.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton className="css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root:hover " component={Link} to={item.href} autoFocus={true}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
     
    );
  }
  
  export default SidebarItems;
  