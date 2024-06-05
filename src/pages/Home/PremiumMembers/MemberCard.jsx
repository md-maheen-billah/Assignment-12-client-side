import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MemberCard = ({ member, sort }) => {
  const axiosSecure = useAxiosSecure();
  const { data: puser = {} } = useQuery({
    queryKey: ["puser", member?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/biodata-public/${member?.email}?sort=${sort}`
      );
      return data;
    },
  });
  console.log(puser);
  return (
    <div>
      <img className="w-20" src={puser.image} alt="" />
      <h2>{member.email}</h2>
    </div>
  );
};

export default MemberCard;
