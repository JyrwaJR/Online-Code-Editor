/** @format */
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useUserAuth } from "../Context/UserAuthContext";

import {
  AppRegistrationRounded,
  Book,
  Code,
  Dashboard,
  Home,
  LoginSharp,
  Logout,
  Password,
  Person,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const DrawerItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },

  {
    name: "Profile",
    path: "/profile",
    icon: <Person />,
  },
];

const DrawerItems2 = [
  {
    name: "Home",
    path: "/",
    icon: <Home />,
  },
  {
    name: "Read-ME",
    path: "/about",
    icon: <Book />,
  },
  {
    name: "Editor",
    path: "/editor",
    icon: <Code />,
  },
];

export default function SideDrawer({ children }) {
  const { user, logOut } = useUserAuth();
  const [isActiveList, setIsActiveList] = useState("Home");
  const Navigate = useNavigate();

  // handle logout
  const HandleLogOut = async () => {
    try {
      await logOut();
      Navigate("/signin");
    } catch (error) {
      alert("Something went wrong when Logging you out");
      console.log(error);
    }
  };

  const handleListItemClick = (e, value) => {
    e.preventDefault();
    if (value === "Home") {
      Navigate("/");
      setIsActiveList(value);
      return true;
    }
    if (value === "Editor") {
      Navigate("/Editor");
      setIsActiveList(value);
      return true;
    }
    if (value === "Read-ME") {
      Navigate("/about");
      setIsActiveList(value);
      return true;
    }
    if (value === "Login") {
      Navigate("/signin");
      setIsActiveList(value);
      return true;
    }
    if (value === "Setting") {
      setIsActiveList(value);
      return true;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            {DrawerItems.map(({ name, icon, path }, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  sx={user ? { color: "primary.main" } : { color: "none" }}
                  disabled={user && user ? false : true}
                  href={path}
                >
                  <ListItemIcon
                    sx={user ? { color: "primary.main" } : { color: "none" }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {DrawerItems2.map(({ name, path, icon }, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  href={path}
                  sx={user ? { color: "primary.main" } : { color: "none" }}
                  selected={isActiveList === name}
                  onClick={(e) => handleListItemClick(e, name)}
                >
                  <ListItemIcon
                    sx={user ? { color: "primary.main" } : { color: "none" }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              {user && user ? (
                <ListItemButton color="primary" onClick={HandleLogOut}>
                  <ListItemIcon color="inherit">
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              ) : (
                <ListItemButton href="/signin">
                  <ListItemIcon>
                    <LoginSharp />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItemButton>
              )}
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                href="/signup"
                disabled={user ? true : false}
                color="primary"
              >
                <ListItemIcon color="inherit">
                  <AppRegistrationRounded />
                </ListItemIcon>
                <ListItemText primary={"Register Now!"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                href="#"
                color="primary"
                selected={isActiveList === "Setting"}
              >
                <ListItemIcon color="inherit">
                  <Settings />
                </ListItemIcon>
                <ListItemText primary={"Setting"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
