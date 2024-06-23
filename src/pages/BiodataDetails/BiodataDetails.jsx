import { Link, useParams } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import useStatus from "../../hooks/useStatus";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa6";
import "react-tooltip/dist/react-tooltip.css";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";

const BiodataDetails = () => {
  const { user } = useAuth();
  const [status] = useStatus();
  const [role] = useRole();
  console.log(status);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata-details/${id}`);
      return data;
    },
  });
  console.log(biodata);

  const { data: marriage = {} } = useQuery({
    queryKey: ["marriage", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/marriage-done/${id}`);
      return data;
    },
  });
  console.log(marriage);

  const { data: access = {} } = useQuery({
    queryKey: ["access", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata-access-own/${user?.email}`);
      return data;
    },
  });

  console.log(access);

  const { data: request = {} } = useQuery({
    queryKey: ["request", id, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/requested-access/${id}/${user?.email}`
      );
      return data;
    },
  });
  console.log(request);

  const { data: biodatap = {} } = useQuery({
    queryKey: ["biodatap", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata-details-premium/${id}`);
      return data;
    },
    enabled:
      status === "premium" ||
      access?.biodataId === parseFloat(id) ||
      role === "admin" ||
      request?.status === "approved", // Query will only run if status is "premium"
  });
  console.log(biodatap);

  const { mutateAsync } = useMutation({
    mutationFn: async (fdata) => {
      const { data } = await axiosSecure.post("/favorites", fdata);
      return data;
    },
    onSuccess: () => {
      toast.success("Added to Favorites!");
    },
  });

  const handleAddFavorite = async () => {
    const fdata = {
      name: biodata.name,
      biodataId: biodata.biodataId,
      permanentDivision: biodata.permanentDivision,
      occupation: biodata.occupation,
      favorite_email: user?.email,
    };
    try {
      //   Post request to server
      await mutateAsync(fdata);
    } catch (err) {
      console.log(err);
      toast.error("Already Added to Favorites");
    }
  };
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div data-aos="fade-out">
      <Helmet>
        <title>Biodata Profile</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
          backgroundPosition: "50% 25%",
        }}
        className="h-36 "
      >
        <div className="flex justify-center items-center h-full">
          <h2 className="text-whiteM text-3xl font-bold">Biodata Profile</h2>
        </div>
      </div>
      <div data-aos="fade-up" className="max-w-[1280px] mx-auto my-10 lg:my-20">
        <div className="flex justify-center">
          <div className="lg:flex items-center lg:gap-10">
            <div className="flex justify-center">
              <div className="relative">
                <Tooltip id="my-tooltip" />

                <button
                  className="absolute hover:scale-110 cursor-pointer right-2 top-2"
                  onClick={handleAddFavorite}
                >
                  <FaHeart
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Add to Favorite!"
                    className=" text-2xl text-red-500"
                  />
                </button>

                <div className="relative">
                  <img
                    className="lg:w-[235px] mb-8 lg:h-[235px] w-64 h-64 rounded-full   border-redM border-2"
                    src={biodata.image}
                    alt=""
                  />
                  {marriage === "Married" && (
                    <div className="">
                      <p className="absolute text-6xl font-bold italic text-redM top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        Married
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`flex justify-center ${
                biodatap?.email ? "lg:h-[280px]" : "lg:h-[245px]"
              } mt-0 lg:mt-0  px-2`}
            >
              <div className="space-y-2">
                <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                  <p className="text-redM font-medium mb-2 md:mb-0 md:w-1/2">
                    Name:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.name}
                    </span>
                  </p>
                  <p className="text-redM md:w-1/2 font-medium ">
                    Date of Birth:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.dateOfBirth}
                    </span>
                  </p>
                </div>
                <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                  <p className="text-redM md:w-1/2 mb-2 md:mb-0 font-medium">
                    Height:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.height} cm
                    </span>
                  </p>
                  <p className="text-redM md:w-1/2 font-medium">
                    Weight:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.weight} kg
                    </span>
                  </p>
                </div>
                <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                  <p className="text-redM md:w-1/2 mb-2 md:mb-0 font-medium">
                    Age:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.age} years old
                    </span>
                  </p>
                  <p className="text-redM md:w-1/2 font-medium">
                    Occupation:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.occupation}
                    </span>
                  </p>
                </div>
                <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                  <p className="text-redM md:w-1/2 mb-2 md:mb-0 font-medium">
                    Father&#39;s Name:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.fname}
                    </span>
                  </p>
                  <p className="text-redM md:w-1/2 font-medium">
                    Mother&#39;s Name:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.mname}
                    </span>
                  </p>
                </div>
                <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                  <p className="text-redM md:w-1/2 mb-2 md:mb-0 font-medium">
                    Permanent Address:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.permanentDivision}
                    </span>
                  </p>
                  <p className="text-redM md:w-1/2 font-medium">
                    Present Address:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.presentDivision}
                    </span>
                  </p>
                </div>
                <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                  <p className="text-redM md:w-1/2 mb-2 md:mb-0 font-medium">
                    Race:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.race}
                    </span>
                  </p>
                  <p className="text-redM md:w-1/2 font-medium">
                    Expected Partner Age:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.expectedPartnerAge} years old
                    </span>
                  </p>
                </div>
                <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                  <p className="text-redM md:w-1/2 mb-2 md:mb-0 font-medium">
                    Expected Partner Height:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.expectedPartnerHeight} cm
                    </span>
                  </p>
                  <p className="text-redM md:w-1/2 font-medium">
                    Expected Partner Weight:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.expectedPartnerWeight} kg
                    </span>
                  </p>
                </div>
                {status === "premium" ||
                access.biodataId === parseFloat(id) ||
                role === "admin" ||
                request?.status === "approved" ? (
                  <>
                    <div className="md:flex justify-between w-full md:w-[600px] mx-auto">
                      <p className="text-redM w-1/2 mb-2 md:mb-0 font-medium">
                        Email:{" "}
                        <span className="text-whiteM font-normal">
                          {biodatap?.email}
                        </span>
                      </p>
                      <p className="text-redM w-1/2 font-medium">
                        Phone:{" "}
                        <span className="text-whiteM font-normal">
                          {biodatap?.mobile}
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {request?.status === "pending" ? (
                      <div className="flex justify-center">
                        <button className="group disabled hover:cursor-not-allowed relative z-10 mt-2 px-6 py-3 overflow-hidden bg-black text-base text-white">
                          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                          <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                            Please Wait for Admin Approval
                          </span>
                          Please Wait for Admin Approval
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <Link to={`/payment/${biodata.biodataId}`}>
                          <button className="group relative z-10 mt-2 px-6 py-3 overflow-hidden bg-black text-base text-white">
                            <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                            <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                            <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                            <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                              Show Contact Info
                            </span>
                            Show Contact Info
                          </button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
