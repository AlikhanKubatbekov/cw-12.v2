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
import {
  selectCreateRecipeLoading,
  selectFetchAuthorLoading,
  selectRecipesByAuthorFetchLoading,
  selectRecipesFetchLoading,
  selectRemoveRecipeLoading,
} from '../../../features/recipes/recipesSlice';

const TopNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const registerLoading = useAppSelector(selectRegisterLoading);
  const loginLoading = useAppSelector(selectLoginLoading);
  const fetchAllRecipesLoading = useAppSelector(selectRecipesFetchLoading);
  const fetchRecipesByAuthorLoading = useAppSelector(selectRecipesByAuthorFetchLoading);
  const fetchAuthorByRecipeLoading = useAppSelector(selectFetchAuthorLoading);
  const removeRecipeLoading = useAppSelector(selectRemoveRecipeLoading);
  const createRecipeLoading = useAppSelector(selectCreateRecipeLoading);

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
      {fetchAllRecipesLoading && loadingBox}
      {(fetchRecipesByAuthorLoading || fetchAuthorByRecipeLoading) && loadingBox}
      {removeRecipeLoading && loadingBox}
      {createRecipeLoading && loadingBox}
    </AppBar>
  );
};

export default TopNavigation;
