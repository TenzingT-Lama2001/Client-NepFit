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
} from "@mui/material";
// utils

import { useRouter } from "next/router";
import Iconify from "../../../../components/Iconify";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { TableMoreMenu } from "../../../../components/table";

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
  const { name, createdAt, email, phone, id } = row;
  console.log({ row });
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const lowisy_s3_url = "https://lowisy-dev.s3.eu-central-1.amazonaws.com/";

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      {/* <Link
        component="button"
        variant="body2"
        onClick={() => {
          push(PATH_DASHBOARD.menu.products.view(paramCase(id)));
        }}
      > */}
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        {/* <Link
          component="button"
          variant="subtitle2"
          onClick={() => {
            push(PATH_DASHBOARD.menu.products.view(paramCase(id)));
          }}
        > */}
        {/* <Image
          disabledEffect
          alt={name}
          src={productImages.length > 0 ? lowisy_s3_url + productImages[0]?.images : ''}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        /> */}
        <Link
          component="button"
          variant="caption"
          onClick={() => {
            // push(PATH_DASHBOARD.menu.customers.view(paramCase(id)));
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
      </TableCell>

      <TableCell>{createdAt}</TableCell>

      {/* <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (unit === 'out_of_stock' && 'error') ||
            (unit === 'low_stock' && 'warning') ||
            'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {unit ? sentenceCase(unit) : ''}
        </Label>
      </TableCell> */}

      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{phone}</TableCell>

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
