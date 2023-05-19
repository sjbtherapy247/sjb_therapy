import _mock from '../_mock';

// ----------------------------------------------------------------------

const TITLE = [
  'The Science Behind Hypnotherapy: Understanding the Mind-Body Connection',
  'Breaking Free from Bad Habits: Hypnotherapy for Behavioral Change',
  'Healing from Within: Hypnotherapy for Emotional Well-being',
  'Enhancing Performance and Focus with Hypnotherapy Techniques',
  'Unlocking Creativity: Harnessing Hypnotherapy for Artistic Inspiration',
  'Managing Chronic Pain: The Role of Hypnotherapy in Pain Management',
  'Transforming Sleep Patterns: How Hypnotherapy Promotes Restful Nights',
  'Building Confidence and Self-Esteem through Hypnotherapy',
  'Hypnotherapy for Weight Loss: Rewiring Your Relationship with Food',
  'Overcoming Phobias: Confronting Fears with Hypnotherapy',
  'Healing Trauma: Utilizing Hypnotherapy in Trauma Recovery',
  'Exploring Past Lives: Hypnotherapy and Regression Therapy',
  'The Synergy of Hypnotherapy and Psychotherapy: A Powerful Healing Combination',
  'Unlocking Inner Potential: Exploring the Intersection of Hypnotherapy and Psychotherapy',
  'Harnessing the Mind-Body Connection: Integrating Hypnotherapy and Psychotherapy',
  'Exploring the Role of Hypnotherapy in Psychotherapy: Enhancing Treatment Outcomes',
  'Beyond Talk Therapy: The Transformative Power of Hypnotherapy and Psychotherapy',
  'Navigating Trauma: A Comprehensive Approach with Hypnotherapy and Psychotherapy',
  'Creating Lasting Change: Hypnotherapy and Psychotherapy Strategies for Personal Growth',
  'Healing from Within: Integrative Hypnotherapy and Psychotherapy Techniques',
];

const content = (name) => `
<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc.</p>

<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh. Donec posuere vulputate arcu. Quisque rutrum.</p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh.</p>

<p><img alt="alt marketing" src="/assets/images/${name}/${name}_post_01.jpg" /></p>

<h4>Curabitur suscipit suscipit tellus</h4>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<h4>Nullam accumsan lorem in</h4>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo.</p>

<p><img alt="alt marketing" src="/assets/images/${name}/${name}_post_02.jpg" /></p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh.</p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

`;

const base = (index) => ({
  id: _mock.id(index),
  title: TITLE[index],
  description: _mock.text.description(index),
  category: 'Marketing',
  favorited: _mock.boolean(index),
  createdAt: _mock.time(index),
  duration: '3 minutes read',
  tags: [
    { label: 'Marketing', path: '' },
    { label: 'Development', path: '' },
    { label: 'HR & Recruiting', path: '' },
    { label: 'Design', path: '' },
    { label: 'Management', path: '' },
  ],
  author: {
    name: _mock.name.fullName(index),
    role: _mock.role(index),
    picture: _mock.image.avatar(index),
    quotes: 'Member since Mar 15, 2022',
    about:
      'Integer tincidunt. Nullam dictum felis eu pede mollis pretium. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.',
  },
});

// ----------------------------------------------------------------------

export const _blogMarketingPosts = [...Array(12)].map((_, index) => ({
  ...base(index),
  content: content('marketing'),
  coverImg: _mock.image.marketing(index),
  heroImg: `/assets/images/marketing/marketing_post_hero.jpg`,
}));

export const _blogTravelPosts = [...Array(12)].map((_, index) => ({
  ...base(index),
  content: content('travel'),
  coverImg: _mock.image.travel(index),
  heroImg: `/assets/images/travel/travel_post_hero.jpg`,
}));

export const _blogCareerPosts = [...Array(12)].map((_, index) => ({
  ...base(index),
  content: content('career'),
  coverImg: _mock.image.career(index),
  heroImg: `/assets/images/career/career_post_hero.jpg`,
}));

export const _blogCoursePosts = [...Array(12)].map((_, index) => ({
  ...base(index),
  content: content('course'),
  coverImg: _mock.image.course(index),
  heroImg: `/assets/images/course/course_post_hero.jpg`,
}));
