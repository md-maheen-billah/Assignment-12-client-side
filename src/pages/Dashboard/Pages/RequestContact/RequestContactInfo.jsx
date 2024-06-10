import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../components/LoadingSpinner";

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

  const deletConfirmed = async (id) => {
    try {
      await mutateAsync({ id });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletConfirmed(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your entry has been deleted.",
          icon: "success",
        });
      }
    });
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <tr>
      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        {item.name}
      </td>
      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        {item.biodataId}
      </td>
      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        {item.status}
      </td>
      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        {biodatap.mobile ? biodatap.mobile : "wait for approval"}
      </td>
      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        {biodatap.email ? biodatap.email : "wait for approval"}
      </td>

      <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
        <button onClick={() => handleDelete(item._id)} className="">
          <FaTrash className="hover:text-reddM text-blackM" />
        </button>
      </td>
    </tr>
  );
};

export default RequestContactInfo;
