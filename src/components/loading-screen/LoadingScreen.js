import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// utils
import { bgBlur } from 'src/utils/cssStyles';
//
import Logo from '../logo';
import { useSettingsContext } from '../settings';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgBlur({
    blur: 2,
    opacity: 0.8,
    color: '#111111',
  }),
  top: 0,
  zIndex: 9999,
  position: 'fixed',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

export default function LoadingScreen({ sx }) {
  const { themeMode } = useSettingsContext();
  return (
    <>
      <StyledRoot sx={sx}>
        <m.div
          animate={{
            scale: [1, 0.96, 1, 0.96, 1],
            opacity: [1, 0.48, 1, 0.48, 1],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          <Logo single />
        </m.div>
      </StyledRoot>

      <Box sx={{ width: 1, height: '100vh', bgcolor: themeMode === 'light' ? 'white' : '#111118' }} />
    </>
  );
}

LoadingScreen.propTypes = {
  sx: PropTypes.object,
};
