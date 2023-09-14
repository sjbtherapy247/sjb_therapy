// next
// @mui
import { Box, Container, Typography, Stack, Autocomplete, TextField } from '@mui/material';

// fb
// import { db } from 'src/lib/createFirebaseApp';
// import { ref, onValue } from 'firebase/database';
// components
import Iconify from 'src/components/iconify';
//
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Player from 'src/components/player/Player';
// import { useSettingsContext } from 'src/components/settings';
// import { CartList } from '../user/cart';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/lib/createFirebaseApp';
// import { fi } from 'date-fns/locale';
import { AccountLayout } from '../layout';
// ----------------------------------------------------------------------

export default function AccountMediaView() {
  const OPTIONS = [
    {
      link: 'https://firebasestorage.googleapis.com/v0/b/sjbtherapy-365805.appspot.com/o/Client%20Audios%2FSP01%2FSjB%20Therapy%20Session%201%20Audio%20-%20SP01%20131123.mp3?alt=media&token=952d63ae-68de-4171-97d0-b5b18aaaaaad',
      label: 'SJB Therapy Session 1',
    },
    { link: '/assets/relax-mp3/fireflies.mp3', label: 'Fireflies' },
    { link: '/assets/relax-mp3/catch-my-breath.mp3', label: 'Just Breath' },
    { link: '/assets/relax-mp3/mindfulness-journey.mp3', label: 'Mindfulness Awaits' },
    { link: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3', label: 'Demo' },
    { link: `https://www.dropbox.com/s/odzycivuo9cy5rg/video_01.mp4?dl=0`, label: 'Video Demo' },
    { link: `https://www.dropbox.com/s/7cx04n8rr4w5rbg/video_02.mp4?dl=0`, label: 'Silent Video' },
  ];

  const [music, setMusic] = useState(null);
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState([]);

  async function getAudios() {
    const fileRef = ref(storage, 'Client Audios/SP01');
    listAll(fileRef).then((res) => {
      const audioList = [];
      res.items.forEach(async (itemRef) => {
        const link = await getDownloadURL(itemRef);
        audioList.push({ link, label: itemRef.name.split('.')[0] });
      });
      setAudio(audioList);
    });
  }

  useEffect(() => {
    getAudios();
  }, []);

  console.log(audio);

  return (
    <AccountLayout>
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Therapy Session Audio & Music
        </Typography>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
        >
          <Block label="Session Audio Recordings">
            <Autocomplete
              options={audio}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              value={music}
              blurOnSelect
              onChange={(event, newValue) => {
                setMusic(newValue);
                setPlay(true);
              }}
              renderInput={(params) => <TextField {...params} label="Click for Session Audio" />}
            />
          </Block>

          <Player
            controls
            playing={play}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }} // Disable right click
            onContextMenu={(e) => e.preventDefault()}
            volume={0.5}
            url={music?.link}
          />
        </Box>
      </Container>
    </AccountLayout>
  );
}

function Block({ label = 'Audio Player', sx, children }) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'right',
          fontStyle: 'italic',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
