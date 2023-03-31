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
  getMembersFromMembership,
} from "../../../../api/attendance";

const TABLE_HEAD = [
  { id: "firstname", label: "firstname", align: "left" },
  { id: "lastname", label: "lastname", align: "left" },
  { id: "email", label: "email", align: "left" },
  { id: "present", label: "Present", align: "left" },
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

  const handleDeleteRow = (id: string) => {
    // const deleteRow = tableData.filter((row: any) => row._id !== id);
    // setSelected([]);
    // setTableData(deleteRow);
    deleteStaffMutation.mutate(id);
    refetch();
  };
  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter(
      (row: any) => !selected.includes(row._id)
    );
    setSelected([]);
    setTableData(deleteRows);
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

  const createAttendanceMutation = useMutation(
    (data: any) => createAttendance(data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        refetch();
      },
      onError(err: any) {
        enqueueSnackbar(
          err.message ??
            err.response.data.message ??
            err.data.message ??
            "Something went wrong"
        );
      },
    }
  );
  const deleteStaffMutation = useMutation((id: any) => deleteStaff(id), {
    onSuccess(data) {
      enqueueSnackbar(data.message);
      refetch();
    },
    onError(err: any) {
      enqueueSnackbar(
        err.message ??
          err.response.data.message ??
          err.data.message ??
          "Something went wrong"
      );
    },
  });
  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ["get_members_membership", page, rowsPerPage, filterName, orderBy, order],
    () =>
      getMembersFromMembership({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
      }),
    {
      initialData: { results: [] },
      onSuccess({ members, totalMembers }) {
        console.log("members", members);
        // console.log("members", members);
        setTotalCount(totalMembers);
        console.log("total", totalMembers);
        setTableData(members);
        console.log(tableData);
      },
    }
  );

  const handleSubmit = () => {
    setAttendanceData(dataFiltered);

    type Attendance = {
      memberId: string;
      is_present: boolean;
      date: Date;
    }[];

    let attendance: Attendance = [];
    checkedMembers.map((memberId) => {
      const obj = { memberId, is_present: true, date: new Date() };
      console.log({ obj });
      attendance.push(obj);
      console.log("submitting attendance", attendance);
    });
    console.log("Attendance data", attendanceData);
    console.log("checked members", checkedMembers);

    createAttendanceMutation.mutate(attendance);
  };
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
            <Button variant="contained" onClick={() => handleSubmit()}>
              Submit
            </Button>
          }
        />
        <Card>
          <TableContainer sx={{ minWidth: 800, position: "relative" }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row: any) => row._id)
                  )
                }
                actions={
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteRows(selected)}
                    >
                      <Iconify icon={"eva:trash-2-outline"} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row: any) => row._id)
                  )
                }
              />

              <TableBody>
                {dataFiltered.length > 0 ? (
                  dataFiltered.map((row: any) => (
                    <AttendanceTableRow
                      key={row._id}
                      row={row}
                      checked={checkedMembers.includes(row._id)}
                      onToggleMember={() => handleToggleMember(row._id)}
                      selected={selected.includes(row._id)}
                      onSelectRow={() => onSelectRow(row._id)}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                      onEditRow={() => handleEditRow(row._id)}
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
