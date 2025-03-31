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
          variant="h2"
          component="blockquote"
          paragraph
          sx={{ fontStyle: 'italic', display: 'inline' }}
        >
          {firstQuote}
        </Typography>
        <Typography
          variant="h5"
          component="blockquote"
          paragraph
          sx={{ fontStyle: 'italic', display: 'inline' }}
        >
          {restOfQuote}
        </Typography>
      </Container>
    </Box>
  );
}

HomeBanner.propTypes = {
  quote: PropTypes.string, // Removed isRequired
  sx: PropTypes.object,
};

HomeBanner.defaultProps = {
  quote: "If you think you can do a thing or think you can't do a thing, you're (probably) right - Henry Ford",
};