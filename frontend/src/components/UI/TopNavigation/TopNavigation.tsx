import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLoginLoading, selectRegisterLoading, selectUser } from '../../../features/users/usersSlice';
import { AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import { userLogout } from '../../../features/users/usersThunk';
import { Link } from 'react-router-dom';
import { theme } from '../../../constants';
import MenuIcon from '@mui/icons-material/Menu';
import SideDrawer from './SideDrawer';
// import {
//   selectCreatePhotoLoading,
//   selectFetchAuthorLoading,
//   selectPhotosByAuthorFetchLoading,
//   selectPhotosFetchLoading,
//   selectRemovePhotoLoading,
// } from '../../../features/photos/photosSlice';

const TopNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const loginLoading = useAppSelector(selectLoginLoading);
  // const fetchAllPhotosLoading = useAppSelector(selectPhotosFetchLoading);
  // const fetchPhotosByAuthorLoading = useAppSelector(selectPhotosByAuthorFetchLoading);
  // const fetchAuthorByPhotoLoading = useAppSelector(selectFetchAuthorLoading);
  // const removePhotoLoading = useAppSelector(selectRemovePhotoLoading);
  // const createPhotoLoading = useAppSelector(selectCreatePhotoLoading);

  const loadingBox = (
    <Box width="100%">
      <LinearProgress />
    </Box>
  );

  const handleUserLogout = () => {
    dispatch(userLogout());
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            sx={{
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <SideDrawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            handleUserLogout={handleUserLogout}
          />

          <Button
            component={Link}
            sx={{
              fontSize: '1.25rem',
              fontWeight: '600',
              justifyContent: 'flex-start',
            }}
            color="inherit"
            to="/"
          >
            Recipes
          </Button>
          <Typography
            component="div"
            sx={{
              [theme.breakpoints.only('xs')]: {
                display: 'none',
              },
            }}
          >
            {user ? <UserMenu handleUserLogout={handleUserLogout} /> : <AnonymousMenu />}
          </Typography>
        </Toolbar>
      </Container>
      {registerLoading && loadingBox}
      {loginLoading && loadingBox}
      {/*{fetchAllPhotosLoading && loadingBox}*/}
      {/*{(fetchPhotosByAuthorLoading || fetchAuthorByPhotoLoading) && loadingBox}*/}
      {/*{removePhotoLoading && loadingBox}*/}
      {/*{createPhotoLoading && loadingBox}*/}
    </AppBar>
  );
};

export default TopNavigation;
