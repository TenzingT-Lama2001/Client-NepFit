import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import timeGridPlugin from "@fullcalendar/timegrid";

import { useState, useRef, useEffect } from "react";
// @mui
import {
  Card,
  Button,
  Container,
  DialogTitle,
  Box,
  Dialog,
  Paper,
} from "@mui/material";
import Layout from "../../../../layouts";
import useResponsive from "../../../../hooks/useResponsive";
import CalendarToolbar, {
  CalendarView,
} from "../../../../sections/auth/dashboard/calendar/CalendarToolbar";
import Page from "../../../../components/Page";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";
import Iconify from "../../../../components/Iconify";
import {
  CalendarForm,
  CalendarStyle,
} from "../../../../sections/auth/dashboard/calendar";
// redux

// sections

// ----------------------------------------------------------------------

Workout.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Workout() {
  const isDesktop = useResponsive("up", "sm");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const calendarRef = useRef<FullCalendar>(null);

  const [calendarState, setCalendarState] = useState({
    isLoading: false,
    error: null,
    open: false,
    selectedEventId: null,
    selectedRange: null,
    events: [],
  });
  const handleSelectRange = (arg: any) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    selectRange(arg.start, arg.end);
  };
  const selectRange = (start: any, end: any) => {
    setCalendarState((prevState: any) => ({
      ...prevState,
      open: true,
      selectedRange: { start: start.getTime(), end: end.getTime() },
    }));
  };

  //   getEvents,
  //   openModal,
  //   closeModal,
  //   updateEvent,
  //   selectEvent,
  //   selectRange,

  let eventGuid = 0;
  function createEventId() {
    return String(eventGuid++);
  }
  const handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  return (
    <Page title="Calendar">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Calendar"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Calendar" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={
                <Iconify icon={"eva:plus-fill"} width={20} height={20} />
              }
            >
              New Event
            </Button>
          }
        />

        <Card>
          <CalendarStyle>
            <FullCalendar
              editable={true}
              selectable={true}
              selectMirror={true}
              select={handleSelectRange}
              //   eventContent={renderEventContent} // custom render function
              //   eventClick={handleEventClick}
              //   eventsSet={handleEvents}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height={isDesktop ? 720 : "auto"}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
            />
          </CalendarStyle>
        </Card>

        <Dialog fullWidth maxWidth="xs" onClose={handleClose} open={open}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              onClick={handleClose}
              sx={{ width: "100%", height: "100%", position: "fixed" }}
            />
          </Box>
          <DialogTitle>Add Workout</DialogTitle>
          <CalendarForm
            event
            range={calendarState.selectedRange}
            onCancel={handleClose}
          />
        </Dialog>
      </Container>
    </Page>
  );
}
