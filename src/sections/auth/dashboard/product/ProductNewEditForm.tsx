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

export type Product = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: {
    id: string;
    secure_url: string;
  };
  category: string;
  unit: string;
};
type Props = {
  isEdit?: boolean;
  currentProduct?: Product;
};

const CATEGORY_OPTION = [
  { group: "Clothing", classify: ["Shirts", "T-shirts", "Joggers", "Jackets"] },
  {
    group: "Supplements",
    classify: ["Protein", "Creatine", "Tablets", "Fat burners"],
  },
  {
    group: "Accessories",
    classify: ["Shoes", "Bands", "Jump rope", "Compressions"],
  },
];
export interface CustomFile extends File {
  path?: string;
  preview?: string | ArrayBuffer | null;
  lastModifiedDate?: Date;
}

interface FormValuesProps extends Omit<Product, "imageUrl"> {
  imageUrl: CustomFile | string | null;
}

export default function ProductNewEditForm({
  isEdit = false,
  currentProduct,
}: Props) {
  const [image, setImage] = useState<string | null>(null);
  const { push, query } = useRouter();
  const { productId } = query;
  const { enqueueSnackbar } = useSnackbar();

  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
  let NewProductSchema;
  if (isEdit) {
    NewProductSchema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      price: Yup.number(),
      quantity: Yup.number(),
      category: Yup.string(),
      unit: Yup.string(),
      imageUrl: Yup.string(),
    });
  } else {
    NewProductSchema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      price: Yup.number(),
      quantity: Yup.number(),
      category: Yup.string(),
      unit: Yup.string(),
      imageUrl: Yup.string(),
    });
  }

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
      imageUrl: currentProduct?.imageUrl?.secure_url || "",
      unit: currentProduct?.unit || "",
    }),
    [currentProduct]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
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
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);
  const updateProductMutation = useMutation(
    (data: any) => updateProduct(productId as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.dashboard.admin.products.list);
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
  const createProductMutation = useMutation(
    (data: any) => createProduct(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        push(PATH_DASHBOARD.dashboard.admin.products.list);
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
      const { name, description, price, quantity, category, unit } = data;

      const newData = { ...data, image };
      const newEditData = { ...data, image };

      isEdit
        ? updateProductMutation.mutate(newEditData)
        : createProductMutation.mutate(newData);
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
            "imageUrl",
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
              <RHFTextField name="name" label="Product Name" />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFTextField name="description" multiline rows={5} />
              </div>

              <div>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadSingleFile
                  name="imageUrl"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <RHFTextField name="quantity" label="Quantity" />

                <RHFTextField name="unit" label="Unit" />

                <RHFSelect name="category" label="Category">
                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </RHFSelect>
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Price"
                  placeholder="0.00"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                    type: "number",
                  }}
                />
              </Stack>
            </Card>

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {!isEdit ? "Create Product" : "Save Changes"}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
