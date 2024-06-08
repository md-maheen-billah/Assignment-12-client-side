import Banner from "./Banner/Banner";
import PremiumMembers from "./PremiumMembers/PremiumMembers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-[1280px] mx-auto">
        <PremiumMembers></PremiumMembers>
      </div>
    </div>
  );
};

export default Home;
