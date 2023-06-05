// next
import NextLink from 'next/link';
// @mui
import { Typography, Container, Box, Link } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

// const SERVICES = [
//   {
//     title: 'Anxiety and Phobias',
//     description: 'Using therapeutic approaches to address and alleviate anxiety disorders, phobias, and panic attacks.',
//     icon: '/assets/icons/ic_statistics.svg',
//   },
//   {
//     title: 'Sports Hypnotherapy - TRANCEformd',
//     description: 'Unlock your full potential and achieve next-level performance in sport through targeted hypnotherapy interventions.',
//     content:
//       'Unlocking next-level performance in sport is another area where Hypnotherapy and psychotherapy can be beneficial. These therapies can help individuals overcome mental blocks, boost confidence, enhance focus and concentration, manage stress and anxiety, improve motivation, and develop mental resilience. Whether you are an athlete aiming to achieve peak performance or a business professional seeking to excel in your career, hypnotherapy and psychotherapy can provide tools and strategies to optimize your mindset, unlock your potential, and achieve outstanding results. With the guidance of a skilled practitioner, you can tap into your inner resources and unleash your full capabilities in the realms of business and sport.',
//     icon: '/assets/icons/ic_file.svg',
//   },
//   {
//     title: 'Quit Smoking Forever',
//     description: 'Specialized programs and interventions to help individuals quit smoking and overcome nicotine and/or other addictions',
//     icon: '/assets/icons/ic_checklist.svg',
//   },
//   {
//     title: 'Stress Management',
//     description: 'Teaching stress reduction techniques, relaxation exercises, and mindfulness practices to help individuals manage stress and improve overall well-being',
//     icon: '/assets/icons/ic_social_media.svg',
//   },
//   {
//     title: 'Insomnia and sleep disorders',
//     description: 'Conquer insomnia and enjoy restful sleep with our personalized hypnotherapy service. Relax, reduce anxiety, and retrain your mind for deep, rejuvenating rest.',
//     icon: '/assets/icons/ic_real_time.svg',
//   },
//   {
//     title: 'Weight management and eating disorders',
//     description: 'Providing support and guidance in developing healthy eating habits, managing emotional eating, and fostering a positive body image.',
//     icon: '/assets/icons/ic_report.svg',
//   },
//   {
//     title: 'Trauma Therapy or Post-traumatic stress disorder (PTSD)',
//     description: 'Supporting individuals who have experienced traumatic events by providing trauma-focused therapy to process and heal from the effects of trauma.',
//     icon: '/assets/icons/ic_file.svg',
//   },
//   {
//     title: 'Depression and low self-esteem',
//     description: 'Boost your emotional well-being and improve self-esteem by effectively addressing depression through personalized hypnotherapy and psychotherapy interventions.',
//     icon: '/assets/icons/ic_checklist.svg',
//   },
//   {
//     title: 'Performance anxiety and stage fright',
//     description: 'Specialized hypnotherapy and psychotherapy techniques tailored to help individuals gain confidence, manage stress, and enhance their performance in high-pressure situations.',
//     content: 'Overcome performance anxiety and stage fright with specialized hypnotherapy and psychotherapy techniques tailored to help individuals gain confidence, manage stress, and enhance their performance in high-pressure situations.',
//     icon: '/assets/icons/ic_report.svg',
//   },
// ];

// ----------------------------------------------------------------------

export default function ServicesInclude({ services }) {
  return (
    <Container
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Typography variant="h2">Services Include</Typography>

      <Typography
        sx={{
          mt: 3,
          mx: 'auto',
          maxWidth: 480,
          color: 'text.secondary',
          mb: { xs: 8, md: 10 },
        }}
      >
        Nunc nonummy metus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.
      </Typography>

      <Box
        sx={{
          rowGap: 8,
          columnGap: 10,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {services.map((service) => (
          <div key={service.title}>
            <SvgColor src={service.icon} color="info" sx={{ width: 64, height: 64, mx: 'auto', bgcolor: 'primary.main' }} />
            <Link component={NextLink} href={`/hypnotherapy-services/${service.url}`}>
              <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                {service.title}
                {service.title.includes('TRANCE') && <sup style={{ fontSize: '10px' }}>TM</sup>}
              </Typography>
            </Link>

            <Typography sx={{ color: 'text.secondary' }}> {service.description} </Typography>
          </div>
        ))}
      </Box>
    </Container>
  );
}
