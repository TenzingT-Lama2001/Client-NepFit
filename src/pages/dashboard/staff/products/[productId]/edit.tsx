import { Container, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getMember } from "../../../../../api/member";
import HeaderBreadcrumbs from "../../../../../components/HeaderBreadcrumbs";
import Page from "../../../../../components/Page";
import Layout from "../../../../../layouts";
import { PATH_DASHBOARD } from "../../../../../routes/path";
import MemberNewEditForm from "../../../../../sections/auth/dashboard/customer-list/MemberNewEditForm";
import { capitalCase } from "change-case";
import { getOnePackage } from "../../../../../api/packages";
import PackageNewEditForm from "../../../../../sections/auth/dashboard/packages/PackageNewEditForm";
import { getOneProduct } from "../../../../../api/products";
import ProductNewEditForm from "../../../../../sections/auth/dashboard/product/ProductNewEditForm";
ProductEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function ProductEdit() {
  const { query } = useRouter();
  const { productId } = query;
  console.log({ productId });
  const { data: singleProduct } = useQuery<any>(["get_single_product"], () =>
    getOneProduct(productId as string)
  );
  console.log({ singleProduct });
  return (
    <Page title="Edit: Product">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit: Product"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "Product",
              href: PATH_DASHBOARD.dashboard.admin.products.list,
            },
            {
              name: `${singleProduct && capitalCase(singleProduct.name)}.`,
            },
          ]}
        />

        {singleProduct && (
          <ProductNewEditForm isEdit currentProduct={singleProduct} />
        )}
      </Container>
    </Page>
  );
}
