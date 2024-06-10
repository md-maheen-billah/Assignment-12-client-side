import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import Marque from "../../../components/Marque";
import SectionTitle from "../../../components/SectionTitle";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useEffect } from "react";
import Aos from "aos";

const SuccessStory = () => {
  const axiosCommon = useAxiosCommon();
  const { data: gallery = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/marriages`);
      return data;
    },
  });
  console.log(gallery);
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div data-aos="fade-up" className="lg:mb-10">
      <SectionTitle
        subHeading={
          "Discover heartwarming success stories from our members, showcasing real connections and lifelong partnerships forged through our platform."
        }
        heading={"Success Stories"}
      ></SectionTitle>
      <Marque></Marque>
    </div>
  );
};

export default SuccessStory;
