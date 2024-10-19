import React from 'react';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';

interface Props {
  image: string;
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
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const ModalPhoto: React.FC<Props> = ({ image, openModal, handleClose, alt }) => {
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
              width: '100%',
              height: '90%',
              objectFit: 'contain',
            }}
          />
          <Button variant="outlined" style={{ margin: '20px auto' }} onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalPhoto;
