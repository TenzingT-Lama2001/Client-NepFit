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
  Select,
} from "@mui/material";
// utils

import { useRouter } from "next/router";
import Iconify from "../../../../components/Iconify";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { TableMoreMenu } from "../../../../components/table";
import { useMutation, useQueries } from "@tanstack/react-query";
import { getOrderByStripeProductId, updateOrder } from "../../../../api/order";
import RHFSelect from "../../../../components/hook-form/RHFSelect";
import { SelectChangeEvent } from "@mui/material";
import { useSnackbar } from "notistack";
import Label from "../../../../components/Label";

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function PurchaseHistoryTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: Props) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    _id,
    memberId,
    deliveryStatus,
    shippingAddress,
    amount,
    products,
    purchasedDate,
  } = row;
  const [status, setStatus] = useState(deliveryStatus);
  console.log("row@@@@@@@", row);

  console.log({ memberId });
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const date = new Date(purchasedDate);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${day}/${month}/${year}`;
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  let readableDate = new Date(purchasedDate).toISOString;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Link
          component="button"
          variant="caption"
          onClick={() => {
            // push(PATH_DASHBOARD.menu.customers.view(paramCase(id)));
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {formattedDate}
          </Typography>
        </Link>
      </TableCell>

      <TableCell>{shippingAddress}</TableCell>
      <TableCell align="left">
        {products.map((product: any) => (
          <Typography
            key={product._id}
            style={{ display: "block" }}
          >{`${product.name} - ${product.qty}`}</Typography>
        ))}{" "}
      </TableCell>
      <TableCell align="left">{amount}</TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={
            deliveryStatus ? "delivered" && "success" : "pending" && "error"
          }
          sx={{ textTransform: "capitalize" }}
        >
          {deliveryStatus ? "Purchased" : "pending"}
        </Label>
      </TableCell>
      {/* <TableCell align="left">{deliveryStatus}</TableCell> */}

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
