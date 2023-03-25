// import FullCalendar, {
//   DateSelectArg,
//   EventClickArg,
//   EventDropArg,
// } from "@fullcalendar/react"; // => request placed at the top
// import listPlugin from "@fullcalendar/list";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import timelinePlugin from "@fullcalendar/timeline";
// import interactionPlugin, {
//   EventResizeDoneArg,
// } from "@fullcalendar/interaction";
// //
// import { useState, useRef, useEffect } from "react";
// // @mui
// import { Card, Button, Container, DialogTitle } from "@mui/material";
// import Layout from "../../../../layouts";
// import useResponsive from "../../../../hooks/useResponsive";
// import CalendarToolbar, { CalendarView } from "../../../../sections/auth/dashboard/calendar/CalendarToolbar";
// import Page from "../../../../components/Page";
// import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
// import { PATH_DASHBOARD } from "../../../../routes/path";
// import Iconify from "../../../../components/Iconify";
// import { CalendarForm, CalendarStyle } from "../../../../sections/auth/dashboard/calendar";
// // redux

// /

// // sections

// // ----------------------------------------------------------------------

// Workout.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout>{page}</Layout>;
// };

// // ----------------------------------------------------------------------

// const selectedEventSelector = (state: RootState) => {
//   const { events, selectedEventId } = state.calendar;
//   if (selectedEventId) {
//     // return events.find((_event) => _event.id === selectedEventId);
//   }
//   return null;
// };

// export default function Workout() {

//   const isDesktop = useResponsive("up", "sm");

//   const calendarRef = useRef<FullCalendar>(null);

//   const [date, setDate] = useState(new Date());

//   const [view, setView] = useState<CalendarView>(
//     isDesktop ? "dayGridMonth" : "listWeek"
//   );

//   useEffect(() => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       const newView = isDesktop ? "dayGridMonth" : "listWeek";
//       calendarApi.changeView(newView);
//       setView(newView);
//     }
//   }, [isDesktop]);

//   const handleClickToday = () => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       calendarApi.today();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleChangeView = (newView: CalendarView) => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       calendarApi.changeView(newView);
//       setView(newView);
//     }
//   };

//   const handleClickDatePrev = () => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       calendarApi.prev();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleClickDateNext = () => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       calendarApi.next();
//       setDate(calendarApi.getDate());
//     }
//   };

//   const handleSelectRange = (arg: DateSelectArg) => {
//     const calendarEl = calendarRef.current;
//     if (calendarEl) {
//       const calendarApi = calendarEl.getApi();
//       calendarApi.unselect();
//     }

//   };

//   const handleSelectEvent = (arg: EventClickArg) => {

//   };

//   const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
//     try {

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDropEvent = async ({ event }: EventDropArg) => {
//     try {

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddEvent = () => {

//   };

//   const handleCloseModal = () => {

//   };

//   return (
//     <Page title="Calendar">
//       <Container maxWidth= "xl">
//         <HeaderBreadcrumbs
//           heading="Calendar"
//           links={[
//             { name: "Dashboard", href: PATH_DASHBOARD.root },
//             { name: "Calendar" },
//           ]}
//           moreLink="https://fullcalendar.io/docs/react"
//           action={
//             <Button
//               variant="contained"
//               startIcon={
//                 <Iconify icon={"eva:plus-fill"} width={20} height={20} />
//               }
//               onClick={handleAddEvent}
//             >
//               New Event
//             </Button>
//           }
//         />

//         <Card>
//           <CalendarStyle>
//             <CalendarToolbar
//               date={date}
//               view={view}
//               onNextDate={handleClickDateNext}
//               onPrevDate={handleClickDatePrev}
//               onToday={handleClickToday}
//               onChangeView={handleChangeView}
//             />
//             <FullCalendar
//               weekends
//               editable
//               droppable
//               selectable
//               events={}
//               ref={calendarRef}
//               rerenderDelay={10}
//               initialDate={date}
//               initialView={view}
//               dayMaxEventRows={3}
//               eventDisplay="block"
//               headerToolbar={false}
//               allDayMaintainDuration
//               eventResizableFromStart
//               select={handleSelectRange}
//               eventDrop={handleDropEvent}
//               eventClick={handleSelectEvent}
//               eventResize={handleResizeEvent}
//               height={isDesktop ? 720 : "auto"}
//               plugins={[
//                 listPlugin,
//                 dayGridPlugin,
//                 timelinePlugin,
//                 timeGridPlugin,
//                 interactionPlugin,
//               ]}
//             />
//           </CalendarStyle>
//         </Card>

//         <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
//           <DialogTitle>
//             {selectedEvent ? "Edit Event" : "Add Event"}
//           </DialogTitle>

//           <CalendarForm
//             event={selectedEvent || {}}
//             range={selectedRange}
//             onCancel={handleCloseModal}
//           />
//         </DialogAnimate>
//       </Container>
//     </Page>
//   );
// }
