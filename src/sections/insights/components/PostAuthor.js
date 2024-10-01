import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Avatar, IconButton, Link } from '@mui/material';
// _mock
import { _socialsSimo } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PostAuthor({ author }) {
  const { name, role, about, quotes, picture } = author;

  return (
    <Stack
      direction="row"
      spacing={{ xs: 3, md: 4 }}
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Avatar src={picture} sx={{ width: 96, height: 96 }} />

      <Stack spacing={2}>
        <Stack spacing={2} alignItems={{ md: 'center' }} direction={{ xs: 'column', md: 'row' }} justifyContent={{ md: 'space-between' }}>
          <Stack spacing={0.5}>
            <Typography variant="h5">{name}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {role}
            </Typography>
          </Stack>

          <Stack direction="row">
            {_socialsSimo.map((social) => (
              <Link key={social.value} href={social.href} target="_blank" underline="none">
                <IconButton sx={{ color: social.color }}>
                  <Iconify icon={social.icon} />
                </IconButton>
              </Link>
            ))}
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {about}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {quotes}
        </Typography>
      </Stack>
    </Stack>
  );
}

PostAuthor.propTypes = {
  author: PropTypes.shape({
    about: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string,
    quotes: PropTypes.string,
    role: PropTypes.string,
  }),
};
