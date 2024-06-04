import { Link, useParams } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useStatus from "../../hooks/useStatus";
import useRole from "../../hooks/useRole";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const BiodataDetails = () => {
  const { user } = useAuth();
  const [status] = useStatus();
  const [role] = useRole();
  console.log(status);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata-details/${id}`);
      return data;
    },
  });
  console.log(biodata);

  const { data: access = {} } = useQuery({
    queryKey: ["access", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata-access-own/${user?.email}`);
      return data;
    },
  });

  console.log(access);

  const { data: request = {}, refetch } = useQuery({
    queryKey: ["request", id, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/requested-access/${id}/${user?.email}`
      );
      return data;
    },
  });
  console.log(request);

  const { data: biodatap = {} } = useQuery({
    queryKey: ["biodatap", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata-details-premium/${id}`);
      return data;
    },
    enabled:
      status === "premium" ||
      access?.biodataId === parseFloat(id) ||
      role === "admin" ||
      request?.status === "approved", // Query will only run if status is "premium"
  });
  console.log(biodatap);

  const { mutateAsync } = useMutation({
    mutationFn: async (rdata) => {
      const { data } = await axiosSecure.post("/requested-access", rdata);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Requested Access Successfully!");
    },
    cleanup: () => QueryClient.invalidateQueries(["biodatap", id]),
  });

  const handleRequest = async (biodata) => {
    console.log(id);
    const status = "pending";
    try {
      const rdata = {
        biodataId: biodata.biodataId,
        name: biodata.name,
        email: user?.email,
        status,
      };
      console.table(rdata);

      //   Post request to server
      await mutateAsync(rdata);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h2>Biodata Details</h2>
      <img className="w-20" src={biodata.image} alt="" />
      <p>{biodata.name}</p>
      {status === "premium" ||
      access.biodataId === parseFloat(id) ||
      role === "admin" ||
      request?.status === "approved" ? (
        <>
          <p>{biodatap?.email}</p>
          <p>{biodatap?.mobile}</p>
        </>
      ) : (
        <>
          <button
            onClick={() => handleRequest(biodata)}
            className="px-4 py-2 bg-slate-700 text-white"
          >
            {request?.status ? `${request.status}` : "Show Contact Info"}
          </button>

          <Link to={`/payment/${biodata.biodataId}`}>
            <button className="px-4 py-2 bg-red-700 text-white">
              Show Contact Info
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default BiodataDetails;
