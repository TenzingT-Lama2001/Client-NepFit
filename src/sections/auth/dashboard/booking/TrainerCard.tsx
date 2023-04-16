// @mui
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  Avatar,
  Divider,
  Typography,
  Stack,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";
// utils
import cssStyles from "../../../../utils/cssStyles";
import * as Yup from "yup";
// @types

// components
import Image from "../../../../components/Image";
import SvgIconStyle from "../../../../components/SvgIconStyle";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../../../hooks/useAuth";

import { useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, RHFTextField } from "../../../../components/hook-form";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { isBefore } from "date-fns";
import { createBooking } from "../../../../api/booking";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
// ----------------------------------------------------------------------

export const OverlayStyle = styled("div")(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 1, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
}));

// ----------------------------------------------------------------------
export interface IBooking {
  member: string;
  trainer: string;
  startDate: Date;
  endDate: Date;
  address: string;
  status: "declined" | "approved" | "pending";
}
export default function TrainerCard({ trainer }: any) {
  const { _id, firstName, lastName, avatarUrl, email, classTime } = trainer;
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOnClick = async () => {};

  interface FormValuesProps
    extends Pick<IBooking, "trainer" | "startDate" | "endDate" | "address"> {}
  let NewBookingSchema = Yup.object().shape({
    trainer: Yup.string().required("Trainer Name is required"),
    address: Yup.string().required("Address is required"),
    date: Yup.date(),
  });

  const defaultValues = useMemo(
    () => ({
      trainer: `${firstName}${lastName}`,
      address: "",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
    }),
    []
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBookingSchema),
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
  const isDateError = isBefore(
    new Date(values.endDate),
    new Date(values.startDate)
  );

  const createBookingMutation = useMutation(
    (data: any) => createBooking(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        console.log("booking data", data);
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
      const bookingData = {
        trainer: _id,
        member: auth?.id,
        startDate: data.startDate,
        endDate: data.endDate,
        address: data.address,
      };
      createBookingMutation.mutate(bookingData);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <Avatar
          alt={firstName}
          src={avatarUrl?.secure_url}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
          }}
        />
        <OverlayStyle />
        <Image
          src={avatarUrl?.secure_url}
          alt={avatarUrl?.secure_url}
          ratio="16/9"
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        {firstName}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: "2rem" }}>
        {lastName}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: "2rem" }}>
        {email}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: "2rem" }}>
        {classTime}
      </Typography>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Button
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: "1rem", mb: "5px" }}
        onClick={handleClickOpen}
      >
        Book Trainer
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Book a trainer</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
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
                    <RHFTextField name="trainer" label="Trainer" fullWidth />
                    <RHFTextField name="address" label="Address" fullWidth />
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => (
                        <MobileDateTimePicker
                          {...field}
                          label="Start date"
                          inputFormat="dd/MM/yyyy hh:mm a"
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      )}
                    />

                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field }) => (
                        <MobileDateTimePicker
                          {...field}
                          label="End date"
                          inputFormat="dd/MM/yyyy hh:mm a"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              error={!!isDateError}
                              helperText={
                                isDateError &&
                                "End date must be later than start date"
                              }
                            />
                          )}
                        />
                      )}
                    />
                  </Box>

                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Book
                    </LoadingButton>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </Card>
  );
}
