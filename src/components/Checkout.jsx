import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "../assets/checkoutform.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Aos from "aos";

const Checkout = ({ rdata }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const totalPrice = 5;
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const { mutateAsync } = useMutation({
    mutationFn: async (rdata) => {
      const { data } = await axiosSecure.post("/requested-access", rdata);
      return data;
    },
    onSuccess: () => {
      toast.success("Requested Access Successfully!");
    },
  });

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setProcessing(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
      setProcessing(false);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        try {
          //   Post request to server
          await mutateAsync(rdata);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }

        // now same the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js
        };

        const res = await axiosSecure.post("/payments", payment);
        navigate(`/biodata-details/${rdata.biodataId}`);
        console.log("payment saved", res.data);
      }
    }
    setProcessing(false);
  };

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  return (
    <form data-aos="fade-up" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <div data-aos="fade-up" className="flex justify-center">
        <button
          disabled={!stripe || !clientSecret || processing}
          type="submit"
          className="group disabled:hover:cursor-not-allowed relative z-10 mt-2 px-6 py-2 overflow-hidden bg-reddM text-base text-whiteM"
        >
          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
          <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
          <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
            Pay
          </span>
          Pay
        </button>
      </div>
      <p className="text-red-600 text-center mt-2">{error}</p>
      {transactionId && (
        <p className="text-green-600 text-center mt-2">
          Your Transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};

export default Checkout;
