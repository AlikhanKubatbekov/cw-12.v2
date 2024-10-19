import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { Avatar, Button, Typography } from '@mui/material';
import { apiURL } from '../../../constants';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import noAvatarAvailable from '../../../assets/noAvatarAvailable.png';

interface Props {
  handleUserLogout: () => void;
}

const UserMenu: React.FC<Props> = ({ handleUserLogout }) => {
  const user = useAppSelector(selectUser);
  let avatarImage = noAvatarAvailable;
  if (user?.avatar) avatarImage = `${apiURL}/${user.avatar}`;

  return (
    <Typography
      component="div"
      style={{
        display: 'flex',
        marginLeft: 'auto',
        alignItems: 'center',
      }}
    >
      {user && (
        <Typography
          component="div"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Avatar alt={user.displayName} src={user.googleId ? user.avatar || undefined : avatarImage} />
          <Typography
            component={Link}
            variant="h6"
            style={{
              color: 'inherit',
              fontSize: '1rem',
            }}
            to={`users/${user._id}`}
          >
            {user.displayName}
          </Typography>
        </Typography>
      )}

      <Button onClick={handleUserLogout} style={{ color: 'inherit', gap: '3px' }}>
        Log out
        <ExitToAppIcon />
      </Button>
    </Typography>
  );
};

export default UserMenu;
