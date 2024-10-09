// @mui
import PropTypes from 'prop-types';
import { Typography, Stack, Container, Box } from '@mui/material';
// components
import Image from 'src/components/image';

// ----------------------------------------------------------------------

export default function MyAssociationsAbout({ associations }) {
  return (
    <Container
      sx={{
        pb: { xs: 7, md: 11 },
      }}
    >
      <Stack alignItems="center" spacing={5}>
        <Typography variant="h2">My Associations</Typography>

        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          sx={{ maxWidth: 680, overflow: 'hidden' }}
        >
          {associations.slice(0, 8).map((association) => (
            <Box key={association.id}>
              <Image
                alt={association.name}
                src={association.image}
                sx={{
                  height: 32,
                  mx: { xs: 2, md: 4 },
                  my: { xs: 2.5, md: 4 },
                }}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

MyAssociationsAbout.propTypes = {
  associations: PropTypes.array,
};
