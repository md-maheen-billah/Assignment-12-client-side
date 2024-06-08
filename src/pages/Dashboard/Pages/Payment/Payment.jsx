import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../../../../components/Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: biodata = {} } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata-details/${id}`);
      return data;
    },
  });
  const status = "pending";
  const rdata = {
    biodataId: biodata.biodataId,
    name: biodata.name,
    email: user?.email,
    status,
  };
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
          backgroundPosition: "50% 25%",
        }}
        className="h-36 "
      >
        <div className="flex justify-center items-center h-full">
          <h2 className="text-whiteM text-3xl font-bold">Payment</h2>
        </div>
      </div>
      <section className="pt-2 dark:bg-gray-100 dark:text-gray-900">
        <div className="container mx-auto flex flex-col items-center justify-center max-w-lg p-4 lg:max-w-full sm:p-10 lg:flex-row">
          <div className="flex flex-col items-center justify-center flex-1 px-4 pt-4   dark:bg-gray-50">
            <span className="lg:text-3xl md:text-2xl text-reddM">
              Request Contact Info:{" "}
              <span className="text-whiteM">Biodata #{biodata.biodataId}</span>
            </span>
            <p className="lg:text-5xl md:text-3xl text-2xl text-whiteM my-4 font-bold text-center">
              5$ /Request
            </p>
            <p className="font-semibold text-center text-reddM">
              Requested By: {user.email}
            </p>
          </div>
        </div>
      </section>
      <Elements stripe={stripePromise}>
        <div className="mx-auto w-72 md:w-96">
          <Checkout rdata={rdata}></Checkout>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
