import { useEffect, useState } from "react";
import orderBy from "lodash/orderBy";
// form
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Stack } from "@mui/material";
import Layout from "../../../../layouts";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../../api/products";
import Page from "../../../../components/Page";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import ShopProductSearch from "../../../../sections/auth/dashboard/product/ShopProductSearch";
import { FormProvider } from "../../../../components/hook-form";
import ShopProductList from "../../../../sections/auth/dashboard/product/ShopProductList";
import CartWidget from "../../../../components/CartWidget";
import { PATH_DASHBOARD } from "../../../../routes/path";

ProductShop.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState(null);
  const [productsCount, setProductsCount] = useState(0);
  const defaultValues = {};

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    if (openFilter) {
      handleCloseFilter();
    }
    reset({
      gender: [],
      category: "All",
      colors: [],
      priceRange: [0, 200],
      rating: "",
    });
  };

  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ["get_products"],
    () =>
      getProducts({
        page: 0,
        order: "asc",
      }),
    {
      initialData: { results: [] },
      onSuccess({ products, totalProducts }) {
        console.log({ products });
        setProductsCount(totalProducts);
        setProducts(products);
      },
    }
  );

  return (
    <Page title="Ecommerce: Shop">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Shop"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "E-Commerce",
              href: PATH_DASHBOARD.dashboard.admin.root,
            },
            { name: "Shop" },
          ]}
        />

        {products ? (
          <ShopProductList products={products} loading={!productsCount} />
        ) : null}
        <CartWidget />
      </Container>
    </Page>
  );
}
