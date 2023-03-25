import * as Yup from "yup";
import merge from "lodash/merge";
import { isBefore } from "date-fns";
import { useSnackbar } from "notistack";

// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Box,
  Stack,
  Button,
  Tooltip,
  TextField,
  IconButton,
  DialogActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
// redux

import { RHFTextField, FormProvider } from "../../../../components/hook-form";
import Iconify from "../../../../components/Iconify";
// components

// ----------------------------------------------------------------------

const getInitialValues = (
  event: any,
  range: { start: Date; end: Date } | null
) => {
  const _event = {
    title: "",
    description: "",
    textColor: "#1890FF",
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

type FormValuesProps = {
  title: string;
  description: string;
  textColor: string;
  allDay: boolean;
  start: Date | null;
  end: Date | null;
};

type Props = {
  event: any;
  range: {
    start: Date;
    end: Date;
  } | null;
  onCancel: VoidFunction;
};

export default function CalendarForm({ event, range, onCancel }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const isCreating = event ? Object.keys(event).length === 0 : null;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required("Title is required"),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        textColor: data.textColor,
        allDay: data.allDay,
        start: data.start,
        end: data.end,
      };
      if (event.id) {
        enqueueSnackbar("Update success!");
        //updateEvent
      } else {
        enqueueSnackbar("Create success!");
        //createEvent
      }
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();

      enqueueSnackbar("Delete success!");
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="title" label="Title" />

        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
        />

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              label="Start date"
              inputFormat="dd/MM/yyyy hh:mm a"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />

        <Controller
          name="end"
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
                    isDateError && "End date must be later than start date"
                  }
                />
              )}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="Delete Event">
            <IconButton onClick={handleDelete}>
              <Iconify icon="eva:trash-2-outline" width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Add
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
