// @mui
import PropTypes from 'prop-types';
import { Pagination, Box } from '@mui/material';
//
import PostItem from './PostItem';

// ----------------------------------------------------------------------

export default function ResearchPosts({ posts }) {
  console.log(posts);
  return (
    <>
      <Box
        sx={{
          columnGap: 2,
          display: 'grid',
          rowGap: { xs: 2, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Box>

      <Pagination
        count={4}
        color="primary"
        size="large"
        sx={{
          my: 10,
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

ResearchPosts.propTypes = {
  posts: PropTypes.array,
};
