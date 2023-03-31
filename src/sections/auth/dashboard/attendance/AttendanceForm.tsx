import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Member } from "../../../../pages/dashboard/admin/members/list2";
import * as Yup from "yup";
import { isBefore } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
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
  TextField,
  TextFieldProps,
  Container,
  CardHeader,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { RHFUploadAvatar } from "../../../../components/hook-form/RHFUpload";
import Iconify from "../../../../components/Iconify";
import axios from "axios";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

import { createStaff, updateStaff } from "../../../../api/staff";
import { createAttendance } from "../../../../api/attendance";

export type Attendance = {
  memberId: string;
  date: Date;
  is_present: Boolean;
};

export interface CustomFile extends File {
  path?: string;
  preview?: string | ArrayBuffer | null;
  lastModifiedDate?: Date;
}

interface FormValuesProps extends Attendance {}

export default function Attendance() {
  const [image, setImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { push, query } = useRouter();
  const { staffId } = query;
  const { enqueueSnackbar } = useSnackbar();

  let AttendanceSchema = Yup.object().shape({
    memberId: Yup.string(),
    date: Yup.date(),
    is_present: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      memberId: "",
      date: new Date(),
      is_present: "",
    }),
    []
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(AttendanceSchema),
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

  const createAttendanceMutation = useMutation(
    (data: any) => createAttendance(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.dashboard.admin.staffs.list);
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
    }
  );

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log("onSubmit data", data);
      const { memberId, date, is_present } = data;

      createAttendanceMutation.mutate(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
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
                Create Staff
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
