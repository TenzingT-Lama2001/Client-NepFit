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
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { getOrderByStripeProductId, updateOrder } from "../../../../api/order";
import RHFSelect from "../../../../components/hook-form/RHFSelect";
import { SelectChangeEvent } from "@mui/material";
import { useSnackbar } from "notistack";
import { getMember } from "../../../../api/member";

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: Props) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { _id, memberId, deliveryStatus, shippingAddress, amount, products } =
    row;
  const [status, setStatus] = useState(deliveryStatus);
  console.log("row@@@@@@@", row);
  const { data: result_member } = useQuery<any>(
    ["get_member"],
    () => getMember(memberId as string),
    {
      onSuccess(data) {
        console.log("member data", data);
      },
    }
  );
  console.log({ products });
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  //   const status = [
  //     {
  //       unit: "pending",
  //       label: "pending",
  //     },
  //     {
  //       unit: "delivered",
  //       label: "delivered",
  //     },
  //   ];
  const updateOrderMutation = useMutation(
    (data: any) => updateOrder(_id as string, data),
    {
      onSuccess(data) {
        enqueueSnackbar(data.message);
      },
      onError(err: any) {
        enqueueSnackbar(
          err.response.data.message ??
            err.message ??
            err.data.message ??
            "Something went wrong",
          { variant: "error" }
        );
      },
    }
  );
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setStatus(event.target.value);
    const orderData = {
      memberId,
      deliveryStatus: event.target.value,
      shippingAddress,
      amount,
      products,
    };
    console.log({ orderData });
    updateOrderMutation.mutate(orderData);
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2" noWrap>
          {result_member?.firstName} {result_member?.lastName}
        </Typography>
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

      <Select value={status} label="status" onChange={handleChange}>
        <MenuItem value={"pending"}>Pending</MenuItem>
        <MenuItem value={"delivered"}>Delivered</MenuItem>
      </Select>
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
