import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Member } from "../../../../pages/dashboard/admin/members/list2";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createMember, updateMember } from "../../../../api/member";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { FormProvider, RHFTextField } from "../../../../components/hook-form";
import {
  Grid,
  Card,
  Box,
  Typography,
  Stack,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RHFUploadAvatar } from "../../../../components/hook-form/RHFUpload";
import Iconify from "../../../../components/Iconify";

import Label from "../../../../components/Label";
import { Theme } from "@fullcalendar/core/internal";
import useRefreshToken from "../../../../hooks/useRefreshToken";

type Props = {
  isEdit?: boolean;
  currentMember?: Member;
};
export interface CustomFile extends File {
  path?: string;
  preview?: string | ArrayBuffer | null;
  lastModifiedDate?: Date;
}

interface FormValuesProps extends Omit<Member, "avatarUrl"> {
  avatarUrl: CustomFile | string | null;
}

export default function MemberEditProfile({
  isEdit = false,
  currentMember,
}: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { push, query } = useRouter();
  const { memberId } = query;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  let NewMemberSchema;
  if (isEdit) {
    NewMemberSchema = Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string(),
      address: Yup.string(),
      phoneNumber: Yup.string(),
      role: Yup.string().oneOf(["member"], 'Role must be "member"'),
      avatarUrl: Yup.string(),
    });
  } else {
    NewMemberSchema = Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().required("Email is required").email(),
      password: Yup.string().required("Password is required"),
      address: Yup.string(),
      phoneNumber: Yup.string(),
      role: Yup.string()
        .required("Role is required")
        .oneOf(["member"], 'Role must be "member"'),
      avatarUrl: Yup.string(),
    });
  }

  const defaultValues = useMemo(
    () => ({
      firstName: currentMember?.firstName || "",
      lastName: currentMember?.lastName || "",
      email: currentMember?.email || "",
      phoneNumber: currentMember?.phoneNumber || "",
      status: currentMember?.status,
      role: "member",
      address: currentMember?.address || "",
      avatarUrl: currentMember?.avatarUrl?.secure_url || "",
      password: currentMember?.password || "",
    }),
    [currentMember]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewMemberSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const refresh = useRefreshToken();
  useEffect(() => {
    if (isEdit && currentMember) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentMember]);

  const updateMemberMutation = useMutation(
    (data: any) => updateMember(memberId as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        refresh();
        push(PATH_DASHBOARD.dashboard.member.root);
      },
      onError(err: any) {
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

  const createMemberMutation = useMutation((data: any) => createMember(data), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      push(PATH_DASHBOARD.dashboard.member.root);
      reset();
    },
    onError(err: any) {
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
      console.log("onSubmit data", data);
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
        address,
      } = data;

      const newData = { ...data, image };
      const newEditData = { ...data, image };

      console.log("SUBMITTED EDI TDATA", newEditData);
      isEdit
        ? updateMemberMutation.mutate(newEditData)
        : createMemberMutation.mutate(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64data = reader.result as string;

          console.log("typeof base64", typeof base64data);

          console.log({ base64data });
          setImage(base64data);
          console.log({ image });
          setValue(
            "avatarUrl",
            Object.assign(file, {
              preview: base64data,
            })
          );
        };
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 7, px: 3, position: "relative" }}>
            {isEdit && (
              <Label
                variant={theme.palette.mode === "light" ? "ghost" : "filled"}
                color={
                  currentMember?.status
                    ? "Active" && "success"
                    : "Inactive" && "error"
                }
                sx={{
                  textTransform: "uppercase",
                  position: "absolute",
                  top: 24,
                  right: 24,
                }}
              >
                {currentMember?.status ? currentMember?.status : "Inactive"}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Profile Picture
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1,1fr)",
                  sm: "repeat(2,1fr)",
                },
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email" />
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
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="role" label="Role" disabled />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit ? "Create Member" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
