import { Container, Grid, useTheme, Button } from "@mui/material";
import { SeoIllustration } from "../../../assets";
import Page from "../../../components/Page";
import RoleBasedGuard from "../../../guards/RoleBasedGuard";
import Layout from "../../../layouts";
import AppWelcome from "../../../sections/app/AppWelcome";
import AppWidgetSummary from "../../../sections/app/AppWidegetSummary";

Trainer.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default function Trainer() {
  return (
    <RoleBasedGuard roles={["trainer"]} hasContent>
      <Page title="Dashboard">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <AppWelcome
                title="Welcome back Trainer"
                description="This is the Trainer dashboard"
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
              <AppWidgetSummary title="Total members " total={50} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppWidgetSummary title="Total trainers" total={5} />
            </Grid>
            <Grid item xs={12} md={4}>
              <AppWidgetSummary title="Total members" total={32} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
