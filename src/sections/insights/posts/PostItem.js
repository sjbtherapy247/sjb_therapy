import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// import React from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Stack, Avatar, Link } from '@mui/material';
// routes
// import { paths } from 'src/routes/paths';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// components
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import { varHover, varTranHover } from 'src/components/animate';
// import player from 'src/components/player/lazy';
//
import PostTimeBlock from '../components/PostTimeBlock';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    direction: 'to top',
    startColor: `${alpha(theme.palette.background.default, 0.2)} 0%`,
    endColor: theme.palette.mode === 'light' ? `${alpha(theme.palette.background.neutral, 1)} 75%` : `${alpha(theme.palette.common.black, 1)} 85%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

export default function PostItem({ post }) {
  const { url, title, duration, coverImg, author, createdAt, } = post;

  return (
    <Stack component={m.div} whileHover="hover" variants={varHover(1)} transition={varTranHover()} sx={{ borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
      <m.div variants={varHover(1.25)} transition={varTranHover()}>
        <Image src={coverImg} alt={title} ratio="3/4" />
      </m.div>

      <Stack
        justifyContent="space-between"
        sx={{
          p: 5,
          height: 1,
          zIndex: 9,
          position: 'absolute',
          // color: 'common.black',
        }}
      >
        <Stack spacing={2}>
          <PostTimeBlock duration={duration} createdAt={createdAt} sx={{ color: 'inherit', opacity: 0.72 }} />

          <Link component={NextLink} href={`/_simo/insights/${url}`} sx={{ color: 'inherit' }}>
            <TextMaxLine line={6} variant="h4">
              {title}
            </TextMaxLine>
          </Link>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Avatar src={author.picture} sx={{ mr: 1 }} />
          {author.name}
        </Stack>
      </Stack>

      <StyledOverlay />
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
    duration: PropTypes.string,
    title: PropTypes.string,
  }),
};
