import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { invoiceList, invoicePreview } from "../../../../api/stripe";
import useAuth from "../../../../hooks/useAuth";
import { useSnackbar } from "notistack";
interface Props {
  clientSecret: string;
  subscriptionId: string;
}

const PaymentForm: React.FC<Props> = ({ clientSecret, subscriptionId }) => {
  const { stripeDetails } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet, so do nothing.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      // There is an issue with the Card Element.
      setError("There was an issue with the payment form.");
      return;
    }

    // Use the Stripe.js library to create a payment method for the card.
    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (stripeError || !paymentMethod) {
      // There was an issue with the payment method creation.
      setError(
        stripeError?.message ?? "There was an issue with the payment form."
      );
      return;
    }

    // Use the payment method and the client secret to create a subscription.
    const { error: subscriptionError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (subscriptionError) {
      // There was an issue with the subscription creation.
      setError(
        subscriptionError?.message ??
          "There was an issue with the payment form."
      );
      return;
    }

    enqueueSnackbar("Payment Successful");

    // The subscription was successfully created.
    console.log("Subscription created!");
  };
  console.log({ stripeDetails });
  const customerId = stripeDetails?.stripeCustomerId;
  console.log({ customerId });
  //   const { data, isLoading, refetch } = useQuery<any>(
  //     ["get_invoice"],
  //     () => invoicePreview({ customerId, subscriptionId }),
  //     {
  //       onSuccess(data) {
  //         console.log("invoice preview", data);
  //       },
  //     }
  //   );

  const { data, isLoading, refetch } = useQuery<any>(
    ["get_invoice_list"],
    () => invoiceList(),
    {
      onSuccess(data) {
        console.log("invoice list", data);
      },
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{}} />
      {error && <div>{error}</div>}
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
