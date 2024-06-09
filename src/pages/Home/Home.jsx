import Banner from "./Banner/Banner";
import PremiumMembers from "./PremiumMembers/PremiumMembers";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import SuccessStory from "./SuccessStory/SuccessStory";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-[1280px] mx-auto">
        <PremiumMembers></PremiumMembers>
        <SuccessCounter></SuccessCounter>
        <SuccessStory></SuccessStory>
      </div>
    </div>
  );
};

export default Home;
