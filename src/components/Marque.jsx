import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import useAxiosCommon from "../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";

const Marque = () => {
  const axiosCommon = useAxiosCommon();
  const { data: gallery = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/marriages`);
      return data;
    },
  });
  console.log(gallery);
  return (
    <div className="mt-4 lg:mt-10">
      <Marquee>
        <div className="flex evenly">
          {gallery.map((post, idx) => (
            <div key={idx} className="mr-24 text-[#1e1b4b]" to="/">
              <div className="relative w-72 h-72 group">
                <img
                  className="object-cover w-full h-72 rounded-lg"
                  src={post.image}
                  alt=""
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                  <div>
                    <p className="text-whiteM text-center px-4 overflow-hidden line-clamp-7">
                      {post.story}
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
                                value={post.rate}
                              />
                              <FaStar
                                color={
                                  currentRating <= post.rate
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
                      Marriage- {post.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Marque;
