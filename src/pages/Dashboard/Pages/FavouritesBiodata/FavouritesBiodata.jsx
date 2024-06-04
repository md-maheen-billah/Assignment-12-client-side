import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const FavouritesBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: favorites = [], refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/favorites/${user?.email}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/favorites/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Deleted!");
    },
  });

  const handleDelete = async (id) => {
    try {
      await mutateAsync({ id });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  console.log(favorites);
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.map((item) => (
        <div key={item._id}>
          <p>{item.name}</p>
          <p>{item.biodataId}</p>
          <p>{item.permanentDivision}</p>
          <p>{item.occupation}</p>
          <button
            onClick={() => handleDelete(item._id)}
            className="px-4 py-2 bg-slate-700 text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavouritesBiodata;
