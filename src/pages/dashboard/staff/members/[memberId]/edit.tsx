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
MemberEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function MemberEdit() {
  const { query } = useRouter();
  const { memberId } = query;

  const { data: singleMember } = useQuery<any>(["get_single_member"], () =>
    getMember(memberId as string)
  );
  return (
    <Page title="Edit: Member">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit: Member"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.admin.root },
            {
              name: "Member",
              href: PATH_DASHBOARD.dashboard.admin.members.list,
            },
            {
              name: `${singleMember && capitalCase(singleMember.firstName)}.`,
            },
          ]}
        />

        {singleMember && (
          <MemberNewEditForm isEdit currentMember={singleMember} />
        )}
      </Container>
    </Page>
  );
}
