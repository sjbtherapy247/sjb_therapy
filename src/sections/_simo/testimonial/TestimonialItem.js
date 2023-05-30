import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Rating, Avatar } from '@mui/material';

// ----------------------------------------------------------------------

export default function TestimonialItem({ review, sx, ...other }) {
  const { reviewer, comment, starRating, reviewReply, createTime } = review;

  return (
    <Stack
      alignItems="center"
      sx={{
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Rating value={starRating} readOnly />

      <Typography
        sx={{
          my: 3,
          lineHeight: 1.75,
          fontSize: { md: 20 },
        }}
      >
        {comment}
      </Typography>
      <Stack direction="row" sx={{ my: 3, alignItems: 'center', justifyContent: 'center' }}>
        <Avatar src={reviewer.profilePhotoUrl} />
        <Stack sx={{ ml: 2, textAlign: 'left' }}>
          <Typography variant="h6">{reviewer.displayName}</Typography>
          <Typography variant="body2">{createTime}</Typography>
        </Stack>
      </Stack>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Response - {reviewReply.comment}
      </Typography>
    </Stack>
  );
}

TestimonialItem.propTypes = {
  sx: PropTypes.object,
  testimonial: PropTypes.object,
};
