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
import ReportNewEditForm from "../../../../sections/auth/dashboard/report/ReportNewEditForm";
// sections

// ----------------------------------------------------------------------

ReportNew.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ReportNew() {
  return (
    <Page title="report: Create a new report">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Create a new report"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "report",
              href: PATH_DASHBOARD.dashboard.trainer.report.list,
            },
            { name: "New report" },
          ]}
        />
        <ReportNewEditForm />
      </Container>
    </Page>
  );
}
