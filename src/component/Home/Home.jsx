import ControlledCarousel from "./Component/ControlledCarousel";
import HighestRatedGameSection from "./Component/HighestRatedGameSection";
import MostPlayedGameSection from "./Component/MostPlayedGameSection";
import NewReleasesSection from "./Component/NewReleasesSection";
import UpcomingGamesSection from "./Component/UpcomingGamesSection";
import BlogSection from "./Component/BlogSection";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <div className="w-11/12 mx-auto md:my-18 my-40">
        <ControlledCarousel />
      </div>
      <div>
        {/* Additional home page content can go here */}
        <HighestRatedGameSection data={data} />
      </div>
      <div>
        <MostPlayedGameSection />
        {/* Additional home page content can go here */}
      </div>
      <div>
        <NewReleasesSection />
        {/* Additional home page content can go here */}
      </div>
      <div>
        <UpcomingGamesSection />
      </div>
      <div>
        <BlogSection />
      </div>
    </>
  );
};

export default Home;
