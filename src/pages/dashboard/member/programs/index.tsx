// @mui
import { Container, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../../../../api/programs";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";

import Layout from "../../../../layouts";
import { PATH_DASHBOARD } from "../../../../routes/path";
import ProgramCard from "../../../../sections/auth/dashboard/programs/ProgramCard";

// sections

// ----------------------------------------------------------------------

ProgramsList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProgramsList() {
  const {
    data: { programs },
    isLoading,
    refetch,
  } = useQuery<any>(["get_programs"], () => getPrograms(), {
    initialData: { results: [] },
    onSuccess(data) {
      console.log("PROGRAM DATA!!!!!!!!!!!!!!!!!!!!", data);
    },
  });
  return (
    <Page title="Programs: List">
      <Container>
        <HeaderBreadcrumbs
          heading="Programs List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.member.root },
            {
              name: "Programs",
              href: PATH_DASHBOARD.dashboard.member.programs,
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
          {programs?.map((program: any) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
