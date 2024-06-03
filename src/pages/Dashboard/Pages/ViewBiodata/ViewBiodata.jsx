import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useStatus from "../../../../hooks/useStatus";

const ViewBiodata = () => {
  const [status, refetch] = useStatus();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { mutateAsync: mutatePremium } = useMutation({
    mutationFn: async ({ pdata }) => {
      const { data } = await axiosSecure.patch(
        `/users-premium-request/${user?.email}`,
        pdata
      );
      return data;
    },
    onSuccess: () => {
      refetch();
      if (status === "pending") toast.success("Already Requested!");
      else {
        toast.success("Requested for Premium!");
      }
    },
  });

  const handlePremium = async () => {
    const status = "pending";

    try {
      const pdata = {
        status,
      };
      console.table(pdata);

      //   Post request to server
      await mutatePremium({ pdata });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h2>View Biodata</h2>
      <button
        onClick={handlePremium}
        className="px-4 py-2 bg-slate-700 text-white"
      >
        Request Premium
      </button>
    </div>
  );
};

export default ViewBiodata;
