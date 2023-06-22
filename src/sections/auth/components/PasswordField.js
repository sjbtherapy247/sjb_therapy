import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

const PasswordField = ({ label = 'Password', id = 'password', error = null, inputRef, size = null, helperText = '', sx = null }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <TextField
      color="info"
      sx={sx}
      label={label}
      helperText={helperText}
      size={size}
      type={showPassword ? 'text' : 'password'}
      required
      error={error}
      inputRef={inputRef}
      // inputProps={{ minLength: 6 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
              <Iconify icon={showPassword ? 'carbon:view' : 'carbon:view-off'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default PasswordField;
