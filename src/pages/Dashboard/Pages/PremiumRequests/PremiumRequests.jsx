import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";

const PremiumRequests = () => {
  const axiosSecure = useAxiosSecure();
  const status = "pending";
  const {
    data: rusers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["rusers"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users-status-pending/${status}`);
      return data;
    },
  });
  console.log(rusers);
  const { mutateAsync: mutatePremium } = useMutation({
    mutationFn: async ({ pdata, id }) => {
      const { data } = await axiosSecure.patch(
        `/users-premium-change/${id}`,
        pdata
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Changed to Premium!");
    },
  });

  const premiumConfirmed = async (item) => {
    console.log(item._id);
    const id = item._id;
    const status = "premium";

    try {
      const pdata = {
        status,
      };
      console.table(pdata);

      //   Post request to server
      await mutatePremium({ id, pdata });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handlePremium = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make premium!",
    }).then((result) => {
      if (result.isConfirmed) {
        premiumConfirmed(item);
        Swal.fire({
          title: "Made Premium!",
          text: "Your entry has been updated.",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div data-aos="fade-out">
      <Helmet>
        <title>Dashboard | Premium Requests</title>
      </Helmet>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
            backgroundPosition: "50% 25%",
          }}
          className="h-36 "
        >
          <div className="flex justify-center items-center h-full">
            <h2 className="text-whiteM text-3xl font-bold">Premium Requests</h2>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className=" mt-6 mb-10 lg:mb-20 max-w-[1280px] mx-auto px-2 lg:px-10"
      >
        <div className="container px-4 mx-auto pt-1">
          <div className="flex flex-col mt-6 mb-10 lg:mb-20">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-blackM  md:rounded-lg">
                  <table className="min-w-full divide-y divide-blackM">
                    <thead className="bg-reddM">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" text-center gap-x-3">
                            <span className="text-center">Name</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" w-20 mx-auto">
                            <span className="text-center w-20">Email</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" w-20 mx-auto">
                            <span className="text-center">Biodata Id</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" text-center gap-x-3">
                            <span className="text-center">Status</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-redM divide-y divide-blackM ">
                      {rusers.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.email}
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.biodataId}
                          </td>

                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.role === "admin" ? (
                              <p>N/A</p>
                            ) : item.status === "premium" ? (
                              <p>premium member</p>
                            ) : (
                              <button
                                onClick={() => handlePremium(item)}
                                className="group relative z-10 px-6 py-2 overflow-hidden bg-black text-base text-white"
                              >
                                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-reddM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-reddM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                                <span className="absolute z-10 text-center text-whiteM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                                  Make Premium
                                </span>
                                Make Premium
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {rusers.length < 1 && (
        <div className="lg:mt-24 lg:mb-28 mt-8 mb-8">
          <h1 className="text-4xl dark:text-[#f9a06f] text-redM text-center">
            No Premium Requests Found!
          </h1>
        </div>
      )}
    </div>
  );
};

export default PremiumRequests;
