// @mui
import { styled } from "@mui/material/styles";
import { Box, Grid, Switch, Container, Typography, Stack } from "@mui/material";
// _mock_

// sections

import Page from "../../../../components/Page";
import Layout from "../../../../layouts";
import { useQuery } from "@tanstack/react-query";
import { getPackages } from "../../../../api/packages";

import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";
import PackagesCard from "../../../../sections/auth/dashboard/packages/PackagesCard";
import useTable from "../../../../hooks/useTable";
import Divider from "@mui/material/Divider";
import useAuth from "../../../../hooks/useAuth";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

Packages.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Packages() {
  const { stripeDetails, setStripeDetails } = useAuth();
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

  const {
    data: { packages },
    isLoading,
    refetch,
  } = useQuery<any>(
    ["get_packages", page, rowsPerPage, orderBy, order],
    () =>
      getPackages({
        page,
        limit: rowsPerPage,
        sortBy: orderBy,
        order,
      }),
    {
      initialData: { results: [] },
      onSuccess(data) {
        setStripeDetails((prev: any) => ({
          ...prev,
          planId: data.stripePlanId,
        }));
        console.log({ stripeDetails });
        console.log("PACKAGES DATA!!!!!!!!!!!!!!!!!!!!", data);
      },
    }
  );

  return (
    <Page title="Packages:List">
      <Container>
        <HeaderBreadcrumbs
          heading="Packages List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.member.root },
            {
              name: "Packages",
              href: PATH_DASHBOARD.dashboard.member.packages,
            },
            { name: "List" },
          ]}
        />
        <Divider sx={{ mb: "2rem" }} />
        <Grid container spacing={3}>
          {packages?.map((card: any, index: number) => (
            <Grid item xs={12} md={4} key={card._id}>
              <PackagesCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
