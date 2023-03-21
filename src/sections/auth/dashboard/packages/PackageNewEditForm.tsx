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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RHFUploadAvatar } from "../../../../components/hook-form/RHFUpload";
import Iconify from "../../../../components/Iconify";
import axios from "axios";
import { Packages } from "../../../../pages/dashboard/admin/packages/list";
import RHFSelect from "../../../../components/hook-form/RHFSelect";
import { createPackage, updatePackage } from "../../../../api/packages";
type Props = {
  isEdit?: boolean;
  currentPackage?: Packages;
};

export const durationUnit = [
  {
    unit: "month",
    label: "month",
  },
  {
    unit: "months",
    label: "months",
  },
];

interface FormValuesProps extends Packages {}

export default function PackageNewEditForm({
  isEdit = false,
  currentPackage,
}: Props) {
  const { push, query } = useRouter();
  const { packageId } = query;
  const { enqueueSnackbar } = useSnackbar();
  console.log({ currentPackage });
  let NewPackageSchema;
  if (isEdit) {
    NewPackageSchema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      price: Yup.number(),
      duration: Yup.number(),
      durationUnit: Yup.string(),
    });
  } else {
    NewPackageSchema = Yup.object().shape({
      name: Yup.string().required("Package Name is required"),
      description: Yup.string().required("Package description is required"),
      price: Yup.number().required("Price is required"),
      duration: Yup.string().required("Duration is required"),
      durationUnit: Yup.string().required("Duration unit is required"),
    });
  }

  const defaultValues = useMemo(
    () => ({
      name: currentPackage?.name || "",
      description: currentPackage?.description || "",
      price: currentPackage?.price || "",
      duration: currentPackage?.duration || "",
      durationUnit: currentPackage?.durationUnit,
    }),
    [currentPackage]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewPackageSchema),
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

  useEffect(() => {
    if (isEdit && currentPackage) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPackage]);

  const updatePackageMutation = useMutation(
    (data: any) => updatePackage(packageId as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.dashboard.admin.packages.list);
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

  const createPackageMutation = useMutation(
    (data: any) => createPackage(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        console.log("package data", data);
        push(PATH_DASHBOARD.dashboard.admin.packages.list);
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
      console.log("SUBMITTED DATA", data);
      isEdit
        ? updatePackageMutation.mutate(data)
        : createPackageMutation.mutate(data);
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
              <RHFTextField name="name" label="Package Name" />
              <RHFTextField name="description" label="Package Description" />
              <RHFTextField name="price" label="Price" />
              <RHFTextField name="duration" label="Duration" />
              <RHFSelect
                name="durationUnit"
                label="Duration Unit"
                placeholder="Duration unit"
              >
                <option value="" />
                {durationUnit.map((option) => (
                  <option key={option.unit} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit ? "Create Package" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
