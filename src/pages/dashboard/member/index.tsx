import { Container, Grid, useTheme, Button } from "@mui/material";
import { SeoIllustration } from "../../../assets";
import Page from "../../../components/Page";
import RoleBasedGuard from "../../../guards/RoleBasedGuard";
import useRefreshToken from "../../../hooks/useRefreshToken";
import Layout from "../../../layouts";
import AppWelcome from "../../../sections/app/AppWelcome";
import AppWidgetSummary from "../../../sections/app/AppWidegetSummary";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../../../api/member";
import { getTrainers } from "../../../api/trainer";
import { getPrograms } from "../../../api/program";

MemberDashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function MemberDashboard() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const { data: members } = useQuery<any>(
    ["get_members"],
    () => getMembers({ order: "asc" }),
    {
      onSuccess(data) {
        console.log("member data", data);

        console.log("total members", data.totalMembers);
      },
    }
  );
  const { data: trainers } = useQuery<any>(
    ["get_trainers"],
    () => getTrainers({ order: "asc" }),
    {
      onSuccess(data) {
        console.log("trainers data", data);

        console.log("total members", data.totalTrainers);
      },
    }
  );
  const { data: programs } = useQuery<any>(
    ["get_programs"],
    () => getPrograms({ order: "asc" }),
    {
      onSuccess(data) {
        console.log("programs data", data);

        console.log("total members", data.totalPrograms);
      },
    }
  );
  return (
    <RoleBasedGuard roles={["member"]} hasContent>
      <Page title="Dashboard">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <AppWelcome
                title={`Welcome back ${auth?.name}`}
                description="This is the member dashboard"
                img={
                  <SeoIllustration
                    sx={{
                      p: 3,
                      width: 360,
                      m: { xs: "auto", md: "inherit" },
                    }}
                  />
                }
                action={
                  <Button variant="contained" onClick={() => refresh()}>
                    View for more info
                  </Button>
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <AppWidgetSummary
                title="Total members"
                total={members?.totalMembers}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppWidgetSummary
                title="Total trainers"
                total={trainers?.totalTrainers}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppWidgetSummary
                title="Total programs"
                total={programs?.totalPrograms}
              />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
