import { useEffect, useState } from "react";

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
import Image from "../../../../components/Image";
import Label from "../../../../components/Label";
import { sentenceCase } from "change-case";

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
}: Props) {
  const theme = useTheme();
  const { pathname, push } = useRouter();
  const { name, description, price, imageUrl, quantity } = row;
  console.log("row@@@@@@@", row);
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState<string>("");
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  useEffect(() => {
    if (quantity < 1) {
      setStatus("out_of_stock");
    } else if (quantity < 3) {
      setStatus("low_stock");
    } else {
      setStatus("in_stock");
    }
  }, [quantity]);
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Image
          disabledEffect
          alt={name}
          src={imageUrl?.secure_url}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell>{description}</TableCell>
      <TableCell align="left">{price}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={
            status === "out_of_stock"
              ? "error"
              : status === "low_stock"
              ? "warning"
              : "success"
          }
          sx={{ textTransform: "capitalize" }}
        >
          {status ? sentenceCase(status) : ""}
        </Label>
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
