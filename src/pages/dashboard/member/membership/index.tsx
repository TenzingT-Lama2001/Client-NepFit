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
  Avatar,
  Typography,
  Divider,
  CardHeader,
  Grid,
  Alert,
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
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutByTrainerId } from "../../../../api/workout";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import Cookies from "js-cookie";
import { getOneMembership } from "../../../../api/membership";
import { getMember } from "../../../../api/member";
import { OverlayStyle } from "../../../../sections/auth/dashboard/booking/TrainerCard";
import Image from "../../../../components/Image";
import { getTrainer } from "../../../../api/trainer";
import MembershipWidgetSummary from "../../../../sections/auth/dashboard/membership/MembershipWidgetSummary";
import { getProgramById } from "../../../../api/programs";
import { getOnePackage } from "../../../../api/packages";
import { capitalCaseTransform } from "change-case";
// redux

// sections

// ----------------------------------------------------------------------

Membership.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Membership() {
  const { calendarState, setCalendarState, auth, membership } = useAuth();

  const { data } = useQuery<any>(
    ["get_one_membership", membership],
    () => getOneMembership(membership?.membershipId as string),
    {
      onSuccess: (data) => {
        console.log("useQuery get membership data ", data);
      },
    }
  );
  const { data: member } = useQuery<any>(
    ["get_member"],
    () => getMember(data.member as string),
    {
      enabled: !!data,
      onSuccess: (data) => {
        console.log("member ", data);
      },
    }
  );
  const { data: trainer } = useQuery<any>(
    ["get_trainer"],
    () => getTrainer(data.trainer as string),
    {
      enabled: !!data,
      onSuccess: (data) => {
        console.log("trainer ", data);
      },
    }
  );
  const { data: program } = useQuery<any>(
    ["get_program"],
    () => getProgramById(data.program as string),
    {
      enabled: !!data,
      onSuccess: (data) => {
        console.log("program ", data);
      },
    }
  );
  const { data: packages } = useQuery<any>(
    ["get_package"],
    () => getOnePackage(data.packages as string),
    {
      enabled: !!data,
      onSuccess: (data) => {
        console.log("package ", data);
      },
    }
  );
  if (!membership?.membershipId) {
    return (
      <Page title="Membership">
        <Container maxWidth="xl">
          <HeaderBreadcrumbs
            heading="Membership"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "Membership" },
            ]}
          />{" "}
          <Alert severity="info" sx={{ mb: 3 }}>
            There is no current membership. If you have purchased a membership,
            it will be activated within a day.
          </Alert>
        </Container>
      </Page>
    );
  }

  const programName: string = program?.name;
  const packageName: string = packages?.name;
  console.log({ member });
  const sDate = new Date(data?.startDate);
  const eDate = new Date(data?.endDate);

  const difference = eDate.getTime() - Date.now();
  const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  return (
    <Page title="Membership">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Membership"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Membership" },
          ]}
        />
        {program && packages ? (
          <>
            {" "}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <MembershipWidgetSummary
                  title="Your program"
                  total={capitalCaseTransform(programName)}
                  icon={"material-symbols:fitness-center-rounded"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <MembershipWidgetSummary
                  title="Your package"
                  total={capitalCaseTransform(packageName)}
                  color="info"
                  icon={"ph:package-bold"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <MembershipWidgetSummary
                  title="Expires In"
                  total={remainingDays + " " + "days"}
                  color="warning"
                  icon={"lucide:calendar-days"}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <MembershipWidgetSummary
                  title="Status"
                  total={member.status}
                  color={member.status == "Active" ? "success" : "error"}
                  icon={"pajamas:status-closed"}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: "3rem",
                display: "grid",
                gap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
              }}
            >
              <Card sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  sx={{
                    whiteSpace: "pre-line",
                    mt: "1rem",
                    mb: "1rem",
                  }}
                >
                  Member
                </Typography>

                <Box sx={{ position: "relative" }}>
                  <Avatar
                    alt={member?.firstName}
                    src={member?.avatarUrl?.secure_url}
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
                    src={member?.avatarUrl?.secure_url}
                    alt={member?.avatarUrl?.secure_url}
                    ratio="16/9"
                  />
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 6 }}>
                  {member?.firstName}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: "2rem" }}
                >
                  {member?.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: "2rem" }}
                >
                  {member?.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: "2rem" }}
                >
                  {member?.address}
                </Typography>

                <Divider sx={{ borderStyle: "dashed" }} />
              </Card>
              <Card sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  sx={{
                    whiteSpace: "pre-line",
                    mt: "1rem",
                    mb: "1rem",
                  }}
                >
                  Trainer
                </Typography>

                <Box sx={{ position: "relative" }}>
                  <Avatar
                    alt={trainer?.firstName}
                    src={trainer?.avatarUrl?.secure_url}
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
                    src={trainer?.avatarUrl?.secure_url}
                    alt={trainer?.avatarUrl?.secure_url}
                    ratio="16/9"
                  />
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 6 }}>
                  {trainer?.firstName}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: "2rem" }}
                >
                  {trainer?.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: "2rem" }}
                >
                  {trainer?.email}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: "2rem" }}
                >
                  {trainer?.address}
                </Typography>

                <Divider sx={{ borderStyle: "dashed" }} />
              </Card>
              <Card sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  sx={{
                    whiteSpace: "pre-line",
                    mt: "1rem",
                    mb: "1rem",
                  }}
                >
                  Program
                </Typography>

                <Box sx={{ position: "relative" }}>
                  <Avatar
                    alt={program?.name}
                    src={program?.image?.secure_url}
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
                    src={program?.image?.secure_url}
                    alt={program?.image?.secure_url}
                    ratio="16/9"
                  />
                </Box>

                <Typography variant="subtitle1" sx={{ mt: 6 }}>
                  {program?.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: "2rem" }}
                >
                  {program?.description}
                </Typography>

                <Divider sx={{ borderStyle: "dashed" }} />
              </Card>
            </Box>
          </>
        ) : (
          <h2> Loading ... </h2>
        )}
      </Container>
    </Page>
  );
}
