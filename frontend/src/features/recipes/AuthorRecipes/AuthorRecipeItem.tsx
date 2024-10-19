import React, { useState } from 'react';
import ModalPhoto from '../ModalPhoto/ModalPhoto';
import { Button, Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import imageNotAvailable from '../../../assets/imageNotAvailable.png';
import { apiURL } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeRecipeByAuthor } from '../recipesThunk';

interface Props {
  _id: string;
  authorId: string;
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

const AuthorRecipeItem: React.FC<Props> = ({ _id, authorId, title, image }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  let authorCardImage = imageNotAvailable;
  if (image) authorCardImage = apiURL + '/' + image;

  const user = useAppSelector(selectUser);

  return (
    <>
      <ModalPhoto image={authorCardImage} openModal={open} handleClose={handleCloseModal} alt={title} />
      <Grid item xs={12} sm={6} md={3}>
        <Card
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ImageCardMedia image={authorCardImage} title={title} onClick={handleOpenModal} />
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography
              paragraph
              variant="h6"
              style={{
                margin: '0 0 20px',
              }}
            >
              {title}
            </Typography>
            {(user?.role === 'admin' || user?._id === authorId) && (
              <Button
                variant="contained"
                color="error"
                endIcon={<DeleteIcon />}
                style={{
                  marginTop: 'auto',
                }}
                onClick={() =>
                  confirm('Do you really want to remove?') &&
                  dispatch(
                    removeRecipeByAuthor({
                      recipeId: _id,
                      userId: authorId,
                    }),
                  )
                }
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

export default AuthorRecipeItem;
