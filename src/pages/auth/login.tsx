import {
  Alert,
  Box,
  Card,
  Container,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Page from "../../components/Page";
import useResponsive from "../../hooks/useResponsive";
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/path";
import Logo from "../Logo";
import NextLink from "next/link";
import Image from "../../components/Image";
import LoginForm from "../../sections/auth/login/LoginForm";
import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingScreen";

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

export default function Login() {
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const { push } = useRouter();

  const autoLogin = async () => {
    try {
      const response = await refresh();
      console.log("response", response);
      if (response && auth?.role) {
        console.log("auth!!!!!!!!!!!!!!!!!!!!!", auth);
        push(`${PATH_DASHBOARD.dashboard[auth.role].root}`);
      }
    } catch (err) {
      console.log("catch err", err);
    }
  };
  // Call autoLogin when the component mounts
  useEffect(() => {
    autoLogin();
  }, []);

  useEffect(() => {
    !auth?.accessToken
      ? autoLogin()
      : push(PATH_DASHBOARD.dashboard[auth?.role].root);
  }, [refresh, auth, push]);
  return (
    <>
      <Page title="Login">
        <RootStyle>
          <HeaderStyle>
            <Box height="3rem" width="3rem">
              <Image disabledEffect src={`/assets/logo.png`} />
            </Box>
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Don’t have an account? {""}
                <NextLink href={PATH_AUTH.register} passHref>
                  <Link variant="subtitle2">Get started</Link>
                </NextLink>
              </Typography>
            )}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <Image
                visibleByDefault
                disabledEffect
                src="/assets/illustrations/illustration_login.png"
                alt="login"
              />
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Sign in to NepFit
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Enter your details below.
                  </Typography>
                </Box>
              </Stack>
              <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>me@mydomain.com</strong> / password :
                <strong>password123</strong>
              </Alert>

              <LoginForm />
              {!smUp && (
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{" "}
                  <NextLink href={PATH_AUTH.register} passHref>
                    <Link variant="subtitle2">Get started</Link>
                  </NextLink>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
      )
    </>
  );
}
