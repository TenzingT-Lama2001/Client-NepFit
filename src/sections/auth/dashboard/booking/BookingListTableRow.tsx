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

export default function BookingListTableRow({
  row,
  checked,
  onToggleStatus,
}: any) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const { trainer, member, startDate, endDate, status, address } = row;

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
        {/* <Avatar alt={firstName} src={avatarUrl?.secure_url} sx={{ mr: 2 }} /> */}
        <Link
          component="button"
          variant="caption"
          onClick={() => {
            // push(PATH_DASHBOARD.menu.customers.view(paramCase(id)));
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {trainer}
          </Typography>
        </Link>
      </TableCell>

      <TableCell>{member}</TableCell>
      <TableCell align="left">{address}</TableCell>
      <TableCell align="left">{startDate}</TableCell>
      <TableCell align="left">{endDate}</TableCell>
      <TableCell align="left">
        <Checkbox checked={checked} onChange={onToggleStatus} />
      </TableCell>
    </TableRow>
  );
}
