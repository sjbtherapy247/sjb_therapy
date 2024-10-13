// SEO
import { FAQPageJsonLd } from 'next-seo';
import { m } from 'framer-motion';
import { useState } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Button, Accordion, Container, Typography, AccordionDetails, AccordionSummary, Unstable_Grid2 as Grid, Stack, styled } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// assets
import { Pattern01 } from 'src/assets/illustrations/pattern';
// components
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import { bgGradient } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const FAQ_CONTENTS = [
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
  // Add more FAQs as needed
];

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.85),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  overflow: 'hidden',
}));

export default function HomeFAQs() {
  const theme = useTheme();
  const isSmUp = useResponsive('up', 'sm');
  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // FAQ Schema integration for SEO
  const faqSchema = FAQ_CONTENTS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  return (
    <>
      {/* Structured FAQ Data for SEO */}
      <FAQPageJsonLd mainEntity={faqSchema} />

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
                <Typography variant="h2" align="center" fontWeight={500}>
                  Frequently Asked Questions
                </Typography>
              </m.div>

              <Box sx={{ my: { xs: 8, md: 10 } }}>
                {FAQ_CONTENTS.map((faq, index) => (
                  <m.div key={faq.question} variants={varFade({ durationIn: 0.5 }).inRight}>
                    <Accordion expanded={expanded === index} onChange={handleChangeExpanded(index)}>
                      <AccordionSummary>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontStyle: 'italic', fontWeight: 400 }}>
                          {faq.question}
                        </Typography>
                        <Iconify icon={expanded === index ? 'carbon:subtract' : 'carbon:add'} />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
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
                  <Typography variant="h3">Still Have Questions?</Typography>
                </m.div>

                <m.div variants={varFade().inUp}>
                  <Typography sx={{ mt: 3, mb: 5 }}>
                    Please reach out, I&apos;m happy to help.
                  </Typography>
                </m.div>

                <Stack direction="row" spacing={{ xs: 4, sm: 8 }} justifyContent="center">
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    href="https://wa.me/61413506300?text=Hi%20Simon%20I%20would%20like%20to%20know%20more%20about%20your%20services%20please"
                    target="_blank"
                    startIcon={<Iconify icon="mdi:cellphone-sound" />}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    href="/services/#hypnotherapyPackages"
                    startIcon={<Iconify icon="carbon:launch" />}
                  >
                    Book A Call
                  </Button>
                </Stack>
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
    </>
  );
}
