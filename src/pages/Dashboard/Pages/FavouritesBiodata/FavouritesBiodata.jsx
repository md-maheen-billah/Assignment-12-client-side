import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Aos from "aos";

const FavouritesBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: favorites = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/favorites/${user?.email}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/favorites/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Deleted!");
    },
  });

  const deletConfirmed = async (id) => {
    try {
      await mutateAsync({ id });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletConfirmed(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your entry has been deleted.",
          icon: "success",
        });
      }
    });
  };

  console.log(favorites);
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div data-aos="fade-out">
      <Helmet>
        <title>Dashboard | Favorite Biodatas</title>
      </Helmet>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
            backgroundPosition: "50% 25%",
          }}
          className="h-36 "
        >
          <div className="flex justify-center items-center h-full">
            <h2 className="text-whiteM text-3xl font-bold">
              Favorite Biodatas
            </h2>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className=" mt-6 mb-10 lg:mb-20 max-w-[1280px] mx-auto px-2 lg:px-10"
      >
        <div className="container px-4 mx-auto pt-1">
          <div className="flex flex-col mt-6 mb-10 lg:mb-20">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-blackM  md:rounded-lg">
                  <table className="min-w-full divide-y divide-blackM">
                    <thead className="bg-reddM">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" text-center gap-x-3">
                            <span className="text-center">Name</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" w-20 mx-auto">
                            <span className="text-center w-20">Biodata Id</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" w-36 mx-auto">
                            <span className="text-center">
                              Permanent Address
                            </span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" text-center gap-x-3">
                            <span className="text-center">Occupation</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="py-3.5 text-center px-4 text-sm font-medium text-whiteM  rtl:text-center"
                        >
                          <div className=" text-center gap-x-3">
                            <span className="text-center">Delete</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-redM divide-y divide-blackM ">
                      {favorites.map((item) => (
                        <tr key={item._id}>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.biodataId}
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.permanentDivision}
                          </td>
                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            {item.occupation}
                          </td>

                          <td className="px-4 py-4 text-sm text-center text-blackM  whitespace-nowrap">
                            <button
                              onClick={() => handleDelete(item._id)}
                              className=""
                            >
                              <FaTrash className="hover:text-reddM text-blackM" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {favorites.length < 1 && (
        <div className="lg:mt-24 lg:mb-28 mt-8 mb-8">
          <h1 className="text-4xl dark:text-[#f9a06f] text-redM text-center">
            No Favorites Found!
          </h1>
        </div>
      )}
    </div>
  );
};

export default FavouritesBiodata;
