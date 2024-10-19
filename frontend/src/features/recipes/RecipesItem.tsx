import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { apiURL } from '../../constants';
import ModalPhoto from './ModalPhoto/ModalPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import imageNotAvailable from '../../assets/imageNotAvailable.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { removeRecipe } from './recipesThunk';

interface Props {
  _id: string;
  authorId: string;
  author: string;
  title: string;
  image: string | null;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '100%',
  '&:hover': {
    cursor: 'pointer',
  },
});

const RecipesItem: React.FC<Props> = ({ _id, authorId, author, title, image }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  let cardImage = imageNotAvailable;
  if (image) cardImage = apiURL + '/' + image;

  const user = useAppSelector(selectUser);

  return (
    <>
      <ModalPhoto image={cardImage} openModal={openModal} handleClose={handleCloseModal} alt={title} />
      <Grid item xs={12} sm={6} md={3}>
        <Card
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ImageCardMedia image={cardImage} title={title} onClick={handleOpenModal} />
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography paragraph variant="h6" margin={0}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              style={{
                margin: '0 0 20px',
              }}
            >
              By:
              <Typography
                component={Link}
                variant="h6"
                style={{
                  display: 'inline-block',
                  margin: '0 5px',
                  textDecoration: 'underline',
                  fontWeight: '500',
                }}
                to={`users/${authorId}`}
              >
                {author}
              </Typography>
            </Typography>
            {(user?.role === 'admin' || user?._id === authorId) && (
              <Button
                variant="contained"
                color="error"
                endIcon={<DeleteIcon />}
                style={{
                  marginTop: 'auto',
                }}
                onClick={() => confirm('Do you really want to remove?') && dispatch(removeRecipe(_id))}
              >
                Delete
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default RecipesItem;
