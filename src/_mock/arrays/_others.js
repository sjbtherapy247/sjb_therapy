import _mock from '../_mock';

// ----------------------------------------------------------------------

export const _categories = [
  { label: 'Hypnotherapy', path: '' },
  { label: 'Addictions', path: '' },
  { label: 'Psycotherapy', path: '' },
  { label: 'Wellness', path: '' },
  { label: 'Anxiety', path: '' },
];

// ----------------------------------------------------------------------

export const _tags = [
  { label: 'Self Improvement', path: '' },
  { label: 'Phobias', path: '' },
  { label: 'Behaviourial Change', path: '' },
  { label: 'Weight Management', path: '' },
  { label: 'Stress', path: '' },
  { label: 'Mental Health', path: '' },
  { label: 'Personal Transformation', path: '' },
  { label: 'Hypnosis', path: '' },
  { label: 'Healing', path: '' },
];

// ----------------------------------------------------------------------

export const _testimonials = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
  avatar: _mock.image.avatar(index),
  postDate: _mock.time(index),
  rating: 5,
  review: 'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
}));

// ----------------------------------------------------------------------

export const _socials = [
  {
    value: 'facebook',
    label: 'FaceBook',
    icon: 'carbon:logo-facebook',
    color: '#1877F2',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: 'carbon:logo-instagram',
    color: '#E02D69',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    icon: 'carbon:logo-linkedin',
    color: '#007EBB',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    icon: 'carbon:logo-twitter',
    color: '#00AAEC',
  },
];

export const _socialsSimo = [
  {
    value: 'facebook',
    label: 'FaceBook',
    icon: 'carbon:logo-facebook',
    color: '#1877F2',
    href: 'https://www.facebook.com/simplyjustbelieve',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: 'carbon:logo-instagram',
    color: '#E02D69',
    href: 'https://www.instagram.com/simplyjustbelieve/',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    icon: 'carbon:logo-linkedin',
    color: '#007EBB',
    href: 'https://www.linkedin.com/in/simon-baker-84694719/',
  },
  // {
  //   value: 'twitter',
  //   label: 'Twitter',
  //   icon: 'carbon:logo-twitter',
  //   color: '#00AAEC',
  // },
];

// ----------------------------------------------------------------------

const LAT_LONG = [
  [33, 65],
  [-12.5, 18.5],
  [20.96, 26.27],
];

export const _offices = ['Jordan', 'Canada', 'Portugal'].map((office, index) => ({
  id: _mock.id(index),
  country: office,
  address: _mock.address.fullAddress(index),
  phoneNumber: _mock.phoneNumber(index),
  email: _mock.email(index),
  photo: _mock.image.travel(index + 4),
  latlng: LAT_LONG[index],
}));

// ----------------------------------------------------------------------

const BRANDS_NAME = ['airbnb', 'dropbox', 'facebook', 'google', 'heroku', 'lenovo', 'microsoft', 'netflix', 'slack', 'spotify', 'tripadvisor', 'vimeo'];

export const _brands = BRANDS_NAME.map((brand, index) => ({
  id: _mock.id(index),
  name: brand,
  image: `/assets/logo/${brand}.svg`,
}));

export const _brandsColor = BRANDS_NAME.map((brand, index) => ({
  id: _mock.id(index),
  name: brand,
  image: `/assets/logo/${brand}_original.svg`,
}));

// ----------------------------------------------------------------------

export const _faqs = ['Sed augue ipsum, egestas nec, vestibulum et', 'alesuada adipiscing, dui vestibulum suscipit nulla quis orci.', 'Ut varius tincidunt libero', 'In ut quam vitae odio lacinia tincidunt.', 'Fusce vel dui Morbi nec metus.'].map(
  (question, index) => ({
    id: _mock.id(index),
    question,
    answer: 'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
  })
);

export const _faqsSupport = [
  `[Covid] Seasonal Shopping Guide`,
  'I Want To Check Where My Order Is Delivered',
  '[Shipping Information] How To Contact The Shipping Unit/Look Up Shipping Information/Delivery Exchange?',
  '[Seller] Start Selling With Shopee',
  'Why Is My Account Locked/Limited?',
  'Free Shipping Code User Guide (Freeship Code)',
  'How To Buy / Order On Shopee App',
  `Why I Didn't Receive the Verification Code (OTP)?`,
  `Frequently Asked Questions About Product Reviews / Comments`,
  `How to Login Shopee Account When Forgot/Lost Password`,
].map((question, index) => ({
  id: _mock.id(index),
  question,
  answer: 'Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I appreciate there attitude and approach.',
}));
