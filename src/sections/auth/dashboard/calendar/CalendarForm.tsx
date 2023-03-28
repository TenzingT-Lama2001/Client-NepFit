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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../../../../api/workout";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { useRouter } from "next/router";
import useAuth from "../../../../hooks/useAuth";
import { EventInput } from "@fullcalendar/core";
import ColorSinglePicker from "../../../../components/ColorSinglePicker";

// components

// ----------------------------------------------------------------------
const COLOR_OPTIONS = [
  "#00AB55", // theme.palette.primary.main,
  "#1890FF", // theme.palette.info.main,
  "#54D62C", // theme.palette.success.main,
  "#FFC107", // theme.palette.warning.main,
  "#FF4842", // theme.palette.error.main
  "#04297A", // theme.palette.info.darker
  "#7A0C2E", // theme.palette.error.darker
];
const getInitialValues = (
  event: EventInput,
  range: { start: Date; end: Date } | null
) => {
  const _event = {
    title: "",
    description: "",
    textColor: "#1890FF",
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
  start: Date | null;
  end: Date | null;
  textColor: string;
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
  console.log("event in calendar form", event);
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const isCreating = event ? Object.keys(event).length === 0 : null;
  const { auth, calendarState, setCalendarState } = useAuth();
  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required("Title is required"),
    description: Yup.string().max(5000),
  });
  const role = auth?.role;
  console.log({ role });
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

  const createWorkoutMutation = useMutation(
    (data: any) => createWorkout(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        console.log("workout", data.workout);
        const { workout } = data;
        console.log({ workout });
        setCalendarState((prevState: any) => ({
          ...prevState,
          isLoading: false,
          events: [...prevState.events, workout],
        }));
        console.log({ calendarState });

        // push(PATH_DASHBOARD.dashboard.trainer.root);
        // reset();
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

  const id = event._id;
  // const deleteMemberMutation = useMutation((id: any) => deleteWorkout(id), {
  //   onSuccess(data: any) {
  //     enqueueSnackbar(data.message);
  //     const { workout } = data;
  //     const deleteEvent = calendarState?.events?.filter((event) => {
  //       if (event?._id !== workout?._id) {
  //         return workout;
  //       }
  //       return event;
  //     });

  //     setCalendarState((prevState: any) => ({
  //       ...prevState,
  //       isLoading: false,
  //       events: deleteEvent,
  //     }));
  //     console.log({ calendarState });

  //     // push(PATH_DASHBOARD.dashboard.trainer.root);
  //     // reset();
  //   },
  //   onError(err: any) {
  //     enqueueSnackbar(
  //       err.message ??
  //         err.response.data.message ??
  //         err.data.message ??
  //         "Something went wrong"
  //     );
  //   },
  // });
  const deleteWorkoutMutation = useMutation((id: any) => deleteWorkout(id), {
    onSuccess(data: any) {
      enqueueSnackbar(data.message);
      const { workout } = data;
      console.log("workout", workout);
      const deleteEvent = calendarState?.events?.filter(
        (event) => event._id !== workout._id
      );

      setCalendarState((prevState: any) => ({
        ...prevState,
        isLoading: false,
        events: deleteEvent,
      }));
      console.log({ calendarState });

      // push(PATH_DASHBOARD.dashboard.trainer.root);
      // reset();
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
  const updateWorkoutMutation = useMutation(
    (data: any) => updateWorkout(event._id as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        console.log({ data });
        console.log("workout", data.workout);
        const { workout } = data;
        console.log({ workout });

        const updateEvent = calendarState?.events?.map((_event) => {
          console.log(workout._id);
          console.log(_event._id);
          if (_event?._id === workout?._id) {
            return workout;
          }
          return _event;
        });
        console.log({ updateEvent });
        setCalendarState((prevState: any) => ({
          ...prevState,
          isLoading: false,
          events: updateEvent,
        }));
        console.log({ calendarState });

        // push(PATH_DASHBOARD.dashboard.trainer.root);
        // reset();
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
      const newEvent = {
        title: data.title,
        description: data.description,
        start: data.start,
        end: data.end,
        textColor: data.textColor,
      };

      if (event?._id) {
        const updateData = {
          ...newEvent,
          trainerId: auth?.id,
        };

        updateWorkoutMutation.mutate(updateData);
        // enqueueSnackbar("Update success!");
        //updateEvent
      } else {
        const newData = {
          ...newEvent,
          trainerId: auth?.id,
        };
        createWorkoutMutation.mutate(newData);

        //createEvent
      }
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    console.log("inside handle delete");
    if (!event._id) return;
    try {
      onCancel();
      console.log("inside handle delete try");
      deleteWorkoutMutation.mutate(event._id);
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="title" label="Title" disabled={role === "member"} />

        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
          disabled={role === "member"}
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
              disabled={role === "member"}
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
                  disabled={role === "member"}
                  helperText={
                    isDateError && "End date must be later than start date"
                  }
                />
              )}
            />
          )}
        />
      </Stack>
      <Controller
        name="textColor"
        control={control}
        render={({ field }) => (
          <ColorSinglePicker
            value={field.value}
            onChange={field.onChange}
            colors={COLOR_OPTIONS}
          />
        )}
      />

      <DialogActions>
        {!isCreating &&
          (role === "trainer" ? (
            <Tooltip title="Delete Workout">
              <IconButton onClick={() => handleDelete()}>
                <Iconify icon="eva:trash-2-outline" width={20} height={20} />
              </IconButton>
            </Tooltip>
          ) : null)}
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        {role === "trainer" ? (
          event._id ? (
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Update
            </LoadingButton>
          ) : (
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Add
            </LoadingButton>
          )
        ) : null}
      </DialogActions>
    </FormProvider>
  );
}
