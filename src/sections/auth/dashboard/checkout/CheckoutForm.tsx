import { useState } from "react";
import {
  useStripe,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import useAuth from "../../../../hooks/useAuth";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "../../../../routes/path";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    console.log({ elements });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        receipt_email: auth?.email,
        return_url: `http://localhost:3000/dashboard/member/purchase-history`,
        payment_method_data: {
          billing_details: {
            email: auth?.email,
            address: {
              city: "Kathmandu",
            },
          },
        },
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
      enqueueSnackbar("Payment Successful");
    }
    enqueueSnackbar("Payment Successful");
    setIsLoading(false);
    push(PATH_DASHBOARD.dashboard.member.purchaseHistory);
  };

  return (
    <form
      id="payment-form"
      onSubmit={(e) => handleSubmit(e)}
      style={{ marginBottom: "30px" }}
    >
      <PaymentElement
        id="payment-element"
        options={{
          layout: "accordion",
        }}
      />
      <LoadingButton
        id="submit"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ mt: "1rem" }}
      >
        Complete Order
      </LoadingButton>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
