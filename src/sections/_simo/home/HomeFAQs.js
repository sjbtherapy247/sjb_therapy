import { m } from 'framer-motion';
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Button, Accordion, Container, Typography, AccordionDetails, AccordionSummary, Unstable_Grid2 as Grid, useTheme, Stack, styled } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// assets
import { Pattern01 } from 'src/assets/illustrations/pattern';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const CONTENTS = [
  {
    question: `What is hypnotherapy?`,
    answer: `Hypnotherapy is a therapeutic approach that utilises hypnosis to induce a relaxed state of focused attention. In this state, individuals become more open to suggestions, allowing for exploration of the subconscious mind and addressing various issues.`,
  },
  {
    question: 'How does hypnotherapy work?',
    answer: `Hypnotherapy works by guiding individuals into a state of deep relaxation and heightened suggestibility. In this state, the therapist can help individuals access their subconscious mind, where they can explore and address underlying thoughts, emotions, and behaviours.`,
  },
  {
    question: 'What can hypnotherapy help with?',
    answer: `Hypnotherapy can assist with a wide range of issues, including managing stress and anxiety, overcoming phobias and fears, improving sleep patterns, boosting confidence and self-esteem, addressing habits or addictions, managing pain, and promoting overall well-being.`,
  },
  {
    question: 'What does it feel like to be hypnotised?',
    answer: `Being hypnotised is often described as a state of deep relaxation and focused concentration. Individuals mostly feel calm, peaceful, and detached from their surroundings. Some people may experience heightened awareness or a sense of inward focus.`,
  },
  {
    question: 'What is the difference between hypnotherapy and psychotherapy?',
    answer: `Hypnotherapy is a therapeutic approach that utilises hypnosis to access the subconscious mind, whereas psychotherapy encompasses various talk therapies focused on addressing emotional and mental health issues.`,
  },
  {
    question: 'How long does hypnotherapy or psychotherapy treatment typically last?',
    answer: `A typical session lasts 60 minutes, the number of appointments varies depending on the individual and their specific needs. Some issues may be resolved in one session, while others may require more. Simon will work with you to determine the appropriate treatment length.`,
  },
  {
    question: 'Are hypnotherapy and psychotherapy evidence-based practices?',
    answer: `Yes, both hypnotherapy and psychotherapy have a foundation in evidence-based practices. Numerous studies support the effectiveness of these therapies for various conditions, and many therapists adhere to evidence-based treatment approaches to ensure optimal results.`,
  },
];

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.85),
    // imgUrl: '/assets/images/simon/20230513_145715.jpg',
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  overflow: 'hidden',
}));

export default function HomeFAQs() {
  const isSmUp = useResponsive('up', 'sm');
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
  };
  return (
    <StyledRoot>
      <Container
        component={MotionViewport}
        sx={{
          position: 'relative',
          py: { xs: 4, md: 8 },
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={{ md: 3 }} justifyContent="center">
          <Grid xs={12} md={8}>
            <m.div variants={varFade().inLeft}>
              <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 500 }}>
                Frequently Asked Questions
              </Typography>
            </m.div>

            <Box
              sx={{
                my: { xs: 8, md: 10 },
              }}
            >
              {CONTENTS.map((faq) => (
                <m.div key={faq.question} variants={varFade({ durationIn: 0.5 }).inRight}>
                  <Accordion expanded={expanded === faq.question} onChange={handleChangeExpanded(faq.question)}>
                    <AccordionSummary>
                      <Typography color="text.secondary" variant="h6" fontStyle="italic" fontWeight="400" component="div" sx={{ flexGrow: 1 }}>
                        {faq.question}
                      </Typography>
                      <Box sx={{ minWidth: '25px' }}>
                        <Iconify color={theme.palette.primary.main} icon={expanded === faq.question ? 'carbon:subtract' : 'carbon:add'} />
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography color="text.secondary">{faq.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </m.div>
              ))}
            </Box>

            <Box
              sx={{
                borderWidth: 1,
                borderRadius: 3,
                textAlign: 'center',
                borderStyle: 'dashed',
                borderColor: alpha(theme.palette.grey[500], 0.32),
                px: { xs: 3, md: 0 },
                py: { xs: 6, md: 8 },
              }}
            >
              <m.div variants={varFade().inUp}>
                <Typography variant="h3">More Questions?</Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>Please reach out with any specific questions you have.</Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Stack direction="row" spacing={{ xs: 4, sm: 8 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button size="large" color="primary" variant="contained" href="https://wa.me/61413506300?text=Hi%20Simon%20I%20would%20like%20to%20know%20more%20about%20your%20services%20please"target="_blank" startIcon={<Iconify icon="mdi:cellphone-sound" />} onClick={handleClick}>
                    WhatsApp {click && isSmUp ? ' ' : null}
                    {/* Call */}
                  </Button>
                  <Button size="large" color="primary" variant="contained" href="mailto:hello@sjbtherapy.com? subject=SjB Therapy Home Enquiry "target="_blank" startIcon={<Iconify icon="mdi:email-outline" />}>
                    Email
                  </Button>
                </Stack>
              </m.div>
            </Box>
          </Grid>
        </Grid>

        {isSmUp && (
          <Pattern01
            sx={{
              top: 80,
              left: 0,
              right: 0,
              zIndex: -1,
              mx: 'auto',
              maxWidth: 600,
              maxHeight: 600,
            }}
          />
        )}
      </Container>
    </StyledRoot>
  );
}
