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
import { getTrainer } from "../../../../api/trainer";
import { useQuery } from "@tanstack/react-query";

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
  let memberId = member;
  let trainerId = trainer;
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const { data: result_member } = useQuery<any>(
    ["get_members"],
    () => getMember(memberId as string),
    {
      onSuccess(data) {
        console.log("member data", data);
      },
    }
  );
  const { data: result_trainer } = useQuery<any>(
    ["get_trainers"],
    () => getTrainer(trainerId as string),
    {
      onSuccess(data) {
        console.log("trainers data", data);
      },
    }
  );
  return (
    <TableRow>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={result_trainer?.firstName}
          src={result_trainer?.avatarUrl?.secure_url}
          sx={{ mr: 2 }}
        />

        <Typography variant="subtitle2" noWrap>
          {result_trainer?.firstName} {result_trainer?.lastName}
        </Typography>
      </TableCell>

      <TableCell>
        {result_member?.firstName} {result_member?.lastName}
      </TableCell>
      <TableCell align="left">{address}</TableCell>
      <TableCell align="left">
        {sYear}/{sMonth}/{sDay} - {sHours}:{sMinutes} {sAmPm}
      </TableCell>
      <TableCell align="left">
        {eYear}/{eMonth}/{eDay} - {eHours}:{eMinutes} {eAmPm}
      </TableCell>
      <TableCell align="left">
        <Checkbox checked={checked} onChange={onToggleStatus} />
      </TableCell>
    </TableRow>
  );
}
