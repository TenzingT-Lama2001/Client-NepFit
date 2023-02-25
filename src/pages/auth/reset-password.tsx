import { Container, Typography, Button } from "@mui/material";
import Page from "../../components/Page";
import { PATH_AUTH } from "../../routes/path";
import NextLink from "next/link";
import styled from "@emotion/styled";
import ResetPasswordForm from "../../sections/auth/reset-password/ResetPasswordForm";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  // padding: theme.spacing(12, 0),
}));

export default function ResetPassword() {
  return (
    <Page title="Reset Password">
      <Container>
        <ContentStyle>
          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Typography>

          <ResetPasswordForm />
          <NextLink href={PATH_AUTH.login} passHref>
            <Button fullWidth size="large" sx={{ mt: 1 }}>
              Back
            </Button>
          </NextLink>
        </ContentStyle>
      </Container>
    </Page>
  );
}
