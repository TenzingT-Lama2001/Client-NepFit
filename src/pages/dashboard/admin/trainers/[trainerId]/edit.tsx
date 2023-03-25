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
TrainerEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function TrainerEdit() {
  const { query } = useRouter();
  const { trainerId } = query;

  const { data: singleTrainer } = useQuery<any>(["get_single_trainer"], () =>
    getTrainer(trainerId as string)
  );
  return (
    <Page title="Edit: Trainer">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit: Trainer"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "Trainer",
              href: PATH_DASHBOARD.dashboard.admin.trainers.list,
            },
            {
              name: `${singleTrainer && capitalCase(singleTrainer.firstName)}.`,
            },
          ]}
        />

        {singleTrainer && (
          <TrainerNewEditForm isEdit currentTrainer={singleTrainer} />
        )}
      </Container>
    </Page>
  );
}
