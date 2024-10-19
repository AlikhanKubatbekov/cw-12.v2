import React from 'react';
import { Backdrop, Box, Button, CardContent, Fade, Modal, Typography } from '@mui/material';

interface Props {
  image: string;
  title: string;
  recipe: string;
  openModal: boolean;
  handleClose: () => void;
  alt: string;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  p: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px'
};

const ModalPhoto: React.FC<Props> = ({ image, title, recipe, openModal, handleClose, alt }) => {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box sx={modalStyle}>
          <Typography
            component="img"
            src={image}
            alt={alt}
            style={{
              width: '45%',
              height: '90%',
              objectFit: 'contain',
            }}
          />
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0',
              height: '100%'
            }}
          >
            <Typography paragraph variant="h4" marginBottom={2}>
              {title}
            </Typography>
            <Typography paragraph variant="h5" marginBottom={1}>
              Recipe:
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontSize: '16px'
              }}
            >
              {recipe}
            </Typography>
            <Button variant="outlined" style={{alignSelf: 'start', marginTop: 'auto' }} onClick={handleClose}>
              Close
            </Button>
          </CardContent>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalPhoto;
