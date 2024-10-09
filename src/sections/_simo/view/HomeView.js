// mock
// import { _associations } from 'src/_mock';
// 
import { HomeHero, 
         HomeFAQs, 
         HomeGuidedMeditation, 
         HomeFamous, 
         HomeBanner, 
         
         } from 'src/sections/_simo/home';
import { LatestPosts } from '../insights';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function HomeView({ insights }) {
  return (
    <>
      <HomeHero />
      <HomeGuidedMeditation />
      <HomeBanner />
      <HomeFamous />
      <HomeFAQs />

      <LatestPosts posts={insights} />
      {/* <LatestPosts posts={insights.slice(0, 4)} /> */}
      {/* <TestFooter /> */}
    </>
  );
}
