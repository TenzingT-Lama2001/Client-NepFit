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
import { useMutation } from "@tanstack/react-query";
import { sendNotification } from "../../../../api/notification";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function NotificationTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: Props) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const {
    startDate,
    endDate,
    member: { firstName: memberName, avatarUrl, email },
    trainer: { firstName: trainerName },
    program: { name: programName },
    packages: { name: packagesName },
  } = row;
  console.log("row!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", row);
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);
  const { enqueueSnackbar } = useSnackbar();
  const difference = eDate.getTime() - Date.now();
  const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const sendNotificationMutation = useMutation(
    (email: string) => sendNotification(email),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
        console.log({ data });
      },
      onError(err: any) {
        enqueueSnackbar(
          err.message ??
            err.response.data.message ??
            err.data.message ??
            "Something went wrong"
        );
      },
    }
  );

  const handleOnClick = () => {};
  sendNotificationMutation.mutate(email);
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt={memberName} src={avatarUrl?.secure_url} sx={{ mr: 2 }} />
        <Link
          component="button"
          variant="caption"
          onClick={() => {
            // push(PATH_DASHBOARD.menu.customers.view(paramCase(id)));
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {memberName}
          </Typography>
        </Link>
      </TableCell>
      <TableCell align="left">{programName}</TableCell>
      <TableCell>{trainerName}</TableCell>

      <TableCell align="left">{packagesName}</TableCell>
      <TableCell align="left">{remainingDays}</TableCell>
      <TableCell align="left">
        <Button variant="contained" onClick={() => handleOnClick()}>
          Notify
        </Button>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={"eva:edit-fill"} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
      {/* </Link> */}
    </TableRow>
  );
}
