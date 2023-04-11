import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Member } from "../../../../pages/dashboard/admin/members/list2";
import * as Yup from "yup";
import { isBefore } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
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

import {
  RHFUploadAvatar,
  RHFUploadSingleFile,
} from "../../../../components/hook-form/RHFUpload";
import Iconify from "../../../../components/Iconify";
import axios from "axios";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import RHFSelect from "../../../../components/hook-form/RHFSelect";
import { createProduct, updateProduct } from "../../../../api/products";
import useAuth from "../../../../hooks/useAuth";
import { createReport, getMembersByTrainerId } from "../../../../api/report";

export type Report = {
  member: string;
  trainer: string;
  introduction: string;
  workout: string;
  progress: string;
  conclusion: string;
};
type Props = {
  isEdit?: boolean;
  currentReport?: Report;
};

interface FormValuesProps extends Report {}

export default function ReportNewEditForm({
  isEdit = false,
  currentReport,
}: Props) {
  const { push, query } = useRouter();
  const { auth } = useAuth();
  const trainerId = auth?.id;
  const { productId } = query;
  const { enqueueSnackbar } = useSnackbar();
  const [url, setUrl] = useState("");
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
  let NewReportSchema;
  if (isEdit) {
    NewReportSchema = Yup.object().shape({
      member: Yup.string(),
      trainer: Yup.string(),
      introduction: Yup.string(),
      workout: Yup.string(),
      progress: Yup.string(),
      conclusion: Yup.string(),
    });
  } else {
    NewReportSchema = Yup.object().shape({
      member: Yup.string(),
      trainer: Yup.string(),
      introduction: Yup.string(),
      workout: Yup.string(),
      progress: Yup.string(),
      conclusion: Yup.string(),
    });
  }
  const { data: members } = useQuery(
    ["get_members_membership"],
    () => getMembersByTrainerId(auth?.id as string),
    {}
  );
  const defaultValues = useMemo(
    () => ({
      member: currentReport?.member || members?.members[0]?.email,
      trainer: currentReport?.trainer,
      introduction: currentReport?.introduction,
      workout: currentReport?.workout,
      progress: currentReport?.progress,
      conclusion: currentReport?.conclusion,
    }),
    [members]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewReportSchema),
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

  useEffect(() => {
    if (isEdit && currentReport) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentReport]);

  const createReportMutation = useMutation((data: any) => createReport(data), {
    onSuccess(data) {
      console.log(data);
      enqueueSnackbar(data.message);

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
      const reportData = {
        ...data,
        trainer: trainerId,
      };
      console.log(data);
      console.log(reportData);
      createReportMutation.mutate(reportData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField
                name="introduction"
                label="Introduction"
                multiline
                rows={4}
              />
              <div>
                <LabelStyle>Workout</LabelStyle>
                <RHFTextField name="workout" multiline rows={5} />
              </div>

              <div>
                <LabelStyle>Progress</LabelStyle>
                <RHFTextField name="progress" multiline rows={5} />
              </div>
              <div>
                <LabelStyle>Conclusion</LabelStyle>
                <RHFTextField name="conclusion" multiline rows={5} />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                {members?.members[0] && (
                  <RHFSelect name="member" label="Member">
                    {members?.members?.map((member: any) => (
                      <option key={member.email} value={member.email}>
                        {member.email}
                      </option>
                    ))}
                  </RHFSelect>
                )}
              </Stack>
            </Card>

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? "Create Report" : "Save Changes"}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
