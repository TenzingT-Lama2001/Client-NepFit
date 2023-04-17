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
import { getMember } from "../../../../api/member";
import { useQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

export default function RequestListTableRow({ row }: any) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const { member, address, status, startDate, endDate } = row;

  console.log("row!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", row);
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  let memberId = member;
  const { data: result_member } = useQuery<any>(
    ["get_members"],
    () => getMember(memberId as string),
    {
      onSuccess(data) {
        console.log("member data", data);
      },
    }
  );
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);

  const sYear = sDate.getFullYear();
  const sMonth = sDate.getMonth() + 1; // add 1 to adjust for 0-based index
  const sDay = sDate.getDate();
  const sHours = sDate.getHours();
  const sMinutes = sDate.getMinutes();
  const sSeconds = sDate.getSeconds();
  const sAmPm = eDate
    .toLocaleString("en-US", { hour12: true, timeZone: "UTC" })
    .slice(-2);
  // Extract the date and time values from eDate
  const eYear = eDate.getFullYear();
  const eMonth = eDate.getMonth() + 1; // add 1 to adjust for 0-based index
  const eDay = eDate.getDate();
  const eHours = eDate.getHours();
  const eMinutes = eDate.getMinutes();
  const eSeconds = eDate.getSeconds();
  const eAmPm = eDate
    .toLocaleString("en-US", { hour12: true, timeZone: "UTC" })
    .slice(-2);
  console.log(sDate);
  return (
    <TableRow>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={result_member?.firstName}
          src={result_member?.avatarUrl?.secure_url}
          sx={{ mr: 2 }}
        />

        <Typography variant="subtitle2" noWrap>
          {result_member?.firstName}
        </Typography>
      </TableCell>

      <TableCell>{address}</TableCell>
      <TableCell align="left">
        {" "}
        {sYear}/{sMonth}/{sDay} - {sHours}:{sMinutes} {sAmPm}
      </TableCell>
      <TableCell align="left">
        {" "}
        {eYear}/{eMonth}/{eDay} - {eHours}:{eMinutes} {eAmPm}
      </TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={status ? "Approved" && "success" : "Pending" && "warning"}
          sx={{ textTransform: "capitalize" }}
        >
          {status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
