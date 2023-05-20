// _mock
import { _testimonials } from 'src/_mock';
//
import ScrollProgress from 'src/components/scroll-progress';
import TestimonialEcommerce from '../../testimonial/e-commerce';
import { EcommerceHeader } from '../layout';
import {
  EcommerceLandingHero,
  EcommerceLandingCategories,
  EcommerceLandingTopProducts,
  EcommerceLandingHotDealToday,
  EcommerceLandingSpecialOffer,
  EcommerceLandingFeaturedBrands,
  EcommerceLandingPopularProducts,
  EcommerceLandingFeaturedProducts,
} from '../landing';

// ----------------------------------------------------------------------

export default function EcommerceLandingView() {
  return (
    <>
      <ScrollProgress />
      <EcommerceHeader />
      <EcommerceLandingHero />
      {/* <EcommerceLandingCategories /> */}
      {/* <EcommerceLandingHotDealToday /> */}
      <EcommerceLandingFeaturedProducts />
      <EcommerceLandingSpecialOffer />
      <EcommerceLandingFeaturedBrands />
      <EcommerceLandingPopularProducts />
      <EcommerceLandingTopProducts />
      <TestimonialEcommerce testimonials={_testimonials} />
    </>
  );
}
