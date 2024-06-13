import Swal from "sweetalert2";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const Payment = ({camp}) => {



    //payment method 

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const navigate = useNavigate();


    const totalPrice = parseInt(camp?.CampFees);
    // console.log("total price", totalPrice , typeof totalPrice);
    

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data);
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure , totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
            return
        }
        else {
            console.log('[PaymentMethod]', paymentMethod)
            setError('');
        }

        // confirm payment
        //  console.log(user?.email , user?.displayName )
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
            address: {
                line1: '1234 Main St',
                city: 'San Francisco',
                state: 'CA',
                postal_code: '94111',
                country: 'US',
              },
          },
        },
        
      })

        if (confirmError) {
            console.log('confirm error', confirmError)
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                    campId: camp.CampId,
                    participantId: camp._id,
                    CampName : camp.CampName,          
                }

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment success",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/dashboard/paymentHistory')
                   
                }

            }
        }

    }
    // console.log(stripe , clientSecret);

    return (
        <div className=" bg-cyan-700/20 p-3 md:p-10 rounded-2xl">
               <form onSubmit={handleSubmit}>
                          <CardElement options={{
                                     style: {
                        base: {
                            fontSize: '16px',
                            color: '#000000',
                            '::placeholder': {
                                color: '#000000',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />   
                 <div className=" text-center">
                 <button className="btn w-full my-10" type="submit" disabled={!stripe ||
                              !clientSecret}>
                              Pay
                          </button>
                          <p className="text-red-600">{error}</p>
                          {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
                </div>
                          
                      </form>
  </div>
    );
};
Payment.propTypes = {
    camp: PropTypes.object.isRequired,
  
};
export default Payment;