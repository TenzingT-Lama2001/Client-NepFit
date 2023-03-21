import {
  Box,
  Stack,
  Drawer,
  styled,
  Avatar,
  Link,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { getMember } from "../../../api/member";
import useAuth from "../../../hooks/useAuth";
import { PATH_DASHBOARD } from "../../../routes/path";
const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_8],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavbarAccount() {
  const { auth, setAuth } = useAuth();
  const { data: memberData } = useQuery(
    ["get_member_details"],
    () => getMember(auth?.id as string),
    {}
  );
  return (
    <NextLink href={PATH_DASHBOARD.root} passHref>
      <Link underline="none" color="inherit">
        <RootStyle>
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Remy Sharp"
            src={memberData?.avatarUrl?.secure_url}
          />
          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {/* {memberData.firstName} {memberData.lastName} */}Random
            </Typography>
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
