import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useStatus = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: status = "",
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["status", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data.status;
    },
  });

  //   Fetch user info using logged in user email

  return [status, refetch, isLoading];
};

export default useStatus;
