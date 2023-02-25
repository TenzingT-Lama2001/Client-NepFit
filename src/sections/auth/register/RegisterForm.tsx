import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import Stack from "@mui/material/Stack";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import Iconify from "../../../components/Iconify";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../../api/auth";
import { useRouter } from "next/router";
import { PATH_AUTH } from "../../../routes/path";

type FormValuesProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
};
export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const registerMutation = useMutation(
    (data: FormValuesProps) => register(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message || "Registration Successful");
        reset();
        push(PATH_AUTH.login);
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
    }
  );
  const onSubmit = async (data: FormValuesProps) => {
    try {
      registerMutation.mutate(data);
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

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
