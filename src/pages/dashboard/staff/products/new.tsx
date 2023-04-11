// @mui
import { Container } from "@mui/material";
// routes

// hooks
import useSettings from "../../../../hooks/useSettings";
// layouts
import Layout from "../../../../layouts";
// components
import Page from "../../../../components/Page";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";
import ProductNewEditForm from "../../../../sections/auth/dashboard/product/ProductNewEditForm";
// sections

// ----------------------------------------------------------------------

ProductNew.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductNew() {
  return (
    <Page title="Product: Create a new product">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Create a new product"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "Product",
              href: PATH_DASHBOARD.dashboard.admin.products.list,
            },
            { name: "New product" },
          ]}
        />
        <ProductNewEditForm />
      </Container>
    </Page>
  );
}
