import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const RequestContactInfo = ({ item, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { data: biodatap = {}, isLoading } = useQuery({
    queryKey: ["biodatap", item.biodataId],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/biodata-details-premium/${item.biodataId}`
      );
      return data;
    },
    enabled: item?.status === "approved", // Query will only run if status is "premium"
  });
  console.log(biodatap);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(
        `/requested-access-dashboard/${id}`
      );
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
  return (
    <div>
      <p>{item.name}</p>
      <p>{item.biodataId}</p>
      <p>{item.status}</p>
      <p>{biodatap?.email ? `${biodatap.email}` : "pending"}</p>
      <p>{biodatap?.mobile ? `${biodatap.mobile}` : "pending"}</p>
      <button
        onClick={() => handleDelete(item._id)}
        className="px-4 py-2 bg-slate-700 text-white"
      >
        Delete
      </button>
    </div>
  );
};

export default RequestContactInfo;
