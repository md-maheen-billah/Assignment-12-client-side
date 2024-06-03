import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
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
  return (
    <div>
      <h2>Manage Users</h2>
      {users.map((item) => (
        <div key={item._id}>
          <p>Username: {item.name}</p>
          <p>Requested Id: {item.email}</p>
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
