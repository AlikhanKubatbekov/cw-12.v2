import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// import { selectCreatePhotoError } from '../../../features/photos/photosSlice';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const createError = useAppSelector(selectCreatePhotoError);

  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // const getFieldError = (fieldName: string) => {
  //   try {
  //     return createError?.errors[fieldName].message;
  //   } catch {
  //     return undefined;
  //   }
  // };

  return (
    <>
      <input style={{ display: 'none' }} type="file" name={name} onChange={onFileChange} ref={inputRef} />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            fullWidth
            label={label}
            value={filename}
            onClick={activateInput}
            // error={Boolean(getFieldError('image'))}
            // helperText={getFieldError('image')}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput} startIcon={<CloudUploadIcon />}>
            Upload file
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
