import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import RequestContactInfo from "./RequestContactInfo";

const RequestContact = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/requested-access-dashboard/${user?.email}`
      );
      return data;
    },
  });
  console.log(requests);
  return (
    <div>
      <h2>Request Contact :{requests.length}</h2>
      <div className="grid lg:grid-cols-3 gap-8 border-2 border-red-500">
        {requests.map((item) => (
          <RequestContactInfo
            refetch={refetch}
            item={item}
            key={item._id}
          ></RequestContactInfo>
        ))}
      </div>
    </div>
  );
};

export default RequestContact;
