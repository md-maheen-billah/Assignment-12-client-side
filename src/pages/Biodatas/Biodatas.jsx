import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterByDivision from "./FilterByDivision";
import FilterBySex from "./FilterBySex";
import FilterByMin from "./FilterByMin";
import FIlterByMax from "./FIlterByMax";
import BiodataCard from "./BiodataCard";

const Biodatas = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sfilter, setSFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [dfilter, setDFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [minValue, setMinValue] = useState(17);
  const [maxValue, setMaxValue] = useState(71);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/biodata-public?page=${currentPage}&size=${itemsPerPage}&sfilter=${sfilter}&dfilter=${dfilter}&minValue=${minValue}&maxValue=${maxValue}`
      );
      setJobs(data);
      setLoading(false);
    };
    getData();
  }, [currentPage, itemsPerPage, sfilter, dfilter, minValue, maxValue]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/biodata-public-count?sfilter=${sfilter}&dfilter=${dfilter}&minValue=${minValue}&maxValue=${maxValue}`
      );

      setCount(data.count);
      setLoading(false);
    };
    getCount();
  }, [sfilter, dfilter, minValue, maxValue]);

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

  return (
    <div>
      {(loading && <LoadingSpinner />) || (
        <div className="max-w-[1280px] mx-auto">
          <div className="md:flex md:justify-evenly gap-10 mt-10">
            <div>
              <h2 className="text-xl mb-4 text-center text-whiteM">
                Filter Options
              </h2>
              <div className="space-y-2 mb-10">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
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
      )}
    </div>
  );
};

export default Biodatas;
