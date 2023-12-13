import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../component/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    // Add publishable key 
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateway_PK)
    return (
        <div>
            <SectionTitle
                subHeading={"Payment!"}
                heading={"Please pay to eat"}
            >
            </SectionTitle>

        <div>
            <Elements stripe={stripePromise}>
             <CheckoutForm/> 
            </Elements>
        </div>
            
        </div>
    );
};

export default Payment;