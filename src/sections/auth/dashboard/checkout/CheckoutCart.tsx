import sum from "lodash/sum";
// next
import NextLink from "next/link";
// @mui
import { Grid, Card, Button, CardHeader, Typography } from "@mui/material";
// redux
// components
import Iconify from "../../../../components/Iconify";
import Scrollbar from "../../../../components/Scrollbar";
import EmptyContent from "../../../../components/EmptyContent";
//
import CheckoutSummary from "./CheckoutSummary";
import CheckoutProductList from "./CheckoutProductList";
import useAuth from "../../../../hooks/useAuth";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { useCallback, useEffect } from "react";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { productState, setProductState } = useAuth();

  const { product, checkout } = productState ?? {};
  const { cart, total, discount, subtotal } = checkout ?? {};

  const totalItems = sum(cart?.map((item) => item.qty));
  const isEmptyCart = cart?.length === 0;

  const isMountedRef = useIsMountedRef();
  const getCart = useCallback(
    (cart: any) => {
      const totalSubtotal = sum(
        cart.map((cartItem: any) => cartItem.price * cartItem.qty)
      );

      const billing = cart.length === 0 ? null : productState?.checkout.billing;

      setProductState((prevState: any) => ({
        ...prevState,
        checkout: {
          ...prevState.checkout,
          cart: cart,
          billing: billing,
          subtotal: totalSubtotal,
          total: totalSubtotal,
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

  const deleteCart = (productId: string) => {
    setProductState((prevState: any) => {
      const updatedCart = prevState.checkout.cart.filter(
        (item: any) => item._id !== productId
      );

      return {
        ...prevState,
        checkout: {
          ...prevState.checkout,
          cart: updatedCart,
        },
      };
    });
  };
  const handleDeleteCart = (productId: string) => {
    deleteCart(productId);
  };

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

    console.log({ cart });
  };

  const increaseQuantity = (productId: string) => {
    setProductState((prevState: any) => {
      const updatedCart = prevState.checkout.cart.map((product: any) => {
        if (product._id === productId) {
          const newQty = product.qty + 1;
          return {
            ...product,
            qty: newQty,
            total: newQty * product.price,
            subtotal: newQty * product.price,
          };
        }
        return product;
      });
      const totalSubTotal = sum(
        updatedCart.map((cartItem: any) => cartItem.price * cartItem.qty)
      );

      return {
        ...prevState,
        checkout: {
          ...prevState.checkout,
          cart: updatedCart,
          total: totalSubTotal,
          subtotal: totalSubTotal,
        },
      };
    });
  };

  const handleIncreaseQuantity = (productId: string) => {
    increaseQuantity(productId);
  };

  const decreaseQuantity = (productId: string) => {
    setProductState((prevState: any) => {
      const updatedCart = prevState.checkout.cart.map((product: any) => {
        if (product._id === productId) {
          const newQty = product.qty - 1;
          return {
            ...product,
            qty: newQty,
            total: newQty * product.price,
            subtotal: newQty * product.price,
          };
        }
        return product;
      });
      const totalSubTotal = sum(
        updatedCart.map((cartItem: any) => cartItem.price * cartItem.qty)
      );
      return {
        ...prevState,
        checkout: {
          ...prevState.checkout,
          cart: updatedCart,
          total: totalSubTotal,
          subtotal: totalSubTotal,
        },
      };
    });
  };
  const handleDecreaseQuantity = (productId: string) => {
    decreaseQuantity(productId);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: "text.secondary" }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart && cart ? (
            <Scrollbar>
              <CheckoutProductList
                products={cart}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <NextLink href={PATH_DASHBOARD.dashboard.admin.root} passHref>
          <Button
            color="inherit"
            startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
          >
            Continue Shopping
          </Button>
        </NextLink>
      </Grid>

      <Grid item xs={12} md={4}>
        {subtotal ? (
          <CheckoutSummary enableDiscount subtotal={subtotal} />
        ) : null}
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cart?.length === 0}
          onClick={handleNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
