import { Container, Grid, useTheme, Button } from "@mui/material";
import { SeoIllustration } from "../../../assets";
import Page from "../../../components/Page";
import RoleBasedGuard from "../../../guards/RoleBasedGuard";
import Layout from "../../../layouts";
import AppWelcome from "../../../sections/app/AppWelcome";
import AppWidgetSummary from "../../../sections/app/AppWidegetSummary";
import useAuth from "../../../hooks/useAuth";

StaffDashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default function StaffDashboard() {
  const { auth } = useAuth();
  return (
    <RoleBasedGuard roles={["staff"]} hasContent>
      <Page title="Dashboard">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <AppWelcome
                title={`Welcome back ${auth?.name}`}
                description="This is the Staff dashboard"
                img={
                  <SeoIllustration
                    sx={{
                      p: 3,
                      width: 360,
                      m: { xs: "auto", md: "inherit" },
                    }}
                  />
                }
                action={<Button variant="contained">View for more info</Button>}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <AppWidgetSummary title="Total members " total={3} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppWidgetSummary title="Total trainers" total={2} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppWidgetSummary title="Total staffs" total={1} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
