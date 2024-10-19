import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  handleUserLogout: () => void;
}

const sideDrawerClasses = {
  listItemText: {
    '& span': {
      fontSize: '1.3rem',
      textAlign: 'end',
    },
  },
  listItemIcon: {
    justifyContent: 'flex-end',
  },
};

const SideDrawer: React.FC<Props> = ({ mobileOpen, handleDrawerToggle, handleUserLogout }) => {
  const user = useAppSelector(selectUser);

  return (
    <Typography component="div" sx={{ display: { sm: 'none', xs: 'block' } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Typography
          component="div"
          style={{
            width: '240px',
          }}
        >
          <List>
            {user ? (
              <>
                <ListItemButton component={Link} to="/">
                  <ListItemText primary="Home" sx={sideDrawerClasses.listItemText} />
                  <ListItemIcon sx={sideDrawerClasses.listItemIcon}>
                    <HomeIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton component={Link} to={`users/${user._id}`}>
                  <ListItemText primary="My gallery" sx={sideDrawerClasses.listItemText} />
                  <ListItemIcon sx={sideDrawerClasses.listItemIcon}>
                    <CollectionsIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton onClick={handleUserLogout}>
                  <ListItemText primary="Log out" sx={sideDrawerClasses.listItemText} />
                  <ListItemIcon sx={sideDrawerClasses.listItemIcon}>
                    <ExitToAppIcon />
                  </ListItemIcon>
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton component={Link} to="/">
                  <ListItemText primary="Home" sx={sideDrawerClasses.listItemText} />
                  <ListItemIcon sx={sideDrawerClasses.listItemIcon}>
                    <HomeIcon />
                  </ListItemIcon>
                </ListItemButton>
                <Divider />
                <ListItemButton component={Link} to="/register">
                  <ListItemText primary="Register" sx={sideDrawerClasses.listItemText} />
                  <ListItemIcon sx={sideDrawerClasses.listItemIcon}>
                    <PersonAddIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton component={Link} to="/login">
                  <ListItemText primary="Login" sx={sideDrawerClasses.listItemText} />
                  <ListItemIcon sx={sideDrawerClasses.listItemIcon}>
                    <LoginIcon />
                  </ListItemIcon>
                </ListItemButton>
              </>
            )}
          </List>
        </Typography>
      </Drawer>
    </Typography>
  );
};

export default SideDrawer;
