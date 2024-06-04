import { Link, useParams } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import useStatus from "../../hooks/useStatus";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

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

  const { data: request = {} } = useQuery({
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
    mutationFn: async (fdata) => {
      const { data } = await axiosSecure.post("/favorites", fdata);
      return data;
    },
    onSuccess: () => {
      toast.success("Added to Favorites!");
    },
  });

  const handleAddFavorite = async () => {
    const fdata = {
      name: biodata.name,
      biodataId: biodata.biodataId,
      permanentDivision: biodata.permanentDivision,
      occupation: biodata.occupation,
      favorite_email: user?.email,
    };
    try {
      //   Post request to server
      await mutateAsync(fdata);
    } catch (err) {
      console.log(err);
      toast.error("Already Added to Favorites");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h2>Biodata Details</h2>
      <img className="w-20" src={biodata.image} alt="" />
      <p>{biodata.name}</p>
      <button
        onClick={handleAddFavorite}
        className="px-4 py-2 bg-blue-700 text-white"
      >
        Add to Favorite
      </button>
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
          {request?.status === "pending" ? (
            "Please Wait For Admin Approval"
          ) : (
            <Link to={`/payment/${biodata.biodataId}`}>
              <button className="px-4 py-2 bg-red-700 text-white">
                Show Contact Info
              </button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default BiodataDetails;
