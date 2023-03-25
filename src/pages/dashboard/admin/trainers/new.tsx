import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";
import Layout from "../../../../layouts";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { Container } from "@mui/material";
import MemberNewEditForm from "../../../../sections/auth/dashboard/customer-list/MemberNewEditForm";
import TrainerNewEditForm from "../../../../sections/auth/dashboard/trainer-list/TrainerNewEditForm";
TrainerCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function TrainerCreate() {
  return (
    <Page title="Trainer: Create a new trainer">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Create a new trainer"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "Trainer", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "New Trainer" },
          ]}
        />
        <TrainerNewEditForm />
      </Container>
    </Page>
  );
}
