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
import NextLink from "next/link";
import { PATH_DASHBOARD } from "../../../routes/path";
const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavbarAccount() {
  return (
    <NextLink href={PATH_DASHBOARD.root} passHref>
      <Link underline="none" color="inherit">
        <RootStyle>
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
          >
            T
          </Avatar>
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
              Tenzing Lama
            </Typography>
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
