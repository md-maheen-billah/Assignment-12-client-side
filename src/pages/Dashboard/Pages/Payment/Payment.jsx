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
      <h2>Payment</h2>
      <img className="w-20" src={biodata.image} alt="" />
      <Elements stripe={stripePromise}>
        <Checkout rdata={rdata}></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;
