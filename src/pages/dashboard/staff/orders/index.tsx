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
import { useSnackbar } from "notistack";
import {
  CustomerTableRow,
  CustomerTableToolbar,
} from "../../../../sections/auth/dashboard/customer-list";
import Scrollbar from "../../../../components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from "../../../../components/table";

import Layout from "../../../../layouts";
import { deletePackage, getPackages } from "../../../../api/packages";
import PackagesTableToolbar from "../../../../sections/auth/dashboard/packages/PackagesTableToolbar";
import { PackagesTableRow } from "../../../../sections/auth/dashboard/packages";
import { getOrders } from "../../../../api/order";
import OrderTableRow from "../../../../sections/auth/dashboard/order/OrderTableRow";

const TABLE_HEAD = [
  { id: "memberId", label: "Member Id", align: "left" },
  { id: "shippingAddress", label: "Address", align: "left" },

  { id: "products", label: "Products", align: "left" },
  { id: "amount", label: "Amount", align: "left" },
  { id: "deliveryStatus", label: "Status", align: "left" },
  { id: "" },
];
const STATUS_OPTIONS = ["all", "active", "banned"];
OrderList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export default function OrderList() {
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
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs("all");

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row: any) => row._id !== id);
    deletePackageMutation.mutate(id);
    setSelected([]);
    setTableData(deleteRow);
  };
  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter(
      (row: any) => !selected.includes(row._id)
    );
    setSelected([]);
    setTableData(deleteRows);
  };
  const handleEditRow = (memberId: string) => {
    push(PATH_DASHBOARD.dashboard.admin.packages.edit(paramCase(memberId)));
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

  const deletePackageMutation = useMutation((id: any) => deletePackage(id), {
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
    ["get_orders", page, rowsPerPage, filterName, orderBy, order],
    () =>
      getOrders({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
      }),
    {
      initialData: { results: [] },
      onSuccess({ orders, totalOrders }) {
        setTotalCount(totalOrders);
        setTableData(orders);
        console.log({ tableData });
      },
    }
  );

  return (
    <Page title="Orders: List">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Orders List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "Orders ", href: PATH_DASHBOARD.dashboard.admin.root },
            { name: "List" },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.dashboard.admin.orders} passHref>
              <Button
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                New orders
              </Button>
            </NextLink>
          }
        />
        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: "background.neutral" }}
          />

          <Divider />

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
                      <OrderTableRow
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

export type Order = {
  _id: string;
  memberId: string;
  shippingAddress: string;
  products: [
    {
      stripeProductId: string;
      qty: number;
      name: string;
      amount: number;
    }
  ];
  amount: number;
  deliveryStatus: "delivered" | "pending";
};

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
}: {
  tableData: Order[];
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
        item?.firstName?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== "all") {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.status === filterStatus
    );
  }

  return tableData;
}
