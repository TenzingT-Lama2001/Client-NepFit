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
import TrainerNewEditForm from "../../../../../sections/auth/dashboard/trainer-list/TrainerNewEditForm";
import { getTrainer } from "../../../../../api/trainer";
import StaffNewEditForm from "../../../../../sections/auth/dashboard/staff-list/StaffNewEditForm";
StaffEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function StaffEdit() {
  const { query } = useRouter();
  const { trainerId } = query;

  const { data: singleTrainer } = useQuery<any>(["get_single_trainer"], () =>
    getTrainer(trainerId as string)
  );
  return (
    <Page title="Edit: Staff">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit: Staff"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "Staff",
              href: PATH_DASHBOARD.dashboard.admin.trainers.list,
            },
            {
              name: `${singleTrainer && capitalCase(singleTrainer.firstName)}.`,
            },
          ]}
        />

        {singleTrainer && (
          <StaffNewEditForm isEdit currentStaff={singleTrainer} />
        )}
      </Container>
    </Page>
  );
}
