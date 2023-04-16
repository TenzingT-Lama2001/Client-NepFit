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
import ProgramNewEditForm from "../../../../sections/auth/dashboard/program/ProgramNewEditForm";
// sections

// ----------------------------------------------------------------------

ProgramNew.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProgramNew() {
  return (
    <Page title="Program: Create a new program">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Create a new program"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "program",
              href: PATH_DASHBOARD.dashboard.admin.programs.list,
            },
            { name: "New program" },
          ]}
        />
        <ProgramNewEditForm />
      </Container>
    </Page>
  );
}
