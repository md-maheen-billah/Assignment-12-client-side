import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PremiumRequests = () => {
  const axiosSecure = useAxiosSecure();
  const status = "pending";
  const { data: rusers = [], refetch } = useQuery({
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

  const { mutateAsync: mutatePremium2 } = useMutation({
    mutationFn: async ({ mdata, email }) => {
      const { data } = await axiosSecure.put(
        `/users-premium-change2/${email}`,
        mdata
      );
      return data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handlePremium = async (item) => {
    console.log(item._id);
    const id = item._id;
    const email = item.email;
    const status = "premium";

    try {
      const pdata = {
        status,
      };
      console.table(pdata);

      const mdata = {
        status,
      };

      //   Post request to server
      await mutatePremium({ id, pdata });
      await mutatePremium2({ email, mdata });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h2>Premium Requests</h2>
      {rusers.map((item) => (
        <div key={item._id}>
          <p>Username: {item.name}</p>
          <p>Requested Id: {item.email}</p>

          <button
            onClick={() => handlePremium(item)}
            className="px-4 py-2 bg-slate-700 text-white"
          >
            Make Premium
          </button>
        </div>
      ))}
    </div>
  );
};

export default PremiumRequests;
