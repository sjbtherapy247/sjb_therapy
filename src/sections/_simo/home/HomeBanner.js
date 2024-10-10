import PropTypes from 'prop-types';
// @mui
import { Box, Container } from '@mui/material';
// components
import Markdown from 'src/components/markdown/Markdown';

// ----------------------------------------------------------------------

export default function HomeBanner({ sx = {}, ...other }) {
  const quote = `<blockquote>If you think you can do a thing or think you can't do a thing, you're (probably) right - Henry Ford</blockquote>`;

  return (
    <Box
      sx={{
        py: { xs: 3, md: 4 }, // Responsive padding for different screen sizes
        bgcolor: 'background.neutral',
        textAlign: 'center', // Ensure the quote is centered
        ...sx, // Merging additional styles passed as props
      }}
      {...other}
    >
      <Container>
        <Markdown content={quote} />
      </Container>
    </Box>
  );
}

HomeBanner.propTypes = {
  sx: PropTypes.object,
};
