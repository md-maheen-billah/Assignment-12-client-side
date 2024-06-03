import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ContactRequests = () => {
  const axiosSecure = useAxiosSecure();
  const status = "pending";
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/requested-access-dashb/${status}`);
      return data;
    },
  });
  console.log(requests);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ sdata, id }) => {
      const { data } = await axiosSecure.patch(
        `/requested-access-dashboard/${id}`,
        sdata
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Approved!");
    },
  });

  const handleChangeStatus = async (id) => {
    const status = "approved";

    try {
      const sdata = {
        status,
      };
      console.table(sdata);

      //   Post request to server
      await mutateAsync({ id, sdata });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h2>Contact Requests</h2>
      {requests.map((item) => (
        <div key={item._id}>
          <p>Requested Person: {item.name}</p>
          <p>Requested Id: {item.biodataId}</p>
          <p>Requested By: {item.email}</p>
          <button
            onClick={() => handleChangeStatus(item._id)}
            className="px-4 py-2 bg-slate-700 text-white"
          >
            {item.status}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactRequests;
