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
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../api/auth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { useSnackbar } from "notistack";
import useAuth from "../../../hooks/useAuth";
type FormValuesProps = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const isMountedRef = useIsMountedRef();
  const { setAuth } = useAuth();
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
      console.log("login data", data);
      setAuth({
        name: data.user.first_name,
        email: data.user.email,
        role: data.user.role,
        accessToken: data.accessToken,
      });
      enqueueSnackbar(data.message || "Login Successful");
      reset();
      push(PATH_DASHBOARD.dashboard.member.root);
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
