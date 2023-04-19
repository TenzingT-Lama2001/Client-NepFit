import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Grid, Button, Card, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// @types

// components
import Iconify from "../../../../components/Iconify";
import { FormProvider } from "../../../../components/hook-form";
//
import CheckoutSummary from "./CheckoutSummary";

import useAuth from "../../../../hooks/useAuth";
import CheckoutBillingInfo from "./CheckoutBillingInfo";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { createPaymentIntent } from "../../../../api/stripe";

// ----------------------------------------------------------------------

type FormValuesProps = {
  delivery: number;
  payment: string;
};

export default function CheckoutPayment() {
  const { productState, setProductState, stripeDetails, auth } = useAuth();
  const { product, checkout } = productState ?? {};
  const { stripeProductId } = stripeDetails ?? {};
  const { subtotal } = checkout ?? {};
  const { id } = auth!;
  const [clientSecret, setClientSecret] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51MndKeDd3klCShsCH0T8NFqdNNo35urZNyL8N04VVqpwbOnOjWoKJzliWIGcqweqqzeg4WmYHT09aSbcZEAr0Br300nFwDVFsh"
  );

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent")
  //     .then((res) => res.json())
  //     .then(({ clientSecret }) => setClientSecret(clientSecret));
  // }, []);
  const amount = subtotal!;
  console.log({ checkout });
  const stripeProductIdArray = checkout?.cart.map(
    (product) => product.stripeProductId
  );
  const stripeProductPriceIdArray = checkout?.cart.map(
    (product) => product.stripeProductPriceId
  );

  const stripeProductQty = [];

  for (let i = 0; i < checkout!.cart.length; i++) {
    const { stripeProductId, qty, subtotal, name } = checkout!.cart[i];
    stripeProductQty.push({ stripeProductId, qty, subtotal, name });
  }
  const data = {
    amount,
    stripeProductIdArray,
    stripeProductPriceIdArray,
    stripeProductQty,
    memberId: id,
  };
  console.log({ data });
  useQuery<any>(
    ["create_payment_intent", data],
    () => createPaymentIntent(data),
    {
      onSuccess(data) {
        setClientSecret(data.clientSecret);
        console.log(data);
      },
    }
  );

  const onNextStep = () => {
    setProductState((prevState: any) => ({
      ...prevState,
      checkout: {
        ...prevState.checkout,
        activeStep: prevState.checkout.activeStep + 1,
      },
    }));
  };
  const handleNextStep = () => {
    onNextStep();
  };
  const onBackStep = () => {
    setProductState((prevState: any) => ({
      ...prevState,
      checkout: {
        ...prevState.checkout,
        activeStep: prevState.checkout.activeStep - 1,
      },
    }));
  };
  const handleBackStep = () => {
    onBackStep();
  };
  const onGotoStep = (step: number) => {
    const gotToStep = step;
    setProductState((prev: any) => ({
      ...prev,
      checkout: {
        ...prev.checkout,
        activeState: gotToStep,
      },
    }));
  };
  const handleGotoStep = (step: number) => {
    onGotoStep(step);
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required("Payment is required!"),
  });
  console.log({ clientSecret });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {clientSecret && stripePromise && (
          <Container>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>{" "}
          </Container>
        )}
        <Button
          size="small"
          color="inherit"
          onClick={handleBackStep}
          startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
        >
          Back
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutBillingInfo onBackStep={handleBackStep} />

        {subtotal ? (
          <CheckoutSummary
            subtotal={subtotal}
            enableEdit
            onEdit={() => handleGotoStep(0)}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}
