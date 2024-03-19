import Checkout from "@/app/components/checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
  );

const CheckoutPage = () => {
  return (
    <Checkout />
  )
}

export default CheckoutPage