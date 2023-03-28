import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";
import Layout from "../../../../layouts";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { Container } from "@mui/material";
import MemberNewEditForm from "../../../../sections/auth/dashboard/customer-list/MemberNewEditForm";
import TrainerNewEditForm from "../../../../sections/auth/dashboard/trainer-list/TrainerNewEditForm";
import StaffNewEditForm from "../../../../sections/auth/dashboard/staff-list/StaffNewEditForm";
StaffCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function StaffCreate() {
  return (
    <Page title="Staff: Create a new Staff">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Create a new Staff"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "Staff", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "New Staff" },
          ]}
        />
        <StaffNewEditForm />
      </Container>
    </Page>
  );
}
