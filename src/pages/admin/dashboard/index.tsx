import { Container, Grid, useTheme, Button } from "@mui/material";
import { SeoIllustration } from "../../../assets";
import Page from "../../../components/Page";
import Layout from "../../../layouts";
import AppWelcome from "../../../sections/app/AppWelcome";
import AppWidgetSummary from "../../../sections/app/AppWidegetSummary";

AdminDashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default function AdminDashboard() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title="Welcome back Admin"
              description="This is the Admin dashboard"
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
            <AppWidgetSummary title="Total members" total={13} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total trainers" total={5} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total staffs" total={50} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
