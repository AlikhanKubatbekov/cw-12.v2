import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const AnonymousMenu = () => {
  return (
    <>
      <Button
        component={Link}
        color="inherit"
        to="/register"
        style={{
          gap: '5px',
          alignItems: 'center',
          marginRight: '5px',
        }}
      >
        Register
        <PersonAddIcon />
      </Button>
      <Button
        component={Link}
        color="inherit"
        to="/login"
        style={{
          alignItems: 'center',
          gap: '5px',
        }}
      >
        Sign in
        <LoginIcon />
      </Button>
    </>
  );
};

export default AnonymousMenu;
