import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const [error,setError]= useState('')
    const [transactionId ,setTransactionId] = useState('')
    const {user}=useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [cart,refetch]= useCart()
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)


    useEffect(() => {
      if(totalPrice > 0){
        axiosSecure.post('create-payment-intent', {price: totalPrice})
        .then(res=>{
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
        
      }
     

    },[axiosSecure,totalPrice])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return;
      }


      const card = elements.getElement(CardElement);

      if (card === null) {
        return;
      }



      const {error, paymentMethod} = await stripe.createPaymentMethod ({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('Payment error', error);
        setError(error.message)
      }
       else {
        console.log('[Payment Method]', paymentMethod);
        setError('') //jodi error na hoy empty thakbe
      }


      // confirm payment:
      const {paymentIntent, error: cardConfirmError} = await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name:user?.displayName || 'anonymous',
          }
        }
      })

      if(cardConfirmError){
        console.log('Card Confirm Error');
      }

      else{
        console.log('Payment Intent',paymentIntent);
        if(paymentIntent.status === 'succeeded'){
          console.log('Transaction Id:',paymentIntent.id);
          setTransactionId(paymentIntent.id)
          //now save the payment in the database:

          const payment = {
            email: user.email,
            transactionId: paymentIntent.id,
            price: totalPrice,
            data: new Date(), //utc data convert use moment js to
            cartIds: cart.map(item=>item._id),
            menuItemIds: cart.map(item=>item.menuId),
            status: 'pending'

          }

        const res = await axiosSecure.post('/payments', payment)
        console.log('Payment Save', res.data);
          refetch();
          if(res?.data?.paymentResult?.insertedId){
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Thank you for the taka poisha",
              showConfirmButton: false,
              timer: 1500
            });
            navigate ('/dashboard/paymentHistory')

          }

        }
      }


  };




  return (
    <form onSubmit={handleSubmit}>
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

      <button className="btn btn-sm btn-primary mt-6" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600 text-xs mt-2 font-bold  ">{error}</p>
      {
        transactionId && <p className="text-green-800 text-xs mt-2 font-bold">Your Transaction Id: [{transactionId}]  </p>
      }
    </form>
  );
};

export default CheckoutForm;
