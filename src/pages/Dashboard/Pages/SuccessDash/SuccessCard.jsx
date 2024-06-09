import { useState } from "react";
import { FaStar } from "react-icons/fa6";

const SuccessCard = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => {
    // Check if user is logged in

    setOpenModal(true);
  };
  return (
    <tr>
      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        {item.mbid}
      </td>
      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        {item.fbid}
      </td>

      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        <button
          onClick={handleModalOpen}
          className="group relative z-10 px-6 py-2 overflow-hidden bg-black text-base text-white"
        >
          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-reddM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-reddM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
          <span className="absolute z-10 text-center text-whiteM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
            View Story
          </span>
          View Story
        </button>
      </td>
      <div
        className={`fixed z-[100] flex pt-4  lg:pt-24 items-start justify-center ${
          openModal ? "opacity-1 visible" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          className={`absolute max-w-md rounded-lg p-3 pb-5 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
            openModal
              ? "scale-1 opacity-1 duration-300"
              : "scale-0 opacity-0 duration-150"
          } `}
        >
          <div method="dialog">
            <div className="relative w-72 h-72 group">
              <img
                className="object-cover w-full h-72 rounded-lg"
                src={item.image}
                alt=""
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex justify-center items-center">
                <div>
                  <p className="text-whiteM text-center px-4 overflow-hidden line-clamp-7">
                    {item.story}
                  </p>
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((star, idx) => {
                      const currentRating = idx + 1;
                      return (
                        <div key={idx} className="inline">
                          <label>
                            <input
                              type="radio"
                              name="rating"
                              value={item.rate}
                            />
                            <FaStar
                              color={
                                currentRating <= item.rate
                                  ? "#C73659"
                                  : "#EEEEEE"
                              }
                              className="star inline"
                              size={30}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-white text-right px-4 mt-4">
                    Marriage- {item.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <svg
            onClick={() => setOpenModal(false)}
            className="mx-auto  w-6 mt-2 cursor-pointer bg-redM rounded-md fill-blackM dark:fill-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
            </g>
          </svg>
        </div>
      </div>
    </tr>
  );
};

export default SuccessCard;
