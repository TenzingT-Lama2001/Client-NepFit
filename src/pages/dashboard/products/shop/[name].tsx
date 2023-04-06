import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// redux

// routes

// hooks
import useSettings from "../../../../hooks/useSettings";
// layouts
import Layout from "../../../../layouts";
// components
import Page from "../../../../components/Page";

import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
// sections

import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../../hooks/useAuth";
import CartWidget from "../../../../components/CartWidget";
import SkeletonProduct from "../../../../sections/auth/dashboard/product/SkeletonProduct";
import { getProducts } from "../../../../api/products";
import { PATH_DASHBOARD } from "../../../../routes/path";

import { sum, uniqBy } from "lodash";
import ProductDetailsSummary, {
  CartItem,
} from "../../../../sections/auth/dashboard/product/ProductDetailsSummary";

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: "100% Original",
    description: "Chocolate bar candy canes ice cream toffee cookie halvah.",
    icon: "ic:round-verified",
  },
  {
    title: "10 Day Replacement",
    description: "Marshmallow biscuit donut dragée fruitcake wafer.",
    icon: "eva:clock-fill",
  },
  {
    title: "Year Warranty",
    description: "Cotton candy gingerbread cake I love sugar sweet.",
    icon: "ic:round-verified-user",
  },
];

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  justifyContent: "center",
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

EcommerceProductDetails.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductDetails() {
  const [value, setValue] = useState("1");

  const { query } = useRouter();
  const { productState, setProductState } = useAuth();
  const { product } = productState ?? {};
  const { name } = query;

  const [error, setError] = useState(false);
  const newName = Array.isArray(name)
    ? name.map((n) => n?.replaceAll("-", " "))
    : name?.replaceAll("-", " ");

  useQuery<any>(
    ["get_products", name],
    () =>
      getProducts({
        page: 0,
        searchQuery: newName,
        order: "asc",
      }),
    {
      onSuccess({ products }) {
        setProductState((prevState: any) => ({
          ...prevState,
          product: products,
        }));
      },
      onError() {
        setError(true);
      },
    }
  );

  // const addCart = (payload: any) => {
  //   console.log({ payload });

  //   const product = payload;
  //   console.log("PAYOAD KO ID", product._id);
  //   const isEmptyCart = productState?.checkout.cart.length === 0;
  //   console.log("THIS PRODUCT WILL BE ADDED TO CART", product);
  //   if (isEmptyCart) {
  //     setProductState((prev: any) => ({
  //       ...prev,
  //       checkout: {
  //         ...prev.checkout,
  //         cart: [...prev.checkout.cart, product],
  //       },
  //     }));
  //   } else {
  //     const newCart = productState?.checkout.cart.map((_product) => {
  //       const isExisted = _product._id === product._id;

  //       if (isExisted) {
  //         return {
  //           ..._product,
  //           qty: _product.qty + 1,
  //         };
  //       }
  //       return _product;
  //     });
  //     console.log({ newCart });

  //     setProductState((prev: any) => ({
  //       ...prev,
  //       checkout: {
  //         ...prev.checkout,
  //         cart: uniqBy(newCart, "id"),

  //       },
  //     }));
  //     console.log("LATEST CART", productState?.checkout.cart);
  //   }
  // };
  const addCart = (payload: any) => {
    const product = payload;

    const cart = productState!.checkout.cart;

    const existingProductIndex = cart.findIndex((p) => p._id === product._id);

    if (existingProductIndex !== -1 && cart) {
      // If product already exists in the cart, update its quantity
      const existingProduct = cart[existingProductIndex];
      const updatedProduct = {
        ...existingProduct,
        qty: existingProduct.qty + product.qty,
      };

      const updatedCart = [...cart];
      updatedCart.splice(existingProductIndex, 1, updatedProduct);
      const totalSubTotal = sum(
        updatedCart.map((cartItem: any) => cartItem.price * cartItem.qty)
      );
      setProductState((prev: any) => ({
        ...prev,
        checkout: {
          ...prev.checkout,
          cart: updatedCart,
          subtotal: totalSubTotal,
          total: totalSubTotal,
        },
      }));
    } else {
      // If product doesn't exist in the cart, add it as a new item

      // setProductState((prev: any) => ({
      //   ...prev,
      //   checkout: {
      //     ...prev.checkout,
      //     cart: [...cart, { ...product, qty: product.qty }],

      //   },
      // }));
      setProductState((prev: any) => {
        const updatedCart = [
          ...prev.checkout.cart,
          { ...product, qty: product.qty },
        ];
        const totalSubTotal = sum(
          updatedCart.map((cartItem: any) => cartItem.price * cartItem.qty)
        );
        return {
          ...prev,
          checkout: {
            ...prev.checkout,
            cart: updatedCart,
            subtotal: totalSubTotal,
            total: totalSubTotal,
          },
        };
      });
    }
  };
  const handleAddCart = (product: any) => {
    addCart(product);
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
  return (
    <Page title="Ecommerce: Product Details">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "E-Commerce",
              href: PATH_DASHBOARD.dashboard.products.shop,
            },
            {
              name: "Shop",
              href: PATH_DASHBOARD.dashboard.admin.products.list,
            },
            { name: sentenceCase(name as string) },
          ]}
        />

        <CartWidget />

        {productState?.product[0] && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {/* <ProductDetailsCarousel product={product} /> */}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
                    product={productState?.product}
                    cart={productState?.checkout.cart}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: "background.neutral" }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    {productState?.product[0]?.description}
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!productState?.product && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}
