import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useUpdateUser } from "@/lib/react-query/queryAndMutations";

const Payment = () => {
  const { user } = useUserContext();
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } = useUpdateUser();
  const userId = user.id;  // Adjust this according to your user context
  const [product, setProduct] = useState({
    name: "Royal",
    price: 599,
    productBy: "VibeSphere",
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
      userId,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/payment/createPayment', body, { headers });
      console.log('RESPONSE ', response);
      const { status } = response;
      console.log('STATUS ', status);

      if (status === 200) {
        console.log('Payment successful');
      } else {
        console.log('Payment failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full  text-slate-200">
      <h1 className="text-3xl font-bold mb-6">Buy Royal Badge</h1>
      <StripeCheckout
        stripeKey="pk_test_51PZ2DRRupMdEfhxq5f04WZgfxa5jOYfZL4H7b5xd2p4mq1gKYHo0IHLMPNQmBGLywC7YPtmEJ9TVvmpSQwzWoFZ500hYnYrN2I"
        token={makePayment}
        name="Buy Royal"
        amount={(product.price * 100)/80}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
          Buy Royal👑 in just Rs.{product.price}
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;
