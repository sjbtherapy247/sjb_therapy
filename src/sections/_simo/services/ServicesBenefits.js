import PropTypes from 'prop-types';
// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    title: 'Emotional Healing',
    description: 'A safe and supportive space to explore and heal emotional wounds, traumas, and unresolved issues, fostering emotional well-being.',
    iconColor: 'primary',
  },
  {
    title: 'Behavior Change',
    description: 'Identify and modify unhealthy patterns, habits, and behaviors, make positive changes and adopt healthier ways of living. ',
    iconColor: 'success',
  },
  {
    title: 'Stress Reduction',
    description: 'Effectively reduce stress levels by teaching relaxation techniques, coping strategies, and stress management skills, enhancing overall well-being and resilience.',
    iconColor: 'secondary',
  },
  {
    title: 'Increased Self-Awareness',
    description: 'Gain a deeper understanding of yourself, your emotions, and your thought patterns, facilitating personal growth, self-acceptance, and self-empowerment.',
  },
  {
    title: 'Improved Relationships',
    description: 'Develop healthier communication skills, resolving conflicts, and enhancing your relationships with others.',
    iconColor: 'success',
  },
  {
    title: 'Enhanced Mental Well-being',
    description: 'Alleviate symptoms of anxiety, depression, and other mental health conditions, improving overall mental well-being and promoting a more balanced and fulfilling life.',
    iconColor: 'secondary',
  },
];

// ----------------------------------------------------------------------

export default function ServicesBenefits() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: { xs: 8, md: 10 },
      }}
    >
      <Container>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Benefits Achieved
        </Typography>

        <Typography
          sx={{
            mt: 3,
            mx: 'auto',
            opacity: 0.72,
            // maxWidth: 480,
            textAlign: 'center',
            mb: { xs: 8, md: 10 },
          }}
        >
          These are just a few of the many benefits individuals can experience through hypnotherapy and psychotherapy treatments. The specific benefits may vary depending on the individual&apos;s needs and the therapeutic approach employed.{' '}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            gap: { xs: 4, md: 1 },
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          }}
        >
          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(0, 3).map((benefit, index) => (
              <BenefitItem key={benefit.title} benefit={benefit} index={index} reverse />
            ))}
          </Stack>

          {isMdUp && <Image alt="benefits" src="/assets/illustrations/illustration_map.svg" />}

          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(-3).map((benefit, index) => (
              <BenefitItem key={benefit.title} benefit={benefit} index={index} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function BenefitItem({ benefit, reverse, index }) {
  const { title, description, iconColor } = benefit;

  return (
    <Stack
      spacing={1}
      direction={{ xs: 'row', md: reverse ? 'row-reverse' : 'row' }}
      sx={{
        ...(reverse && {
          textAlign: { md: 'right' },
        }),
        ...(index === 1 && {
          pl: { md: 6 },
          ...(reverse && {
            pl: { md: 0 },
            pr: { md: 6 },
          }),
        }),
      }}
    >
      <Box
        sx={{
          m: 1,
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: '50%',
          background: (theme) => `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          ...(iconColor === 'secondary' && {
            background: (theme) => `linear-gradient(to bottom, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
          }),
          ...(iconColor === 'success' && {
            background: (theme) => `linear-gradient(to bottom, ${theme.palette.success.light}, ${theme.palette.success.main})`,
          }),
        }}
      />

      <Stack spacing={1}>
        <Typography variant="h5">{title}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}

BenefitItem.propTypes = {
  benefit: PropTypes.shape({
    description: PropTypes.string,
    iconColor: PropTypes.string,
    title: PropTypes.string,
  }),
  index: PropTypes.number,
  reverse: PropTypes.bool,
};
