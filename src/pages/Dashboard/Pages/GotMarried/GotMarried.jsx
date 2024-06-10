import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./star.css";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../../../utils";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import Aos from "aos";

const GotMarried = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata/${user?.email}`);
      return data;
    },
  });

  const { data: marriage = {}, refetch } = useQuery({
    queryKey: ["marriage", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/marriages/${user?.email}`);
      return data;
    },
  });

  const [rating, setRating] = useState(marriage.rate || null);
  const [hover, setHover] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    // Set the rating from fetched data
    if (marriage.rate) {
      setDateOfBirth(marriage.date);
      setRating(marriage.rate);
    }
  }, [marriage.rate, marriage.date]);

  const handleDateChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const { mutateAsync: mutateMdata } = useMutation({
    mutationFn: async (mdata) => {
      const { data } = await axiosSecure.put("/marriages", mdata);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Success Story Updated Successfully!");
    },
  });

  let pbid;

  if (biodata.sex === "Male") {
    pbid = marriage.fbid;
  } else {
    pbid = marriage.mbid;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rate = rating;
    const form = e.target;
    const pid = form.pid.value;
    const myid = form.myid.value;
    const story = form.story.value;
    const imagesel = form.image.files[0];
    const imageu = marriage.image;
    let mbid;
    let fbid;

    if (biodata.sex === "Male") {
      mbid = parseFloat(myid);
      fbid = parseFloat(pid);
    } else {
      mbid = parseFloat(pid);
      fbid = parseFloat(myid);
    }

    try {
      const imageaa = imagesel ? await imageUpload(imagesel) : imageu;
      const mdata = {
        rate,
        mbid,
        date: dateOfBirth,
        fbid,
        story,
        image: imageaa,
        email: user.email,
      };
      console.table(mdata);

      //   Post request to server

      await mutateMdata(mdata);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-aos="fade-out">
      <Helmet>
        <title>Dashboard | Got Married</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
          backgroundPosition: "50% 25%",
        }}
        className="h-36 "
      >
        <div className="flex justify-center items-center h-full">
          <h2 className="text-whiteM text-3xl font-bold">Got Married</h2>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="flex justify-center items-center min-h-screen"
      >
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  text-whiteM">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="myid" className="block mb-2">
                  My Biodata Id
                </label>
                <input
                  type="text"
                  name="myid"
                  id="myid"
                  defaultValue={biodata.biodataId}
                  readOnly
                  required
                  placeholder="Enter Your Biodata Id"
                  className="w-full px-3 py-2 rounded-md border  text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="pid" className="block mb-2">
                  Partner&#39;s Biodata Id
                </label>
                <input
                  type="number"
                  name="pid"
                  id="pid"
                  defaultValue={pbid}
                  required
                  placeholder="Enter Your Partner's Id"
                  className="w-full px-3 py-2  rounded-md border  text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                  data-temp-mail-org="0"
                />
              </div>
              <div className="">
                <label className="text-whiteM" htmlFor="dob">
                  Date of Marriage:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  defaultValue={marriage.date}
                  onChange={handleDateChange}
                  required
                  className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2">
                  Select Image:
                </label>
                <input type="file" id="image" name="image" accept="image/*" />
              </div>
              <div>
                <label htmlFor="story" className="block mb-2">
                  Success Story
                </label>
                <textarea
                  type="text"
                  name="story"
                  id="story"
                  defaultValue={marriage.story}
                  placeholder="Enter Your Success Story"
                  className="w-full px-3 py-2 border rounded-md  text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                  data-temp-mail-org="0"
                />
              </div>
            </div>
            <div>
              <p className="mb-2">Rating</p>
              {[...Array(5)].map((star, idx) => {
                const currentRating = idx + 1;
                return (
                  <div key={idx} className="inline">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                      />
                      <FaStar
                        color={
                          currentRating <= (hover || rating)
                            ? "#A91D3A"
                            : "#EEEEEE"
                        }
                        className="star inline"
                        size={30}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="group mt-2 relative z-10 px-6 py-3 overflow-hidden bg-reddM text-base text-white"
              >
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                  Submit
                </span>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GotMarried;
