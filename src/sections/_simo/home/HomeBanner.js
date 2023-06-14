import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Button, Container, TextField, Typography, InputAdornment } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';
import Markdown from 'src/components/markdown/Markdown';

// ----------------------------------------------------------------------

export default function HomeBanner({ sx, ...other }) {
  const quote = `<blockquote>Make your problems become your strengths</blockquote> `;
  return (
    <Box sx={{ py: 4, bgcolor: 'background.neutral' }} {...other}>
      <Container>
        <Markdown content={quote} />
      </Container>
    </Box>
  );
}

HomeBanner.propTypes = {
  sx: PropTypes.object,
};
