import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
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
  CalendarState,
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
  const calendarRef = useRef<FullCalendar>(null);

  const [date, setDate] = useState(new Date());

  const [view, setView] = useState<CalendarView>(
    isDesktop ? "dayGridMonth" : "listWeek"
  );

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? "dayGridMonth" : "listWeek";
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);
  const [calendarState, setCalendarState] = useState({
    isLoading: false,
    error: null,
    events: [],
    isOpenModal: false,
    selectedEventId: null,
    selectedRange: null,
  });

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };
  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };
  const selectedEventSelector = () => {
    const { events, selectedEventId } = calendarState;
    if (selectedEventId) {
      return events.find((_event: any) => _event.id === selectedEventId);
    }
    return null;
  };

  const selectedEvent = selectedEventSelector();
  function getEventsSuccess(payload: any) {
    setCalendarState((prevState: any) => ({
      ...prevState,
      isLoading: false,
      events: payload,
    }));
  }

  function createEventSuccess(payload: any) {
    const newEvent = payload;
    setCalendarState((prevState: any) => ({
      ...prevState,
      isLoading: false,
      events: [...prevState.events, newEvent],
    }));
  }

  function updateEventSuccess(payload: any) {
    const event = payload;
    const updatedEvents = calendarState.events.map((_event: any) => {
      if (_event.id === event.id) {
        return event;
      }
      return _event;
    });

    setCalendarState((prevState: any) => ({
      ...prevState,
      isLoading: false,
      events: updatedEvents,
    }));
  }

  function deleteEventSuccess(payload: any) {
    const { eventId } = payload;
    setCalendarState((prevState) => ({
      ...prevState,
      events: prevState.events.filter((event: any) => event.id !== eventId),
    }));
  }

  function selectEvent(payload: any) {
    const eventId = payload;
    setCalendarState((prevState) => ({
      ...prevState,
      isOpenModal: true,
      selectedEventId: eventId,
    }));
  }

  function openModal() {
    setCalendarState((prevState) => ({
      ...prevState,
      isOpenModal: true,
    }));
  }

  function closeModal() {
    setCalendarState((prevState: any) => ({
      ...prevState,
      isOpenModal: false,
      selectedEventId: null,
      selectedRange: null,
    }));
  }

  //   function selectRange(payload: any) {

  //     const { start, end } = payload;
  //     setCalendarState((prevState: any) => ({
  //       ...prevState,
  //       isOpenModal: true,
  //       selectedRange: { start, end },
  //     }));
  //   }

  function selectRange(start: Date, end: Date) {
    setCalendarState((prevState: any) => ({
      ...prevState,
      isOpenModal: true,
      selectedRange: { start, end },
    }));
  }
  const handleSelectRange = (arg: any) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    selectRange(arg.start, arg.end);
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
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              editable={true}
              selectable={true}
              selectMirror={true}
              select={handleSelectRange}
              events={calendarState.events}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              height={isDesktop ? 720 : "auto"}
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
                listPlugin,
              ]}
            />
          </CalendarStyle>
        </Card>

        <Dialog
          fullWidth
          maxWidth="xs"
          onClose={closeModal}
          open={calendarState.isOpenModal}
        >
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
              onClick={closeModal}
              sx={{ width: "100%", height: "100%", position: "fixed" }}
            />
          </Box>
          <DialogTitle>Add Workout</DialogTitle>
          <CalendarForm
            event={selectedEvent}
            range={calendarState.selectedRange}
            onCancel={closeModal}
          />
        </Dialog>
      </Container>
    </Page>
  );
}
