import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner";

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

  const handleRole = async (id) => {
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

  const handlePremium = async (id) => {
    console.log(id);
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Manage Users</h2>
      <div className="flex items-center justify-center my-6">
        <div className="flex gap-1 items-center">
          <form onSubmit={handleSearch}>
            <div className="flex p-1 gap-2 overflow-hidden rounded-lg relative">
              <input
                className="lg:px-6 pl-2 pr-3 w-28 md:w-auto py-2 text-gray-700 rounded-lg  bg-whiteM outline-none focus:placeholder-transparent"
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                name="search"
                placeholder="Enter Food Name"
                aria-label="Enter Food Name"
              />
              <button className="font-bold animate__animated animate__pulse animate__infinite rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000">
                <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                Search
              </button>
            </div>
          </form>

          <button
            onClick={handleReset}
            className="font-bold rounded-md px-4 py-2 bg-goldenM text-greenM relative overflow-hidden group z-10 hover:text-greenM duration-1000"
          >
            <span className="absolute bg-whiteM  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-lgreenM size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Reset
          </button>
        </div>
      </div>
      {users.map((item) => (
        <div key={item._id}>
          <p>Username: {item.name}</p>
          <p>Email: {item.email}</p>
          {item.role === "admin" ? (
            <p>N/A</p>
          ) : item.status === "premium" ? (
            <p>premium member</p>
          ) : (
            <button
              onClick={() => handlePremium(item._id)}
              className="px-4 py-2 bg-slate-700 text-white"
            >
              Make Premium
            </button>
          )}
          {item.role === "admin" ? (
            <p>Admin</p>
          ) : (
            <button
              onClick={() => handleRole(item._id)}
              className="px-4 py-2 bg-slate-700 text-white"
            >
              Make Admin
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
