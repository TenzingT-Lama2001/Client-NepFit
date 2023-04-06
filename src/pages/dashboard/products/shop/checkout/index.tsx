import { useCallback, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector,
} from "@mui/material";
// redux

import useAuth from "../../../../../hooks/useAuth";
import Iconify from "../../../../../components/Iconify";
import Layout from "../../../../../layouts";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import Page from "../../../../../components/Page";
import HeaderBreadcrumbs from "../../../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../../../routes/path";
import CheckoutCart from "../../../../../sections/auth/dashboard/checkout/CheckoutCart";
import CheckoutPayment from "../../../../../sections/auth/dashboard/checkout/CheckoutPayment";
import { CartItem } from "../../../../../sections/auth/dashboard/product/ProductDetailsSummary";
import { sum } from "lodash";

// ----------------------------------------------------------------------

const STEPS = ["Cart", "Payment"];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: "calc(-50% + 20px)",
  right: "calc(50% + 20px)",
  "& .MuiStepConnector-line": {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  "&.Mui-active, &.Mui-completed": {
    "& .MuiStepConnector-line": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function QontoStepIcon({
  active,
  completed,
}: {
  active: boolean;
  completed: boolean;
}) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "primary.main" : "text.disabled",
      }}
    >
      {completed ? (
        <Iconify
          icon={"eva:checkmark-fill"}
          sx={{ zIndex: 1, width: 20, height: 20, color: "primary.main" }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "currentColor",
          }}
        />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

EcommerceCheckout.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceCheckout() {
  const isMountedRef = useIsMountedRef();

  const { productState, setProductState } = useAuth();
  const { product, checkout } = productState ?? {};
  const { cart, billing, activeStep } = checkout ?? {};

  const isComplete = activeStep === STEPS.length;

  const getCart = useCallback(
    (cart: any) => {
      const totalSubTotal = sum(
        cart.map((cartItem: any) => cartItem.price * cartItem.qty)
      );

      const billing = cart.length === 0 ? null : productState?.checkout.billing;

      setProductState((prevState: any) => ({
        ...prevState,
        checkout: {
          ...prevState.checkout,
          cart: cart,
          billing: billing,
          subtotal: totalSubTotal,
          total: totalSubTotal,
        },
      }));
    },
    [productState, setProductState]
  );

  useEffect(() => {
    if (isMountedRef.current) {
      getCart(cart);
    }
  }, [isMountedRef, cart, getCart, productState, setProductState]);

  return (
    <Page title="Ecommerce: Checkout">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Checkout"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "E-Commerce",
              href: PATH_DASHBOARD.dashboard.admin.root,
            },
            { name: "Checkout" },
          ]}
        />

        <Grid container justifyContent={isComplete ? "center" : "flex-start"}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      "& .MuiStepLabel-label": {
                        typography: "subtitle2",
                        color: "text.disabled",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {!isComplete ? (
          <>
            {activeStep === 0 && <CheckoutCart />}
            {activeStep === 1 && <CheckoutPayment />}
          </>
        ) : // <CheckoutOrderComplete open={isComplete} />
        null}
      </Container>
    </Page>
  );
}
