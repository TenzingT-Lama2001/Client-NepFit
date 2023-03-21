import { useState, useEffect } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// @mui
import {
  Box,
  Tabs,
  Tab,
  Card,
  Table,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Divider,
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
import { deleteMember, getMembers } from "../../../../api/member";

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
const STATUS_OPTIONS = ["all", "active", "banned"];
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

  const [totalMembers, setTotalMembers] = useState(0);

  const [filterName, setFilterName] = useState("");

  const {
    data: { results },
    isLoading,
    refetch,
  } = useQuery<any>(
    ["get_members", page, rowsPerPage, filterName, orderBy, order],
    () =>
      getMembers({
        page,
        limit: rowsPerPage,
        searchQuery: filterName,
        sortBy: orderBy,
        order,
      }),
    {
      initialData: { results: [], totalMembers: 0 },
      onSuccess(data) {
        console.log("page", page);
        if (page === 0) {
          setTotalMembers(data.length);
          console.log("total members", totalMembers);
        }
        console.log("member data", data);
        console.log("memnber length", data.length);
        console.log("total members", totalMembers);
      },
    }
  );

  const deleteMemberMutation = useMutation((id: any) => deleteMember(id), {
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

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: string) => {
    deleteMemberMutation.mutate(id);
    refetch();
  };
  const handleDeleteRows = (selected: string[]) => {
    // await deleteSingleProduct(selected);
    // refetch();
  };

  const handleEditRow = (id: string) => {
    // push(PATH_DASHBOARD.menu.products.edit(paramCase(id)));
  };

  const denseHeight = dense ? 60 : 80;

  const isNotFound =
    (!totalMembers && !!filterName) || (!isLoading && !totalMembers);

  return (
    <Page title="Member List">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Member List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "Member",
              //   href: PATH_DASHBOARD.menu.customers.root,
            },
            { name: "Member list" },
          ]}
          action={
            <NextLink href="#" passHref>
              <Button
                variant="contained"
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                New Member
              </Button>
            </NextLink>
          }
        />

        <Card>
          {/* <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: "background.neutral" }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs> */}

          <Divider />
          <CustomerTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={totalMembers}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      results.map((row: any) => row._id)
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
                  rowCount={totalMembers}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      results.map((row: any) => row._id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : results)?.map(
                    (row: any, index: any) =>
                      row ? (
                        <CustomerTableRow
                          key={row._id}
                          row={row}
                          selected={selected.includes(row._id)}
                          onSelectRow={() => onSelectRow(row._id)}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onEditRow={() => handleEditRow(row._id)}
                        />
                      ) : (
                        !isNotFound && (
                          <TableSkeleton
                            key={index}
                            sx={{ height: denseHeight }}
                          />
                        )
                      )
                  )}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, totalMembers)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: "relative" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalMembers}
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

export type Member = {
  id?: string;
  avatarUrl: {
    id: string;
    secure_url: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status?: string;
  role: string;
  address: string;
  password: string;
};
function applySortFilter({
  members,
  comparator,
  filterName,
}: {
  members: Member[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = members.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  members = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    members = members.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return members;
}
