import { useState } from 'react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import { Autocomplete, Box, Container, Fab, Stack, TextField, Typography } from '@mui/material';
// _mock
import _mock from 'src/_mock';
// routes
import { paths } from 'src/routes/paths';
// layouts
import MainLayout from 'src/layouts/main';
// components
import Iconify from 'src/components/iconify';
import Player, { PlayerDialog } from 'src/components/player';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

DemoPlayerPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoPlayerPage() {
  const OPTIONS = [
    { link: '/assets/relax-mp3/fireflies.mp3', label: 'Fireflies' },
    { link: '/assets/relax-mp3/catch-my-breath.mp3', label: 'Just Breath' },
    { link: '/assets/relax-mp3/mindfulness-journey.mp3', label: 'Mindfulness Awaits' },
    { link: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3', label: 'Demo' },
    { link: `https://www.dropbox.com/s/odzycivuo9cy5rg/video_01.mp4?dl=0`, label: 'Video Demo' },
    { link: `https://www.dropbox.com/s/7cx04n8rr4w5rbg/video_02.mp4?dl=0`, label: 'Silent Video' },
  ];

  const [openVideo, setOpenVideo] = useState(false);
  const [music, setMusic] = useState(OPTIONS[0]);

  const handleOpenVideo = () => {
    setOpenVideo(true);
  };

  const handleCloseVideo = () => {
    setOpenVideo(false);
  };

  console.log(music);

  return (
    <>
      <Head>
        <title>Components: Player | SJB Therapy</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Player"
            links={[
              {
                name: 'Components',
                href: paths.components.root,
              },
              { name: 'Player' },
            ]}
            moreLink={['https://www.npmjs.com/package/react-player']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <Block label="Session Audio Recordings">
            <Autocomplete
              options={OPTIONS}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              value={music}
              blurOnSelect
              onChange={(event, newValue) => {
                setMusic(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onKeyPress={(e) => {
                    e.preventDefault();
                  }}
                  label="Music to help you relax!"
                />
              )}
            />
          </Block>

          <Player
            controls
            playing={!!music}
            config={{ file: { attributes: { controlsList: 'nodownload' } } }} // Disable right click
            onContextMenu={(e) => e.preventDefault()}
            volume={0.5}
            url={music?.link}
          />

          <Stack alignItems="center" justifyContent="center">
            <Fab color="primary" variant="extended" onClick={handleOpenVideo}>
              <Iconify icon="carbon:play" width={24} />
              Open with Dialog
            </Fab>
          </Stack>
        </Box>
      </Container>

      <PlayerDialog open={openVideo} onClose={handleCloseVideo} videoPath={_mock.video(0)} />
    </>
  );
}
//

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
