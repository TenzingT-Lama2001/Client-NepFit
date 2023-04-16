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
import { getOneProduct } from "../../../../../api/products";
import ProductNewEditForm from "../../../../../sections/auth/dashboard/product/ProductNewEditForm";
import { getOneProgram } from "../../../../../api/program";
import ProgramNewEditForm from "../../../../../sections/auth/dashboard/program/ProgramNewEditForm";
ProductEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function ProductEdit() {
  const { query } = useRouter();
  const { programId } = query;
  console.log({ programId });
  const { data: singleProgram } = useQuery<any>(["get_single_program"], () =>
    getOneProgram(programId as string)
  );
  console.log({ singleProgram });
  return (
    <Page title="Edit: Program">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit: Program"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "Program",
              href: PATH_DASHBOARD.dashboard.admin.programs.list,
            },
            {
              name: `${singleProgram && capitalCase(singleProgram.name)}.`,
            },
          ]}
        />

        {singleProgram && (
          <ProgramNewEditForm isEdit currentProgram={singleProgram} />
        )}
      </Container>
    </Page>
  );
}
