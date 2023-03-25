// @mui
import { Container, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../../../../api/programs";
import { getTrainers } from "../../../../api/trainer";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";

import Layout from "../../../../layouts";
import { PATH_DASHBOARD } from "../../../../routes/path";
import ProgramCard from "../../../../sections/auth/dashboard/programs/ProgramCard";
import TrainerCard from "../../../../sections/auth/dashboard/trainer-list/TrainerCard";

// sections

// ----------------------------------------------------------------------

TrainersList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TrainersList() {
  const {
    data: { trainers },
    isLoading,
    refetch,
  } = useQuery<any>(
    ["get_trainers"],
    () =>
      getTrainers({
        page: "",
        limit: "",
        searchQuery: "",
        sortBy: "",
        order: "asc",
      }),
    {
      initialData: { results: [] },
      onSuccess(data) {
        console.log("TRAINERS DATA!!!!!!!!!!!!!!!!!!!!", data);
      },
    }
  );
  return (
    <Page title="Trainers: List">
      <Container>
        <HeaderBreadcrumbs
          heading="Trainers List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.member.root },
            {
              name: "Trainers",
              href: PATH_DASHBOARD.dashboard.member.trainers,
            },
            { name: "List" },
          ]}
        />

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {trainers?.map((trainer: any) => (
            <TrainerCard key={trainer._id} trainer={trainer} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
