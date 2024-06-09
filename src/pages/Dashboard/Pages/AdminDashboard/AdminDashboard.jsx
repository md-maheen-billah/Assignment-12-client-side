import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaCartShopping, FaPeopleGroup } from "react-icons/fa6";
import { BiFemale, BiMale } from "react-icons/bi";
import { FaGrinStars } from "react-icons/fa";
import { Cell, PieChart, Pie, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: admind = {} } = useQuery({
    queryKey: ["admind"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/admin-dashboard`);
      return data;
    },
  });
  console.log(admind);

  const pieChartData = Object.entries(admind).map(([key, value]) => {
    // Mapping the keys to more readable names
    const nameMap = {
      totalBiodataCount: "Total Biodata",
      maleBiodataCount: "Male Biodata",
      femaleBiodataCount: "Female Biodata",
      premiumBiodataCount: "Premium Biodata",
      totalPaymentsSum: "Total Payments",
    };

    return { name: nameMap[key] || key, value };
  });
  return (
    <div>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
            backgroundPosition: "50% 25%",
          }}
          className="h-36 "
        >
          <div className="flex justify-center items-center h-full">
            <h2 className="text-whiteM text-3xl font-bold">Admin Dashboard</h2>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className=" mt-6 mb-10 lg:mb-20 max-w-[1280px] mx-auto px-2 lg:px-10"
      >
        <section className="p-6 my-6">
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-5">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
                <FaCartShopping className="text-5xl" />
              </div>
              <div className="flex flex-col justify-center align-middle text-whiteM">
                <p className="text-3xl font-semibold leading-none">
                  ${admind.totalPaymentsSum}
                </p>
                <p className="capitalize">Total Payments</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
                <FaPeopleGroup className="text-5xl" />
              </div>
              <div className="flex flex-col justify-center align-middle text-whiteM">
                <p className="text-3xl font-semibold leading-none">
                  {admind.totalBiodataCount}
                </p>
                <p className="capitalize">Total Biodatas</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
                <BiFemale className="text-5xl" />
              </div>
              <div className="flex flex-col justify-center align-middle text-whiteM">
                <p className="text-3xl font-semibold leading-none">
                  {admind.femaleBiodataCount}
                </p>
                <p className="capitalize">Female Biodatas</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
                <BiMale className="text-5xl" />
              </div>
              <div className="flex flex-col justify-center align-middle text-whiteM">
                <p className="text-3xl font-semibold leading-none">
                  {admind.maleBiodataCount}
                </p>
                <p className="capitalize">Male Biodatas</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 text-reddM">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-default-600">
                <FaGrinStars className="text-5xl" />
              </div>
              <div className="flex flex-col justify-center align-middle text-whiteM">
                <p className="text-3xl font-semibold leading-none">
                  {admind.premiumBiodataCount}
                </p>
                <p className="capitalize">Premium Biodatas</p>
              </div>
            </div>
          </div>
        </section>
        <div
          style={{ width: "100%", height: 300 }}
          className="flex justify-center"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
