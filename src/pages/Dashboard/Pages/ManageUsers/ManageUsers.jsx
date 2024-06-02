import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

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
            <button className="px-4 py-2 bg-slate-700 text-white">
              Make Premium
            </button>
          )}
          {item.role === "admin" ? (
            <p>Admin</p>
          ) : (
            <button className="px-4 py-2 bg-slate-700 text-white">
              Make Admin
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
