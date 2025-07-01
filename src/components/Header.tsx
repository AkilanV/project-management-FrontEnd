import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box,
  Menu, MenuItem, IconButton, Divider,useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MechanicImg from '../assets/Images/mechanic.png';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

interface User {
  name?: string;
  email?: string;
  username?: string;
  role?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
const isMobile = useMediaQuery("(max-width:820px)");

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left - Logo */}
        <Box display="flex" alignItems="center">
          <img
            src="https://cdn.motovisuals.com/menuboard/logos/technet-logo.png"
            alt="TechNet Logo"
            style={{ height: 40 }}
          />
        </Box>

        {/* Right*/}
        <Box>
          <IconButton onClick={handleMenuOpen} sx={{ color: "black", fontSize: "35px" }}>
            <AccountCircleRoundedIcon sx={{ fontSize: "inherit" }} />
          </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  width: isMobile ? 250 : 300,
                  mt: 1.5,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
          <Box
            sx={{
              // pt: 2,pb: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>

            {/* <UserImage> */}
            <img src={MechanicImg} alt="Preview" style={{ maxWidth: '22%' }} />

            <Typography variant="body1"
              sx={{mt: 1,fontSize: isMobile ? "1rem" : "1.25rem",fontWeight: "bold",color: "black",}}>
              {user.username}</Typography>

            <Divider
              sx={{
                width: "100%",
                borderColor: "grey.400",
                mt: 2,
              }}
            />

            {/* Logout */}
            <MenuItem
              onClick={handleLogout}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "error.main",
                fontWeight: "bold",
                width: "100%",
                mt: 1,
                position: "relative",
              }}>
              <Typography sx={{ flex: 1, textAlign: "left",fontWeight: "bold", }}>Logout</Typography>
              <LogoutIcon sx={{ ml: 1,fontWeight: "bold", fontSize: isMobile ? 18 : 20, flex: "none" }} />
            </MenuItem>
          </Box>
            </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
