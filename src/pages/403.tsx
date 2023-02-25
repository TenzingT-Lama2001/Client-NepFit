// next
import NextLink from "next/link";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Box, Typography, Container } from "@mui/material";
// layouts
import Layout from "../layouts";
// components
import Page from "../components/Page";

// assets
import { ForbiddenIllustration } from "../assets";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

Page403.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <Page title="403 Forbidden">
      <Container>
        <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
          <Box>
            <Typography variant="h3" paragraph>
              No permission
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "text.secondary" }}>
              The page you're trying access has restricted access.
              <br />
              Please refer to your system administrator
            </Typography>
          </Box>

          <Box>
            <ForbiddenIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />
          </Box>

          <NextLink href="/" passHref>
            <Button size="large" variant="contained">
              Go to Home
            </Button>
          </NextLink>
        </ContentStyle>
      </Container>
    </Page>
  );
}
