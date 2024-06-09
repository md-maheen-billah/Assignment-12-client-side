import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterByDivision from "./FilterByDivision";
import FilterBySex from "./FilterBySex";
import FilterByMin from "./FilterByMin";
import FIlterByMax from "./FIlterByMax";
import BiodataCard from "./BiodataCard";
import { useQuery } from "@tanstack/react-query";

const Biodatas = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sfilter, setSFilter] = useState("");
  const [dfilter, setDFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [minValue, setMinValue] = useState(17);
  const [maxValue, setMaxValue] = useState(71);

  const fetchBiodatas = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/biodata-public?page=${currentPage}&size=${itemsPerPage}&sfilter=${sfilter}&dfilter=${dfilter}&minValue=${minValue}&maxValue=${maxValue}`
    );
    return data;
  };

  const fetchCount = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/biodata-public-count?sfilter=${sfilter}&dfilter=${dfilter}&minValue=${minValue}&maxValue=${maxValue}`
    );
    return data.count;
  };

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: [
      "jobs",
      currentPage,
      itemsPerPage,
      sfilter,
      dfilter,
      minValue,
      maxValue,
    ],
    queryFn: fetchBiodatas,
  });

  const { data: count = 0, isLoading: countLoading } = useQuery({
    queryKey: ["count", sfilter, dfilter, minValue, maxValue],
    queryFn: fetchCount,
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };

  const handleMinChange = (e) => {
    setMinValue(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleMaxChange = (e) => {
    setMaxValue(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const numberOptions = Array.from({ length: 53 }, (_, i) => i + 18);

  if (jobsLoading || countLoading) return <LoadingSpinner />;
  return (
    <div>
      {((jobsLoading || countLoading) && <LoadingSpinner />) || (
        <div>
          <div
            style={{
              backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
              backgroundPosition: "50% 25%",
            }}
            className="h-36 "
          >
            <div className="flex justify-center items-center h-full">
              <h2 className="text-whiteM text-3xl font-bold">Biodatas</h2>
            </div>
          </div>
          <div className="max-w-[1280px] mx-auto">
            <div className="md:flex md:justify-evenly px-4 gap-10 mt-4 md:mt-10">
              <div>
                <h2 className="text-xl mb-4 text-center text-whiteM">
                  Filter Options
                </h2>
                <div className="space-y-2 mb-10 max-w-[285px] mx-auto">
                  <FilterByDivision
                    dfilter={dfilter}
                    setCurrentPage={setCurrentPage}
                    setDFilter={setDFilter}
                  ></FilterByDivision>
                  <FilterBySex
                    setCurrentPage={setCurrentPage}
                    setSFilter={setSFilter}
                    sfilter={sfilter}
                  ></FilterBySex>
                  <FilterByMin
                    handleMinChange={handleMinChange}
                    numberOptions={numberOptions}
                    minValue={minValue}
                  ></FilterByMin>
                  <FIlterByMax
                    handleMaxChange={handleMaxChange}
                    numberOptions={numberOptions}
                    maxValue={maxValue}
                  ></FIlterByMax>
                </div>
              </div>
              <div>
                {jobs.length < 1 && (
                  <div className="lg:mt-24 lg:mb-28 mt-8 mb-8 ">
                    <div className="flex justify-center">
                      <h1 className="text-4xl dark:text-[#f9a06f]  text-redM text-center">
                        No Favorites Found!
                      </h1>
                    </div>
                  </div>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {jobs.map((member, idx) => (
                    <BiodataCard member={member} key={idx}></BiodataCard>
                  ))}
                </div>
                <div className="flex justify-center">
                  <div className="flex justify-center my-12 ">
                    {/* Previous Button */}
                    <button
                      disabled={currentPage === 1}
                      onClick={() => handlePaginationButton(currentPage - 1)}
                      className="px-4 py-2 mx-1 text-whiteM disabled:text-gray-500 capitalize bg-reddM rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-redM hover:text-blackM"
                    >
                      <div className="flex items-center -mx-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 mx-1 rtl:-scale-x-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                          />
                        </svg>

                        <span className="mx-1">previous</span>
                      </div>
                    </button>
                    {/* Numbers */}
                    {pages.map((btnNum) => (
                      <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${
                          currentPage === btnNum ? "bg-reddM text-white" : ""
                        } px-4 py-2 mx-1 text-whiteM transition-colors duration-300 transform  rounded-md sm:inline hover:bg-redM  hover:text-white`}
                      >
                        {btnNum}
                      </button>
                    ))}
                    {/* Next Button */}
                    <button
                      disabled={currentPage === numberOfPages}
                      onClick={() => handlePaginationButton(currentPage + 1)}
                      className="px-4 py-2 mx-1 text-whiteM disabled:text-gray-500 capitalize bg-reddM rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-redM hover:text-blackM"
                    >
                      <div className="flex items-center -mx-1">
                        <span className="mx-1">Next</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 mx-1 rtl:-scale-x-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Biodatas;
