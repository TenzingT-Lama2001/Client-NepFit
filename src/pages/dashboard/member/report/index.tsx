// @mui
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../../../../api/programs";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";

import Layout from "../../../../layouts";
import { PATH_DASHBOARD } from "../../../../routes/path";
import ProgramCard from "../../../../sections/auth/dashboard/programs/ProgramCard";
import { getReportByMemberId, getReports } from "../../../../api/report";
import WorkIcon from "@mui/icons-material/Work";
import useAuth from "../../../../hooks/useAuth";

// sections

// ----------------------------------------------------------------------

ReportList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ReportList() {
  const { auth } = useAuth();
  const {
    data: { data },
    isLoading,
    refetch,
  } = useQuery<any>(
    ["get_report_memberId", auth?.id],
    () => getReportByMemberId(auth?.id as string),
    {
      initialData: { results: [] },
      onSuccess(data) {
        console.log(data);
      },
    }
  );
  console.log({ data });

  return (
    <Page title="Report: List">
      <Container>
        <HeaderBreadcrumbs
          heading="Report List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.member.root },
            {
              name: "Report",
              href: PATH_DASHBOARD.dashboard.member.report,
            },
            { name: "List" },
          ]}
        />

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {data?.map((report: any) => {
            const { pdf } = report;
            console.log(pdf);
            const blob = new Blob([pdf.data], { type: "application/pdf" });
            // const url = URL.createObjectURL(blob);
            const url = window.URL.createObjectURL(
              new Blob([new Uint8Array(pdf.data).buffer])
            );
            console.log(url);
            const date = new Date(report?.date);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            console.log(formattedDate);
            return (
              <div key={report._id}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {" "}
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Report" secondary={formattedDate} />
                    <Button variant="contained">
                      <a
                        href={url}
                        download={`Report_${formattedDate}.pdf`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Download Report
                      </a>{" "}
                    </Button>
                  </ListItem>
                </List>
                {/* <Typography mr={2}>{formattedDate}</Typography>
                <Button variant="contained">
                  <a
                    href={url}
                    download={`${report.date}.pdf`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Download Report
                  </a>{" "}
                </Button> */}
              </div>
            );
          })}
        </Box>
      </Container>
    </Page>
  );
}
