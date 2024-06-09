import Banner from "./Banner/Banner";
import PremiumMembers from "./PremiumMembers/PremiumMembers";
import SuccessStory from "./SuccessStory/SuccessStory";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-[1280px] mx-auto">
        <PremiumMembers></PremiumMembers>
        <SuccessStory></SuccessStory>
      </div>
    </div>
  );
};

export default Home;
