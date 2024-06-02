import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const RequestContactInfo = ({ item }) => {
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
  return (
    <div>
      <p>{item.name}</p>
      <p>{item.biodataId}</p>
      <p>{item.status}</p>
      <p>{biodatap?.email ? `${biodatap.email}` : "pending"}</p>
      <p>{biodatap?.mobile ? `${biodatap.mobile}` : "pending"}</p>
    </div>
  );
};

export default RequestContactInfo;
