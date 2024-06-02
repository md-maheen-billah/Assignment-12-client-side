import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../../components/LoadingSpinner";

const Biodatas = () => {
  const axiosCommon = useAxiosCommon();
  const { data: biodata = [], isLoading } = useQuery({
    queryKey: ["biodata"],
    queryFn: async () => {
      const { data } = await axiosCommon("/biodata-public");
      return data;
    },
  });
  console.log(biodata);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h2>This is biodatas: {biodata.length}</h2>
      <div className="grid lg:grid-cols-3 gap-4">
        {biodata.map((item) => (
          <div className="my-6 border-red-500 border-2" key={item.biodataId}>
            <img className="w-20" src={item.image} alt="" />
            <p>{item.biodataId}</p>
            <p>{item.sex}</p>
            <p>{item.permanentDivision}</p>
            <p>{item.age}</p>
            <p>{item.occupation}</p>
            <button className="px-4 py-2 bg-slate-700 text-white">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Biodatas;
