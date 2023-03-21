// @mui
import { styled } from "@mui/material/styles";
import { Box, Grid, Switch, Container, Typography, Stack } from "@mui/material";
// _mock_

// sections

import Page from "../../../../components/Page";
import Layout from "../../../../layouts";

import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../../../hooks/useAuth";
import PaymentForm from "../../../../sections/auth/dashboard/packages/PaymentForm";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

PackagesCheckout.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PackagesCheckout() {
  const { stripeDetails } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51MndKeDd3klCShsCH0T8NFqdNNo35urZNyL8N04VVqpwbOnOjWoKJzliWIGcqweqqzeg4WmYHT09aSbcZEAr0Br300nFwDVFsh"
  );
  return (
    <Page title="Packages:Checkout">
      <Container>
        <HeaderBreadcrumbs
          heading="Packages Checkout"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.member.root },
            {
              name: "Packages",
              href: PATH_DASHBOARD.dashboard.member.packages,
            },
            { name: "Checkout" },
          ]}
        />
        <Elements stripe={stripePromise}>
          <PaymentForm
            clientSecret={stripeDetails?.clientSecret || ""}
            subscriptionId={stripeDetails?.subscriptionId || ""}
          />
        </Elements>
      </Container>
    </Page>
  );
}
