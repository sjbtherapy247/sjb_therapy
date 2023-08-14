// @mui
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
//
import PostItemMobile from '../components/PostItemMobile';

// ----------------------------------------------------------------------

export default function BlogSidebarRecentPosts({ recentPosts }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">Recent InSights</Typography>

      {recentPosts.map((post) => (
        <PostItemMobile key={post.id} post={post} onSiderbar />
      ))}
    </Stack>
  );
}

BlogSidebarRecentPosts.propTypes = {
  recentPosts: PropTypes.array,
};
