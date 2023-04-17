import { Container, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { capitalCase } from "change-case";
import Layout from "../../../../layouts";
import { getMember } from "../../../../api/member";
import Page from "../../../../components/Page";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";
import MemberNewEditForm from "../../../../sections/auth/dashboard/customer-list/MemberNewEditForm";
import useAuth from "../../../../hooks/useAuth";
import MemberEditProfile from "../../../../sections/auth/dashboard/profile/MemberEditProfile";
MemberEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default function MemberEdit() {
  const { auth } = useAuth();
  const memberId = auth?.id;
  const { data: singleMember } = useQuery<any>(["get_single_member"], () =>
    getMember(memberId as string)
  );
  return (
    <Page title="Edit: Profile">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Edit: Profile"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.dashboard.member.root },
            {
              name: "Member",
              href: PATH_DASHBOARD.dashboard.member.root,
            },
            {
              name: `${singleMember && capitalCase(singleMember.firstName)}.`,
            },
          ]}
        />

        {singleMember && (
          <MemberEditProfile isEdit currentMember={singleMember} />
        )}
      </Container>
    </Page>
  );
}
