import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";
import Layout from "../../../../layouts";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { Container } from "@mui/material";
import PackageNewEditForm from "../../../../sections/auth/dashboard/packages/PackageNewEditForm";

PackageCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function PackageCreate() {
  return (
    <Page title="Package: Create a new package">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Create a new package"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "Package", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "New Package" },
          ]}
        />
        <PackageNewEditForm />
      </Container>
    </Page>
  );
}
