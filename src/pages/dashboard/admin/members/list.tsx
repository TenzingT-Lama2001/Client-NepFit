import { useState, useEffect } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Link,
} from "@mui/material";
// redux

// hooks
import useSettings from "../../../../hooks/useSettings";

// @types

// layouts
import Layout from "../../../../layouts";
// components
import Page from "../../../../components/Page";
import Iconify from "../../../../components/Iconify";
import Scrollbar from "../../../../components/Scrollbar";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from "../../../../components/table";
// sections

import { useMutation, useQuery } from "@tanstack/react-query";

import { useSnackbar } from "notistack";

import { PATH_DASHBOARD } from "../../../../routes/path";
import {
  CustomerTableRow,
  CustomerTableToolbar,
} from "../../../../sections/auth/dashboard/customer-list";
import useTable, { emptyRows } from "../../../../hooks/useTable";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "name", align: "left" },
  { id: "createdAt", label: "created_at", align: "left" },
  { id: "email", label: "email", align: "left" },
  { id: "phone", label: "phone", align: "left" },
  { id: "" },
];

// ----------------------------------------------------------------------

EcommerceProductList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
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
  } = useTable({
    defaultOrderBy: "createdAt",
  });

  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [totalCustomers, setTotalCustomers] = useState(0);

  const [filterName, setFilterName] = useState("");

  //   const {
  //     data: { results },
  //     isLoading,
  //     refetch,
  //   } = useQuery<any>(
  //     ["get_customers", page, rowsPerPage, filterName, orderBy, order],
  //     () =>
  //       getShopCustomers({
  //         page,
  //         limit: rowsPerPage,
  //         searchQuery: filterName,
  //         sortBy: orderBy,
  //         order,
  //       }),
  //     {
  //       initialData: { results: [], totalCustomers: 0 },
  //       onSuccess(data) {
  //         if (page === 0) {
  //           setTotalCustomers(data.total);
  //         }
  //       },
  //     }
  //   );

  //   const deleteProductMutation = useMutation(
  //     (id: any) => deleteSingleProduct(id),
  //     {
  //       onSuccess(data) {
  //         enqueueSnackbar(data.message);
  //         refetch();
  //       },
  //       onError(err: any) {
  //         enqueueSnackbar(
  //           err.message ??
  //             err.response.data.message ??
  //             err.data.message ??
  //             "Something went wrong"
  //         );
  //       },
  //     }
  //   );

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = async (id: string) => {
    // const deleteRow = tableData.filter((row) => row.id !== id);
    // setSelected([]);
    // setTableData(deleteRow);
    //deleteProductMutation.mutate(id)
    //refetch();
  };

  const handleDeleteRows = (selected: string[]) => {
    // await deleteSingleProduct(selected);
    // refetch();
  };

  const handleEditRow = (id: string) => {
    // push(PATH_DASHBOARD.menu.products.edit(paramCase(id)));
  };

  // const dataFiltered = applySortFilter({
  //   products,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  const denseHeight = dense ? 60 : 80;

  //   const isNotFound =
  //     (!totalCustomers && !!filterName) || (!isLoading && !totalCustomers);

  return (
    <Page title="Customer List">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={"customer_list"}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Customer",
              //   href: PATH_DASHBOARD.menu.customers.root,
            },
            { name: "Customer list" },
          ]}
        />

        <Card>
          <CustomerTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: "relative" }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={totalCustomers}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      results.map((row: any) => row.id)
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
                  rowCount={totalCustomers}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      results.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : results)
                    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(
                      (row: any, index: any) =>
                        row ? (
                          <CustomerTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                          />
                        ) : null
                      // (
                      //   !isNotFound && (
                      //     <TableSkeleton
                      //       key={index}
                      //       sx={{ height: denseHeight }}
                      //     />
                      //   )
                      // )
                    )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, totalCustomers)}
                  />
                  {/* <TableNoData isNotFound={isNotFound} /> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCustomers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 3, top: 0, position: { md: "absolute" } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

// function applySortFilter({
//   products,
//   comparator,
//   filterName,
// }: {
//   products: Product[];
//   comparator: (a: any, b: any) => number;
//   filterName: string;
// }) {
//   const stabilizedThis = products.map((el, index) => [el, index] as const);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   products = stabilizedThis.map((el) => el[0]);

//   if (filterName) {
//     products = products.filter(
//       (item: Record<string, any>) =>
//         item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
//     );
//   }

//   return products;
// }
