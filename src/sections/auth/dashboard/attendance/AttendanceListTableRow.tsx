import { useState } from "react";

// @mui
import { useTheme } from "@mui/material/styles";
import {
  TableRow,
  Checkbox,
  TableCell,
  Typography,
  MenuItem,
  Link,
  Button,
  Avatar,
} from "@mui/material";
// utils

import { useRouter } from "next/router";
import Iconify from "../../../../components/Iconify";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { TableMoreMenu } from "../../../../components/table";
import Label from "../../../../components/Label";

// ----------------------------------------------------------------------

export default function AttendanceListTableRow({ row }: any) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const {
    member: { firstName, lastName, email, avatarUrl },
    is_present,
  } = row;

  console.log("row!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", row);
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt={firstName} src={avatarUrl?.secure_url} sx={{ mr: 2 }} />
        <Link
          component="button"
          variant="caption"
          onClick={() => {
            // push(PATH_DASHBOARD.menu.customers.view(paramCase(id)));
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {firstName}
          </Typography>
        </Link>
      </TableCell>

      <TableCell>{lastName}</TableCell>
      <TableCell align="left">{email}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={is_present ? "Present" && "success" : "Absent" && "error"}
          sx={{ textTransform: "capitalize" }}
        >
          {is_present ? "Present" : "Absent"}
        </Label>
      </TableCell>
    </TableRow>
  );
}
