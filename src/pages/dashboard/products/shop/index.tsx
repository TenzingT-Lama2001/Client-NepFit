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

  // const { products, sortBy, filters } = useSelector((state) => state.product);

  // const filteredProducts = applyFilter(products, sortBy, filters);
  const [products, setProducts] = useState(null);
  const [productsCount, setProductsCount] = useState(0);
  const defaultValues = {
    // gender: filters.gender,
    // category: filters.category,
    // colors: filters.colors,
    // priceRange: filters.priceRange,
    // rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  // const min = values.priceRange[0];

  // const max = values.priceRange[1];

  // const isDefault =
  //   min === 0 &&
  //   max === 200 &&
  //   !values.rating &&
  //   values.gender.length === 0 &&
  //   values.colors.length === 0 &&
  //   values.category === "All";

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

  // const handleRemoveCategory = () => {
  //   setValue("category", "All");
  // };

  // const handleRemovePrice = () => {
  //   setValue("priceRange", [0, 200]);
  // };

  // const handleRemoveRating = () => {
  //   setValue("rating", "");
  // };

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

        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              {/* <ShopFilterSidebar
                isDefault={isDefault}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetAll={handleResetFilter}
              /> */}
            </FormProvider>

            {/* <ShopProductSort /> */}
          </Stack>
        </Stack>

        {/* <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{filteredProducts.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack> */}

        {products ? (
          <ShopProductList products={products} loading={!productsCount} />
        ) : null}
        <CartWidget />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

// function applyFilter(
//   products: Product[],
//   sortBy: string | null,
//   filters: ProductFilter
// ) {
//   // SORT BY
//   if (sortBy === "featured") {
//     products = orderBy(products, ["sold"], ["desc"]);
//   }
//   if (sortBy === "newest") {
//     products = orderBy(products, ["createdAt"], ["desc"]);
//   }
//   if (sortBy === "priceDesc") {
//     products = orderBy(products, ["price"], ["desc"]);
//   }
//   if (sortBy === "priceAsc") {
//     products = orderBy(products, ["price"], ["asc"]);
//   }
//   // FILTER PRODUCTS
//   if (filters.gender.length > 0) {
//     products = products.filter((product) =>
//       filters.gender.includes(product.gender)
//     );
//   }
//   if (filters.category !== "All") {
//     products = products.filter(
//       (product) => product.category === filters.category
//     );
//   }
//   if (filters.colors.length > 0) {
//     products = products.filter((product) =>
//       product.colors.some((color: any) => filters.colors.includes(color))
//     );
//   }

//   const min = filters.priceRange[0];
//   const max = filters.priceRange[1];

//   if (min !== 0 || max !== 200) {
//     products = products.filter(
//       (product) => product.price >= min && product.price <= max
//     );
//   }

//   if (filters.rating) {
//     products = products.filter((product) => {
//       const convertRating = (value: string) => {
//         if (value === "up4Star") return 4;
//         if (value === "up3Star") return 3;
//         if (value === "up2Star") return 2;
//         return 1;
//       };
//       return product.totalRating > convertRating(filters.rating);
//     });
//   }
//   return products;
// }
