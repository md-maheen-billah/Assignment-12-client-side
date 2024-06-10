import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MemberCard from "./MemberCard";
import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import "../../../assets/styleb.css";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Aos from "aos";

const PremiumMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("");
  const { data: pusers = [], isLoading } = useQuery({
    queryKey: ["pusers", sort],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users-premium?sort=${sort}`);
      return data;
    },
  });
  console.log(pusers);
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div data-aos="fade-up" className="mb-8 lg:mb-20">
      <SectionTitle
        subHeading={
          "Access a curated list of premium profiles tailored to your preferences, ensuring the highest quality connections."
        }
        heading={"Our Premium Members"}
      ></SectionTitle>
      <div className="flex justify-center mb-10">
        <div>
          <select
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
            name="sort"
            id="sort"
            className="border text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
          >
            <option className="text-blackM custom-option" value="">
              Sort By Age
            </option>
            <option className="text-blackM custom-option" value="dsc">
              Descending Order
            </option>
            <option className="text-blackM custom-option" value="asc">
              Ascending Order
            </option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pusers.slice(0, 6).map((member, idx) => (
          <MemberCard member={member} key={idx}></MemberCard>
        ))}
      </div>
    </div>
  );
};

export default PremiumMembers;
