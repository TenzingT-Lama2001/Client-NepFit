import { Card, styled, Typography, Link, Container, Box } from "@mui/material";
import Page from "../../components/Page";
import useResponsive from "../../hooks/useResponsive";
import { PATH_AUTH } from "../../routes/path";
import Logo from "../Logo";
import NextLink from "next/link";
import Image from "../../components/Image";
import RegisterForm from "../../sections/auth/register/RegisterForm";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function Register() {
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          {/* <Logo /> */}
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account?
              <NextLink href={PATH_AUTH.login} passHref>
                <Link variant="subtitle2">Login</Link>
              </NextLink>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Registration is just a click away
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="register"
              src="/assets/illustrations/illustration_register.png"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Join the community today.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  No more waiting. Start your journey
                </Typography>
              </Box>
            </Box>
            <RegisterForm />
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary" }}
            >
              By registering, I agree to NepFit&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              {""}and{""}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account?
                <NextLink href={PATH_AUTH.login} passHref>
                  <Link variant="subtitle2">Login</Link>
                </NextLink>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
