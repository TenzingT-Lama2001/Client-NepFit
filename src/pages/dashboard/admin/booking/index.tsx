import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Switch,
  Tab,
  Table,
  TextField,
  TableBody,
  TableContainer,
  TablePagination,
  Tabs,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { getMembers } from "../../../../api/member";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Page from "../../../../components/Page";
import useTable, { emptyRows, getComparator } from "../../../../hooks/useTable";
import useTabs from "../../../../hooks/useTabs";
import { PATH_DASHBOARD } from "../../../../routes/path";

import NextLink from "next/link";
import Iconify from "../../../../components/Iconify";
import { paramCase } from "change-case";

import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from "../../../../components/table";

import Layout from "../../../../layouts";
import { useSnackbar } from "notistack";
import { Staff } from "../../../../sections/auth/dashboard/staff-list/StaffNewEditForm";
import { deleteStaff, getStaffs } from "../../../../api/staff";
import StaffTableToolbar from "../../../../sections/auth/dashboard/staff-list/StaffTableToolbar";
import StaffTableRow from "../../../../sections/auth/dashboard/staff-list/StaffTableRow";
import AttendanceTableToolbar from "../../../../sections/auth/dashboard/attendance/AttendanceTableToolbar";
import AttendanceTableRow from "../../../../sections/auth/dashboard/attendance/AttendanceTableRow";
import {
  createAttendance,
  getAttendance,
  getMembersFromMembership,
} from "../../../../api/attendance";
import { Controller } from "react-hook-form";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AttendanceListTableRow from "../../../../sections/auth/dashboard/attendance/AttendanceListTableRow";
import { getBookings, updateBooking } from "../../../../api/booking";
import { IBooking } from "../../../../sections/auth/dashboard/booking/TrainerCard";
import BookingListTableRow from "../../../../sections/auth/dashboard/booking/BookingListTableRow";
const TABLE_HEAD = [
  { id: "trainer", label: "Trainer", align: "left" },
  { id: "member", label: "Member", align: "left" },
  { id: "address", label: "Address", align: "left" },
  { id: "startDate", label: "Start Date", align: "left" },
  { id: "endDate", label: "End Date", align: "left" },
  { id: "Approve", label: "Approve", align: "left" },
  { id: "" },
];
const STATUS_OPTIONS = ["all", "active", "banned"];
AttendanceCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default function AttendanceCreate() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { push } = useRouter();
  console.log({ page, rowsPerPage });
  const [totalCount, setTotalCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkedBooking, setCheckedBooking] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState<any>();
  const handleToggleStatus = (bookingId: string) => {
    console.log({ bookingId });
    if (checkedBooking.includes(bookingId)) {
      setCheckedBooking(checkedBooking.filter((_id) => _id !== bookingId));
      console.log("if includes", { checkedBooking });
    } else {
      setCheckedBooking([...checkedBooking, bookingId]);
      console.log("else", { checkedBooking });
    }
  };
  console.log({ checkedBooking });
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("all");

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleEditRow = (staffUd: string) => {
    push(PATH_DASHBOARD.dashboard.admin.staffs.edit(paramCase(staffUd)));
  };

  const denseHeight = dense ? 52 : 72;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      console.log(date);
      console.log(typeof date);
    }
  };
  const updateBookingMutation = useMutation<[any], any, any>(
    (data) => updateBooking(data),
    {
      onSuccess: (data: any) => {
        enqueueSnackbar(data.message);
        refetch();
      },
      onError: (err) => {
        enqueueSnackbar(
          err.message ??
            err.response.data.message ??
            err.data.message ??
            "Something went wrong"
        );
      },
    }
  );
  const handleSubmit = () => {
    setBookingData(tableData);

    type UpdateBooking = {
      bookingId: string;
      status: string;
    }[];

    let approve: UpdateBooking = [];
    console.log("bookings from onsubmit", tableData);
    checkedBooking.map((bookingId) => {
      const obj = { bookingId, status: "Approved" };
      console.log({ obj });
      approve.push(obj);
      console.log("submitting booking", approve);
    });

    updateBookingMutation.mutate(approve);
  };

  const { data, isLoading, refetch } = useQuery<any>(
    ["get_bookings", page, rowsPerPage, filterName, orderBy, order],
    () =>
      getBookings({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
      }),
    {
      onSuccess({ bookings }) {
        console.log("GET BOOKINGS", bookings);
        setTableData(bookings);
      },
    }
  );
  console.log({ tableData });
  const isNotFound =
    (!tableData.length && !!filterName) ||
    (!tableData.length && !!filterStatus);
  return (
    <Page title="Booking">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Booking"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.staff.root },
            { name: "Admin", href: PATH_DASHBOARD.dashboard.staff.root },
            { name: "Booking" },
          ]}
          action={
            <Button variant="contained" onClick={() => handleSubmit()}>
              Submit
            </Button>
          }
        />

        <Card>
          <TableContainer sx={{ minWidth: 800, position: "relative" }}>
            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
              />

              <TableBody>
                {tableData.length > 0 ? (
                  tableData.map((row: any) => (
                    <BookingListTableRow
                      key={row._id}
                      row={row}
                      checked={checkedBooking.includes(row._id)}
                      onToggleStatus={() => handleToggleStatus(row._id)}
                    />
                  ))
                ) : (
                  <TableNoData isNotFound={isNotFound} />
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
