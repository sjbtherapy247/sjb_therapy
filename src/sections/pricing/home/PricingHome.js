import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { bgGradient } from 'src/utils/cssStyles';
// components
import { MotionViewport, varFade } from 'src/components/animate';
//
import PlanCard from './PlanCard';

const StyledRoot = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  ...bgGradient({
    color: alpha(theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
}));
// ----------------------------------------------------------------------

export default function PricingHome({ plans }) {
  return (
    <StyledRoot>
      <Container
        component={MotionViewport}
        sx={{
          pt: { xs: 1, md: 1 },
          pb: { xs: 5, md: 5 },
        }}
      >
        <Box
          sx={{
            mb: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              pricing plans
            </Typography>
          </m.div>

          {/* <m.div variants={varFade().inDown}> */}
          <Typography variant="h2" sx={{ my: 3 }}>
            The Right Plan <br />
            For Your Business
          </Typography>
          {/* </m.div> */}

          <m.div variants={varFade().inUp}>
            <Typography sx={{ color: 'text.secondary' }}>
              Choose the perfect plan for your needs. Always flexible to grow
            </Typography>
          </m.div>
        </Box>

        <Box
          sx={{
            gap: 4,
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {plans.map((plan) => (
            <m.div key={plan.license} variants={varFade({ distance: 240 }).inDown}>
              <PlanCard plan={plan} />
            </m.div>
          ))}
        </Box>
      </Container>
    </StyledRoot>
  );
}

PricingHome.propTypes = {
  plans: PropTypes.array,
};
