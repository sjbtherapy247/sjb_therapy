import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// @mui
import { Box } from '@mui/material';
// config
import { HEADER } from 'src/config-global';
// page components
import Header from './header/Header';
import Footer from './footer/Footer';

// ----------------------------------------------------------------------

const pathsOnDark = ['/career/landing', '/travel/landing'];

const spacingLayout = [...pathsOnDark, '/', '/e-learning/landing', '/marketing/landing'];

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const { pathname } = useRouter();
  // check if pathname is in the array
  const actionPage = (arr) => arr.some((path) => pathname === path);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header headerOnDark={actionPage(pathsOnDark)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {/* {!actionPage(spacingLayout) && <Spacing />}{' '} */}
        {/* just puts xtra space above e-commerce menu  */}
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// ----------------------------------------------------------------------

function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_MAIN_DESKTOP },
      }}
    />
  );
}
