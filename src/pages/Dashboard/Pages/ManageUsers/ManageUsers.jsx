import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
  };

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users?search=${search}`);
      return data;
    },
  });
  console.log(users);

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

  const { mutateAsync: mutateRole } = useMutation({
    mutationFn: async ({ rdata, id }) => {
      const { data } = await axiosSecure.patch(
        `/users-role-change/${id}`,
        rdata
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Promoted to Admin!");
    },
  });

  const roleConfirmed = async (id) => {
    console.log(id);
    const role = "admin";

    try {
      const rdata = {
        role,
      };
      console.table(rdata);

      //   Post request to server
      await mutateRole({ id, rdata });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

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

  const handleRole = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        roleConfirmed(id);
        Swal.fire({
          title: "Made Admin!",
          text: "Your entry has been updated.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
            backgroundPosition: "50% 25%",
          }}
          className="h-36 "
        >
          <div className="flex justify-center items-center h-full">
            <h2 className="text-whiteM text-3xl font-bold">Manage Users</h2>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className=" mt-6 mb-10 lg:mb-20 max-w-[1280px] mx-auto px-2 lg:px-10"
      >
        <div className="flex items-center justify-center my-6">
          <div className="flex gap-1 items-center">
            <form onSubmit={handleSearch}>
              <div className="flex p-1 gap-2 overflow-hidden rounded-lg relative">
                <input
                  className="lg:px-6 pl-2 pr-3 w-28 md:w-auto py-2 text-whiteM  focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddMxt-white  focus:shadow-outline bg-reddM"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  name="search"
                  placeholder="Enter User Name"
                  aria-label="Enter User Name"
                />
                <button className="group relative z-10 px-6 py-2 overflow-hidden bg-reddM text-base text-white">
                  <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                  <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                  <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                  <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                    Search
                  </span>
                  Search
                </button>
              </div>
            </form>

            <button
              onClick={handleReset}
              className="group relative z-10 px-6 py-2 overflow-hidden bg-reddM text-base text-white"
            >
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                Reset
              </span>
              Reset
            </button>
          </div>
        </div>
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
                          <div className=" text-center gap-x-3">
                            <span className="text-center">Premium Status</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" text-center gap-x-3">
                            <span className="text-center">Admin Status</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-redM divide-y divide-blackM ">
                      {users.map((item) => (
                        <tr key={item._id}>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.email}
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
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.role === "admin" ? (
                              <p>Admin</p>
                            ) : (
                              <button
                                onClick={() => handleRole(item._id)}
                                className="group relative z-10 px-6 py-2 overflow-hidden bg-black text-base text-white"
                              >
                                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-reddM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                                <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-reddM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                                <span className="absolute z-10 text-center text-whiteM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                                  Make Admin
                                </span>
                                Make Admin
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
    </div>
  );
};

export default ManageUsers;
