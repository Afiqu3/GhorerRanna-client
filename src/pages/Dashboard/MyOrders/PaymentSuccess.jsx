import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentRecorded, setPaymentRecorded] = useState({});
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

  useEffect(() => {
    const recordPayment = async () => {
      try {
        const response = await axiosSecure.patch(
          `/payment-success?session_id=${sessionId}`
        );
        setPaymentRecorded(response.data);
        // console.log('Payment recorded:', response.data);
      } catch (error) {
        console.error('Error recording payment:', error);
      }
    };

    if (sessionId) {
      recordPayment();
    }
  }, [sessionId, axiosSecure]);

  return (
    <div
      className={` flex flex-col justify-center items-center h-full ${
        theme === 'light' ? 'bg-white' : 'bg-black'
      }`}
    >
      <title>Payment Success</title>
      <h1
        className={`text-4xl ${
          theme === 'light' ? 'text-primary' : 'text-white'
        }`}
      >
        Payment Successful! 🎉
      </h1>
      <p
        className={`mt-4 text-lg ${
          theme === 'light' ? 'text-primary' : 'text-white'
        }`}
      >
        Your transaction ID is: {paymentRecorded.transactionId}
      </p>
    </div>
  );
};

export default PaymentSuccess;
