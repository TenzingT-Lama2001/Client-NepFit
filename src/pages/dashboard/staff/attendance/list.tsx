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
const TABLE_HEAD = [
  { id: "firstname", label: "First Name", align: "left" },
  { id: "lastname", label: "Last Name", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "status", label: "Status", align: "left" },
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
  const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
  const [attendanceData, setAttendanceData] = useState<any>();
  const handleToggleMember = (memberId: string) => {
    if (checkedMembers.includes(memberId)) {
      setCheckedMembers(checkedMembers.filter((id) => id !== memberId));
    } else {
      setCheckedMembers([...checkedMembers, memberId]);
    }
  };
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("all");

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleEditRow = (staffUd: string) => {
    push(PATH_DASHBOARD.dashboard.admin.staffs.edit(paramCase(staffUd)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });
  console.log({ dataFiltered });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      console.log(date);
      console.log(typeof date);
    }
  };

  const { data, isLoading, refetch } = useQuery<any>(
    ["get_attendance", selectedDate],
    () => getAttendance(selectedDate as Date),
    {
      onSuccess(data) {
        console.log("GET ATTENDANCE", data);
        setTableData(data);
      },
    }
  );
  return (
    <Page title="Attendance">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Attendance"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.staff.root },
            { name: "Staff", href: PATH_DASHBOARD.dashboard.staff.root },
            { name: "Attendance" },
          ]}
          action={
            <DatePicker
              label="Select date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(props) => (
                <TextField {...props} variant="outlined" />
              )}
            />
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
                {dataFiltered.length > 0 ? (
                  dataFiltered.map((row: any) => (
                    <AttendanceListTableRow key={row._id} row={row} />
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
function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
}: {
  tableData: Staff[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.firstName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.status === filterStatus
    );
  }

  return tableData;
}
