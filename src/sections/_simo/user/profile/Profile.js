/* eslint-disable prefer-template */
import { Avatar, Box, Button, DialogActions, DialogContent, DialogContentText, Input, TextField } from '@mui/material';
import { updateProfile } from 'firebase/auth';
import { useRef, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { useSettingsContext } from 'src/components/settings';

import resizeImage from 'src/lib/resizeImage';
// import uploadFile from '../context/uploadFile';

const Profile = () => {
  const {
    user,
    dispatch,
    state: { alert, modal },
  } = useSettingsContext();
  const [name, setName] = useState(user?.displayName);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const resizedImg = useRef({});

  // getting the new profile image file if one is selected
  const handleChange = async (e) => {
    const pic = e.target.files[0];
    if (pic) {
      resizedImg.current = await resizeImage(file, 80, 150);

      setFile(file);
      console.log(resizedImg);

      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'MODAL', payload: { ...modal, open: false } });
    dispatch({ type: 'START_LOADING' });
    const userUpdateObj = { displayName: name, photoURL }; // used for updating the auth
    const databaseUpdateObj = { uName: name, uAvatar: photoURL };
    try {
      if (file) {
        // const resizedImg = await resizeImage(file, 80, 150);
        const imageName = 'profile.jpg';
        // const url = await uploadFile(resizedImg.current.blob, `profile/${user?.uid}/${imageName}`);

        // firebasestorage.googleapis.com/v0/b/scc-proto.appspot.com/o/profile %2F M6pujkdevmSNNIowQpFPWtAbcPx2 %2F paella_8e96633c-9fb2-4de9-8a84-40bd73993f3e.jpg?alt=media&token=4d303da6-8bab-434b-bc02-f4468aa8563a

        // userUpdateObj.photoURL = url;
        // databaseUpdateObj.uAvatar = url;
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { ...alert, severity: 'error', open: true, message: error.message, duration: 3000 },
      });
      console.log(error.message);
    }

    await updateProfile(user, userUpdateObj);

    dispatch({ type: 'END_LOADING' });
    dispatch({
      type: 'UPDATE_ALERT',
      payload: { ...alert, severity: 'success', open: true, message: 'Profile updated successfully', duration: 3000 },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <Box sx={{ mt: -2, width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <TextField
            // autoFocus
            color="info"
            margin="normal"
            type="text"
            inputProps={{ minLength: 2 }}
            required
            label="Display Name"
            value={name || ''}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="profilePhoto">
            <Input inputProps={{ accept: 'image/*' }} id="profilePhoto" type="file" style={{ display: 'none' }} onChange={handleChange} />
            <Avatar sx={{ width: 80, height: 80, cursor: 'pointer', bgcolor: '#f9de00', color: 'black' }} src={photoURL} alt={user?.displayName} aria-label="profile photo">
              {user?.displayName?.charAt(0)}
            </Avatar>
          </label>
        </Box>
        <DialogContentText sx={{ mt: 2 }}>Edit display name, click on avatar to update photo </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" sx={{ mb: 1, mr: 1, borderRadius: 25 }}>
          Update Profile
        </Button>
      </DialogActions>
    </form>
  );
};
export default Profile;
