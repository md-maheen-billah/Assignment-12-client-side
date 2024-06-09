import { BiFemale, BiMale } from "react-icons/bi";
import { FaPeopleGroup, FaPeoplePulling } from "react-icons/fa6";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";

const SuccessCounter = () => {
  const axiosCommon = useAxiosCommon();

  const { data: count = {} } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/count-public`);
      return data;
    },
  });
  return (
    <div>
      <SectionTitle
        subHeading={
          "Discover the impact of our matrimonial services with our success counter. Join us in creating more beautiful stories!"
        }
        heading={"Success Counter"}
      ></SectionTitle>
      <section className="p-6 my-6">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
              <FaPeopleGroup className="text-5xl" />
            </div>
            <div className="flex flex-col justify-center align-middle text-whiteM">
              <p className="text-3xl font-semibold leading-none">
                {count.totalBiodataCount}
              </p>
              <p className="capitalize">Total Biodatas</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
              <BiFemale className="text-5xl" />
            </div>
            <div className="flex flex-col justify-center align-middle text-whiteM">
              <p className="text-3xl font-semibold leading-none">
                {count.femaleBiodataCount}
              </p>
              <p className="capitalize">Female Biodatas</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
              <BiMale className="text-5xl" />
            </div>
            <div className="flex flex-col justify-center align-middle text-whiteM">
              <p className="text-3xl font-semibold leading-none">
                {count.maleBiodataCount}
              </p>
              <p className="capitalize">Male Biodatas</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
              <FaPeoplePulling className="text-5xl" />
            </div>
            <div className="flex flex-col justify-center align-middle text-whiteM">
              <p className="text-3xl font-semibold leading-none">
                {count.marriageCount}
              </p>
              <p className="capitalize">Marriages </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessCounter;
