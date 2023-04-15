import { useRouter } from "next/router";
import NextLink from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "../../../components/hook-form";
import { Alert, IconButton, InputAdornment, Stack, Link } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/path";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "../../../api/auth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { useSnackbar } from "notistack";
import useAuth from "../../../hooks/useAuth";
import LoadingScreen from "../../../components/LoadingScreen";
import { getOneMembership } from "../../../api/membership";
import Cookies from "js-cookie";
type FormValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const isMountedRef = useIsMountedRef();
  const { auth, setAuth, setStripeDetails, setMembership, membership } =
    useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "me@mydomain.com",
    password: "password123",
    remember: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const loginMutation = useMutation((data: FormValuesProps) => login(data), {
    onSuccess(data) {
      console.log("LOGIN DATA!@@@@@@@@@@@@@@@@@", data);
      setAuth({
        id: data.user._id,
        name: data.user.firstName,
        email: data.user.email,
        role: data.user.role,
        accessToken: data.accessToken,
        status: data.user.status,
        address: data.user.address,
        avatarUrl: data.user.avatarUrl,
      });
      setStripeDetails((prev: any) => ({
        ...prev,
        stripeCustomerId: data.user.stripeCustomerId,
      }));
      setMembership({
        membershipId: data.membership._id,
        programId: data.membership.program,
        packageId: data.membership.packages,
        trainerId: data.membership.trainer,
      });
      console.log("MEMBERSHIP FROM LOGIN@@@@@@@@@@@@@@", { membership });
      enqueueSnackbar(data.message || "Login Successful");
      reset();
      if (auth?.role) {
        push(PATH_DASHBOARD.dashboard[auth?.role].root);
      } else {
        return <LoadingScreen />;
      }
    },
    onError(err: any) {
      console.log("in mutation");
      console.log("err", err);
      enqueueSnackbar(
        err.response.data.message ??
          err.message ??
          err.data.message ??
          "Something went wrong",
        { variant: "error" }
      );
    },
  });

  console.log({ auth });
  const onSubmit = async (data: FormValuesProps) => {
    try {
      loginMutation.mutate(data);
    } catch (error: any) {
      console.log({ error });

      if (isMountedRef.current) {
        setError("afterSubmit", {
          ...error,
          message: error.response.data.message ?? error.message,
        });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
