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
    title: 'Discovery Call',
    description: 'Where I get to understand what’s going on for you and to see how hypnotherapy will work for you.',
  },
  {
    step: 'STEP 2',
    title: 'First Session',
    description: 'Get a deeper level of understanding about how you are running things and then we determine the best approach. You will then have a hypnosis session where we implement your desired changes. Tasking and follow-ups are also set or focused attention.',
  },
  {
    step: 'STEP 3',
    title: 'Tasking',
    description: 'During the following week, you will carry out the tasking that has been set. This is generally listening to an audio and following some simple agreed requests to further strengthen your neural pathways. These will vary for each client.',
  },
  {
    step: 'STEP 4',
    title: 'Integration',
    description: 'This is where you note down the changes in your behaviour and feedback via a follow-up form. If already booked, you will then also look forward to your next session, if not then you will move be moving on with your life free of whatever it was you saw me for.',
  },
];

const COLORS = ['primary', 'warning', 'secondary', 'success'];

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  padding: theme.spacing(10, 0),
  color: theme.palette.text.primary,
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
