import { Container, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getMember } from "../../../../../api/member";
import HeaderBreadcrumbs from "../../../../../components/HeaderBreadcrumbs";
import Page from "../../../../../components/Page";
import Layout from "../../../../../layouts";
import { PATH_DASHBOARD } from "../../../../../routes/path";
import MemberNewEditForm from "../../../../../sections/auth/dashboard/customer-list/MemberNewEditForm";
import { capitalCase } from "change-case";
import { getOnePackage } from "../../../../../api/packages";
import PackageNewEditForm from "../../../../../sections/auth/dashboard/packages/PackageNewEditForm";
PackageEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function PackageEdit() {
  const { query } = useRouter();
  const { packageId } = query;
  console.log({ packageId });
  const { data: singlePackage } = useQuery<any>(["get_single_package"], () =>
    getOnePackage(packageId as string)
  );
  console.log({ singlePackage });
  return (
    <Page title="Edit: Package">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit: Package"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "Package",
              href: PATH_DASHBOARD.dashboard.admin.packages.list,
            },
            {
              name: `${singlePackage && capitalCase(singlePackage.name)}.`,
            },
          ]}
        />

        {singlePackage && (
          <PackageNewEditForm isEdit currentPackage={singlePackage} />
        )}
      </Container>
    </Page>
  );
}
