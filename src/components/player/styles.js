// next
import dynamic from 'next/dynamic';
// @mui
import { styled, alpha } from '@mui/material/styles';
// utils
import { bgGradient } from 'src/utils/cssStyles';
//
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

// ----------------------------------------------------------------------

export const StyledReactPlayer = styled(ReactPlayer)(({ theme }) => ({
  width: '100% !important',
  height: '100% !important',
  minHeight: '80px',
  borderRadius: 10,
  overflow: 'hidden',
  '& audio': {
    '&::-webkit-media-controls-play-button': {
      backgroundColor: theme.palette.primary.light,
    },
    '&::-webkit-media-controls-panel': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  '& video': {
    objectFit: 'cover',
  },
}));

export const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
}));
