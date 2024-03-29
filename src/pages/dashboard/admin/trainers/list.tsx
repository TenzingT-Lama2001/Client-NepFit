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
import { deleteTrainer, getTrainers } from "../../../../api/trainer";
import TrainerTableToolbar from "../../../../sections/auth/dashboard/trainer-list/TrainerTableToolbar";
import TrainerTableRow from "../../../../sections/auth/dashboard/trainer-list/TrainerTableRow";
import { Trainer } from "../../../../sections/auth/dashboard/trainer-list/TrainerNewEditForm";
import { useSnackbar } from "notistack";

const TABLE_HEAD = [
  { id: "firstname", label: "firstname", align: "left" },
  { id: "lastname", label: "lastname", align: "left" },
  { id: "email", label: "email", align: "left" },
  { id: "specialty", label: "specialty", align: "left" },
  { id: "classTime", label: "classTime", align: "left" },
  { id: "" },
];
const STATUS_OPTIONS = ["all", "active", "banned"];
TrainerList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default function TrainerList() {
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
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("all");
  const { enqueueSnackbar } = useSnackbar();
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: string) => {
    deleteTrainerMutation.mutate(id);
    const deleteRow = tableData.filter((row: any) => row._id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };
  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter(
      (row: any) => !selected.includes(row._id)
    );
    setSelected([]);
    setTableData(deleteRows);
    // deleteTrainerMutation.mutate(id);
  };
  const handleEditRow = (memberId: string) => {
    push(PATH_DASHBOARD.dashboard.admin.trainers.edit(paramCase(memberId)));
  };
  const deleteTrainerMutation = useMutation((id: any) => deleteTrainer(id), {
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
  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ["get_trainers", page, rowsPerPage, filterName, orderBy, order],
    () =>
      getTrainers({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
      }),
    {
      initialData: { results: [] },
      onSuccess({ trainers, totalTrainers }) {
        console.log("trainers", trainers);
        // console.log("trainers", trainers);
        setTotalCount(totalTrainers);
        console.log("total", totalTrainers);
        setTableData(trainers);
        console.log(tableData);
      },
    }
  );

  return (
    <Page title="Trainer: List">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Trainer List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "Trainer", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "List" },
          ]}
          action={
            <NextLink
              href={PATH_DASHBOARD.dashboard.admin.trainers.new}
              passHref
            >
              <Button
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                New Trainer
              </Button>
            </NextLink>
          }
        />
        <Card>
          <Divider />
          <TrainerTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
          />

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
                  dataFiltered
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => (
                      <TrainerTableRow
                        key={row._id}
                        row={row}
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
  tableData: Trainer[];
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
