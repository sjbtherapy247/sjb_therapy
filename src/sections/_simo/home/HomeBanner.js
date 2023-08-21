import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Button, Container, TextField, Typography, InputAdornment } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
// components
import SvgColor from 'src/components/svg-color';
import Markdown from 'src/components/markdown/Markdown';

// ----------------------------------------------------------------------

export default function HomeBanner({ sx, ...other }) {
  const quote = `<blockquote>Turn your problems into your strengths with Hypnotherapy</blockquote> `;
  return (
    <Box sx={{ py: 4, bgcolor: 'background.neutral' }} {...other}>
      <Container
      component={MotionViewport}
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 5, md: 15 },
      }}
      >
      
        <Markdown content={quote} />
      </Container>
    </Box>
  );
}

HomeBanner.propTypes = {
  sx: PropTypes.object,
};
