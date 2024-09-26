import PropTypes from 'prop-types';
// @mui
import { Box, Button, Container, TextField, Typography, InputAdornment } from '@mui/material';
// components
// import SvgColor from 'src/components/svg-color';
import Markdown from 'src/components/markdown/Markdown';

// ----------------------------------------------------------------------

export default function HomeBanner({ sx, ...other }) {
  const quote = `<blockquote>If you think you can do a thing or think you can't do a thing, you're (probably) right - Henry Ford</blockquote> `;
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
