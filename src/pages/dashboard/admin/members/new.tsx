import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";
import Layout from "../../../../layouts";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { Container } from "@mui/material";
import MemberNewEditForm from "../../../../sections/auth/dashboard/customer-list/MemberNewEditForm";
MemberCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function MemberCreate() {
  return (
    <Page title="Member: Create a new member">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Create a new member"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "Member", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "New Member" },
          ]}
        />
        <MemberNewEditForm />
      </Container>
    </Page>
  );
}
