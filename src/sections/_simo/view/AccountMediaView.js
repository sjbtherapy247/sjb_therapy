// next
// @mui
import { Box, Container, Typography, Stack, Autocomplete, TextField } from '@mui/material';
//
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Player from 'src/components/player/Player';
// import { useSettingsContext } from 'src/components/settings';
// import { CartList } from '../user/cart';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/lib/createFirebaseApp';
// import { fi } from 'date-fns/locale';
import { useSettingsContext } from 'src/components/settings';
import { AccountLayout } from '../layout';
// ----------------------------------------------------------------------

export default function AccountMediaView() {
  const OPTIONS = [
    { link: '/assets/relax-mp3/fireflies.mp3', label: 'Fireflies' },
    { link: '/assets/relax-mp3/catch-my-breath.mp3', label: 'Just Breath' },
    { link: '/assets/relax-mp3/mindfulness-journey.mp3', label: 'Mindfulness Awaits' },
  ];

  const { client } = useSettingsContext();

  const [music, setMusic] = useState(null);
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState([]);
  const [audioSJB, setAudioSJB] = useState([]);

  useEffect(() => {
    async function getAudios() {
      const sjbtherapyFileRef = ref(storage, `Client_Audios/sjbtherapy_all_audio`);
      const fileRef = ref(storage, `Client_Audios/${client?.email}`);
      const clientAudio = [];
      const sjbAudio = [];
      const allAudio = [];
      // const allAudio = []
      listAll(fileRef).then((res) => {
        res.items.forEach(async (itemRef) => {
          const link = await getDownloadURL(itemRef);
          clientAudio.push({ link, label: itemRef.name.split('.')[0] });
          allAudio.push({ link, label: itemRef.name.split('.')[0] });
        });
        setAudio(clientAudio);
      });
      listAll(sjbtherapyFileRef).then((res) => {
        res.items.forEach(async (itemRef) => {
          const link = await getDownloadURL(itemRef);
          // sjbAudio.push({ link, label: itemRef.name.split('.')[0] });
          allAudio.push({ link, label: itemRef.name.split('.')[0] });
        });
        setAudioSJB(allAudio);
      });
    }
    if (!client?.email) return;
    getAudios();
  }, [client]);

  return (
    <AccountLayout>
      <Container>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Therapy Session Audios & Updates
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
              options={audioSJB}
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
