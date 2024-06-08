import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useStatus from "../../../../hooks/useStatus";

const ViewBiodata = () => {
  const [status, refetch] = useStatus();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: biodata = {} } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata/${user?.email}`);
      return data;
    },
  });

  const { mutateAsync: mutatePremium } = useMutation({
    mutationFn: async ({ pdata }) => {
      const { data } = await axiosSecure.patch(
        `/users-premium-request/${user?.email}`,
        pdata
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      if (status === "pending") toast.success("Already Requested!");
      else {
        toast.success("Requested for Premium!");
      }
    },
  });

  const checkBiodataExists = async (email) => {
    const { data } = await axiosSecure.get(`/check-biodata/${email}`);
    return data.exists;
  };

  const handlePremium = async () => {
    const status = "pending";

    try {
      const biodataExists = await checkBiodataExists(user?.email);
      if (!biodataExists) {
        toast.error(
          "Cannot apply for premium without biodata. Please add biodata first."
        );
        return;
      }
      const pdata = {
        status,
      };
      console.table(pdata);

      //   Post request to server
      await mutatePremium({ pdata });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
          backgroundPosition: "50% 25%",
        }}
        className="h-36 "
      >
        <div className="flex justify-center items-center h-full">
          <h2 className="text-whiteM text-3xl font-bold">View Biodata</h2>
        </div>
      </div>
      <div className="mt-6 md:mt-10 mb-10 lg:mb-20 max-w-[1280px] mx-auto px-2 lg:px-10">
        <div className="flex justify-center">
          <div className="">
            <div className="flex justify-center">
              <div className="">
                <img
                  className="lg:w-[315px] lg:h-[315px] w-64 h-64 rounded-md  border-redM border-2"
                  src={biodata.image}
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-center lg:h-[340px] mt-6  border-redM border-2 bg-reddM p-3 rounded-md ">
              <div className="space-y-2">
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM font-medium mb-2 lg:mb-0 lg:w-1/2">
                    Name:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.name}
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium ">
                    Date of Birth:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.dateOfBirth}
                    </span>
                  </p>
                </div>
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM lg:w-1/2 mb-2 lg:mb-0 font-medium">
                    Height:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.height} cm
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium">
                    Weight:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.weight} kg
                    </span>
                  </p>
                </div>
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM lg:w-1/2 mb-2 lg:mb-0 font-medium">
                    Age:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.age} years old
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium">
                    Occupation:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.occupation}
                    </span>
                  </p>
                </div>
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM lg:w-1/2 mb-2 lg:mb-0 font-medium">
                    Father&#39;s Name:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.fname}
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium">
                    Mother&#39;s Name:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.mname}
                    </span>
                  </p>
                </div>
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM lg:w-1/2 mb-2 lg:mb-0 font-medium">
                    Permanent Address:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.permanentDivision}
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium">
                    Present Address:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.presentDivision}
                    </span>
                  </p>
                </div>
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM lg:w-1/2 mb-2 lg:mb-0 font-medium">
                    Race:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.race}
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium">
                    Expected Partner Age:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.expectedPartnerAge} years old
                    </span>
                  </p>
                </div>
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM lg:w-1/2 mb-2 lg:mb-0 font-medium">
                    Expected Partner Height:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.expectedPartnerHeight} cm
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium">
                    Expected Partner Weight:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.expectedPartnerWeight} kg
                    </span>
                  </p>
                </div>
                <div className="lg:flex justify-between w-full lg:w-[600px] mx-auto">
                  <p className="text-blackM lg:w-1/2 mb-2 lg:mb-0 font-medium">
                    Email:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.email}
                    </span>
                  </p>
                  <p className="text-blackM lg:w-1/2 font-medium">
                    Phone:{" "}
                    <span className="text-whiteM font-normal">
                      {biodata.mobile}
                    </span>
                  </p>
                </div>

                <div className="flex justify-center">
                  {status === "premium" ? (
                    <button className="group relative z-10 mt-2 px-6 py-3 overflow-hidden bg-black text-base text-white">
                      <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                      <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                      <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                      <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                        Premium Member
                      </span>
                      Premium Member
                    </button>
                  ) : (
                    <button
                      onClick={handlePremium}
                      className="group relative z-10 mt-2 px-6 py-3 overflow-hidden bg-black text-base text-white"
                    >
                      <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                      <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                      <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                      <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                        Premium Member
                      </span>
                      Premium Member
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodata;
