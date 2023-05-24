// @mui
import { styled, alpha } from '@mui/material/styles';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
import { Typography, Container } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    step: 'STEP 1',
    title: 'Assessment',
    description: 'Gathering relevant information about the individuals needs, goals, and medical history to determine the most appropriate treatment approach.',
  },
  {
    step: 'STEP 2',
    title: 'Induction',
    description: 'Guiding the individual into a relaxed state of hypnosis, typically through relaxation techniques, visualization, or focused attention.',
  },
  {
    step: 'STEP 3',
    title: 'Therapy',
    description: 'Engaging in therapeutic interventions while in the hypnotic state, such as suggestion therapy, regression, cognitive restructuring, or visualization, tailored to address specific concerns or goals.',
  },
  {
    step: 'STEP 4',
    title: 'Termination and Integration',
    description: 'Gradually bringing the individual out of hypnosis, allowing time for reflection, discussing the session, and integrating the insights gained into their daily life.',
  },
];

const COLORS = ['primary', 'warning', 'secondary', 'success'];

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  padding: theme.spacing(10, 0),
  color: theme.palette.common.white,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function MarketingServicesHowItWork() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          How It Works
        </Typography>

        <Typography
          sx={{
            mt: 3,
            mx: 'auto',
            opacity: 0.72,
            // maxWidth: 480,
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          These steps serve as a general framework, and the specific techniques and approaches may vary depending on the therapist&apos;s style and the needs of the individual being treated.
        </Typography>

        <Timeline position={isMdUp ? 'alternate' : 'right'}>
          {TIMELINES.map((value, index) => (
            <TimelineItem
              key={value.title}
              sx={{
                '&:before': {
                  ...(!isMdUp && { display: 'none' }),
                },
              }}
            >
              <TimelineSeparator>
                <TimelineDot color={COLORS[index]} />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ pb: { xs: 3, md: 2 } }}>
                <Typography variant="overline" sx={{ color: `${COLORS[index]}.main` }}>
                  {value.step}
                </Typography>

                <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.72,
                    // maxWidth: { md: 360 },
                    ...(index % 2 && {
                      ml: 'auto',
                    }),
                  }}
                >
                  {value.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </StyledRoot>
  );
}
