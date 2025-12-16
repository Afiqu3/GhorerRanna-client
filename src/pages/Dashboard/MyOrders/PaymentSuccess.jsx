import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useTheme from '../../../hooks/useTheme';

// app.patch('payment-success', verifyJWTToken, async (req, res) => {
//       const sessionId = req.query.session_id;
//       const session = await stripe.checkout.sessions.retrieve(sessionId);
//       const transactionId = session.payment_intent;

//       const query = { transactionId: transactionId };
//       const paymentExists = await paymentHistoryCollection.findOne(query);
//       if (paymentExists) {
//         return res.send({ message: 'payment recorded' });
//       }

//       if(session.payment_status === 'paid'){
//         const query = session.metadata.orderId;
//         const updateDoc = {
//           $set: {
//             paymentStatus: 'paid',
//           },
//         };
//         await ordersCollection.updateOne({ _id: new ObjectId(query) }, updateDoc);

//         const paymentRecord = {
//           userEmail: session.metadata.userEmail,
//           orderId: session.metadata.orderId,
//           transactionId: transactionId,
//           amount: session.amount_total / 100,
//           currency: session.currency,
//           paymentTime: new Date(),
//         };
//         await paymentHistoryCollection.insertOne(paymentRecord);
//       }
//       res.send({ message: 'payment recorded' });
//     });

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
        console.log('Payment recorded:', response.data);
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
