import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Avatar, Link } from '@mui/material';
// routes
// import { paths } from 'src/routes/paths';
// utils
import { fDate } from 'src/utils/formatTime';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
//
import PostTimeBlock from '../components/PostTimeBlock';

// ----------------------------------------------------------------------

export default function PostItem({ post }) {
  const { url, title, duration, coverImg, author, description, createdAt } = post;

  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ bgcolor: 'background.default' }}
    >
      <Image src={coverImg} alt={title} sx={{ flexGrow: 1, height: { xs: 200, md: 400 } }} />

      <Stack
        justifyContent="space-between"
        sx={{
          mx: 'auto',
          p: { xs: 2, md: 5 },
          maxWidth: { md: 400 },
        }}
      >
        <Stack spacing={1}>
          <PostTimeBlock createdAt={fDate(createdAt)} duration={duration} />

          <Link component={NextLink} href={`/research/${url}`} color="inherit">
            <TextMaxLine line={3} variant="h3">
              {title}
            </TextMaxLine>
          </Link>

          <TextMaxLine line={3} variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </TextMaxLine>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ pt: 2, typography: 'body2' }}>
          <Avatar src={author.picture} sx={{ mr: 1 }} />
          {author.name}
        </Stack>
      </Stack>
    </Stack>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.string,
      picture: PropTypes.string,
    }),
    coverImg: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    description: PropTypes.string,
    duration: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};
