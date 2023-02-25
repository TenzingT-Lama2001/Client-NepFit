import { Container, Grid, useTheme, Button } from "@mui/material";
import { SeoIllustration } from "../../assets";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import Layout from "../../layouts";
import AppWelcome from "../../sections/app/AppWelcome";
import AppWidgetSummary from "../../sections/app/AppWidegetSummary";

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default function GeneralApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title="Welcome back Member"
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
              action={<Button variant="contained">View for more info</Button>}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total days remaining" total={3} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total days remaining" total={3} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total days remaining" total={3} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
