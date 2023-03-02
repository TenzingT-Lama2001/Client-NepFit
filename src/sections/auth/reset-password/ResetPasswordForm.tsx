import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { PATH_AUTH } from "../../../routes/path";
import { useSnackbar } from "notistack";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";

type FormValuesProps = {
  email: string;
};
export default function ResetPasswordForm() {
  const { push } = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "me@mydomain.com" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  //   const mutation = useMutation(
  //     (values: FormValuesProps) => forgotPassword(values),
  //     {
  //       onSuccess(data) {
  //         console.log({ data });
  //         // enqueueSnackbar(data.data.message)
  //       },
  //       onerror(err: any) {
  //         console.log(err);
  //       }
  //     }
  //   );

  const onSubmit = async (data: FormValuesProps) => {};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Send Request
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
