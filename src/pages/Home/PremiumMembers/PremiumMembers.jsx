import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MemberCard from "./MemberCard";
import { useState } from "react";

const PremiumMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("");
  const { data: pusers = [], refetch } = useQuery({
    queryKey: ["pusers"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users-premium`);
      return data;
    },
  });
  console.log(pusers);
  return (
    <div>
      <h2>Premium Members</h2>
      <div>
        <select
          onChange={(e) => {
            setSort(e.target.value);
          }}
          value={sort}
          name="sort"
          id="sort"
          className="border p-4 rounded-md"
        >
          <option value="">Sort By Age</option>
          <option value="dsc">Descending Order</option>
          <option value="asc">Ascending Order</option>
        </select>
      </div>
      {pusers.slice(0, 6).map((member) => (
        <MemberCard sort={sort} member={member} key={member._id}></MemberCard>
      ))}
    </div>
  );
};

export default PremiumMembers;
