import { useState } from "react";
import {
  useStripe,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import { LoadingButton } from "@mui/lab";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };
  const handleCompleteOrder = () => {};
  return (
    <form
      id="payment-form"
      onSubmit={(e) => handleSubmit(e)}
      style={{ marginBottom: "30px" }}
    >
      <PaymentElement
        id="payment-element"
        options={{
          fields: {
            billingDetails: { address: "never", email: "never" },
          },
          layout: "accordion",
        }}
      />
      {/* <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner" /> : "Pay now"}
        </span>
      </button> */}
      <LoadingButton
        disabled={isLoading || !stripe || !elements}
        id="submit"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => handleCompleteOrder()}
        sx={{ mt: "1rem" }}
      >
        Complete Order
      </LoadingButton>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
