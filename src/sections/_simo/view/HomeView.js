import {
  HomeHero,
  HomeFAQs,
  HomeGuidedMeditation,
  HomeFamous,
  HomeBanner,
} from 'src/sections/_simo/home';
import { LatestPosts } from '../insights';

export default function HomeView({ insights }) {
  return (
    <>
      <HomeHero />
      <HomeGuidedMeditation />
      <HomeBanner />
      <HomeFamous />
      <HomeFAQs />
      <LatestPosts posts={insights} />
    </>
  );
}