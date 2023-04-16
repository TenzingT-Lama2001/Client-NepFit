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
import { createProgram, updateProgram } from "../../../../api/program";

export type Program = {
  name: string;
  description: string;
  image: {
    id: string;
    secure_url: string;
  };
};
type Props = {
  isEdit?: boolean;
  currentProgram?: Program;
};

export interface CustomFile extends File {
  path?: string;
  preview?: string | ArrayBuffer | null;
  lastModifiedDate?: Date;
}

interface FormValuesProps extends Omit<Program, "image"> {
  image: CustomFile | string | null;
}

export default function ProgramNewEditForm({
  isEdit = false,
  currentProgram,
}: Props) {
  const [image, setImage] = useState<string | null>(null);
  const { push, query } = useRouter();
  const { programId } = query;
  const { enqueueSnackbar } = useSnackbar();

  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
  let NewProgramSchema;
  if (isEdit) {
    NewProgramSchema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      image: Yup.string(),
    });
  } else {
    NewProgramSchema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      image: Yup.string(),
    });
  }

  const defaultValues = useMemo(
    () => ({
      name: currentProgram?.name || "",
      description: currentProgram?.description || "",
      image: currentProgram?.image?.secure_url || "",
    }),
    [currentProgram]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProgramSchema),
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
    if (isEdit && currentProgram) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProgram]);
  const updateProgramMutation = useMutation(
    (data: any) => updateProgram(programId as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.dashboard.admin.programs.list);
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
  const createProgramMutation = useMutation(
    (data: any) => createProgram(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.dashboard.admin.programs.list);
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
      const { name, description } = data;

      const newData = { ...data, image };
      const newEditData = { ...data, image };

      isEdit
        ? updateProgramMutation.mutate(newEditData)
        : createProgramMutation.mutate(newData);
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
            "image",
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
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Program Name" />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFTextField name="description" multiline rows={5} />
              </div>

              <div>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadSingleFile
                  name="image"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </div>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {!isEdit ? "Create Program" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
