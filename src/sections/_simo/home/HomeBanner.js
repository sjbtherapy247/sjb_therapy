import PropTypes from 'prop-types';
import { Box, Container, Typography } from '@mui/material';

export default function HomeBanner({ quote, sx = {}, ...other }) {
  const firstQuote = quote.charAt(0);
  const restOfQuote = quote.slice(1);

  return (
    <Box
      sx={{
        py: { xs: 3, md: 4 },
        bgcolor: 'background.neutral',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Container>
        <Typography
          variant="h2" // Larger variant for the opening quote
          component="blockquote"
          paragraph
          sx={{ fontStyle: 'italic', display: 'inline' }} // Inline display
        >
          {firstQuote}
        </Typography>
        <Typography
          variant="h5" // Original variant for the rest of the quote
          component="blockquote"
          paragraph
          sx={{ fontStyle: 'italic', display: 'inline' }} // Inline display
        >
          {restOfQuote}
        </Typography>
      </Container>
    </Box>
  );
}

HomeBanner.propTypes = {
  quote: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

HomeBanner.defaultProps = {
    quote: "If you think you can do a thing or think you can't do a thing, you're (probably) right - Henry Ford",
}