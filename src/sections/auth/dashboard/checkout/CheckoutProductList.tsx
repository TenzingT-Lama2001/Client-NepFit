// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
} from "@mui/material";
// utils

// @types

// components
import Image from "../../../../components/Image";
import Iconify from "../../../../components/Iconify";
import { TableHeadCustom } from "../../../../components/table";
import { CartItem } from "../product/ProductDetailsSummary";
import useAuth from "../../../../hooks/useAuth";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "product", label: "Product" },
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "totalPrice", label: "Total Price", align: "right" },
  { id: "" },
];

const IncrementerStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

type Props = {
  products: CartItem[];
  onDelete: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onIncreaseQuantity: (id: string) => void;
};

export default function CheckoutProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const { productState, setProductState } = useAuth();

  const { product, checkout } = productState ?? {};
  const { cart, total, discount, subtotal } = checkout ?? {};
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          {cart
            ? cart.map((row) => (
                <CheckoutProductListRow
                  key={row._id}
                  row={row}
                  onDelete={() => onDelete(row._id)}
                  onDecrease={() => onDecreaseQuantity(row._id)}
                  onIncrease={() => onIncreaseQuantity(row._id)}
                />
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

type CheckoutProductListRowProps = {
  row: CartItem;
  onDelete: VoidFunction;
  onDecrease: VoidFunction;
  onIncrease: VoidFunction;
};

function CheckoutProductListRow({
  row,
  onDelete,
  onDecrease,
  onIncrease,
}: CheckoutProductListRowProps) {
  const { name, price, imageUrl, quantity, qty, subtotal } = row;

  return (
    <TableRow>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Image
          alt="product image"
          src={imageUrl?.secure_url}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>${price}</TableCell>

      <TableCell>
        <Incrementer
          quantity={qty}
          available={quantity}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      </TableCell>

      <TableCell align="right">${price * qty}</TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon={"eva:trash-2-outline"} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

// ----------------------------------------------------------------------

type IncrementerProps = {
  available: number;
  quantity: number;
  onIncrease: VoidFunction;
  onDecrease: VoidFunction;
};

function Incrementer({
  available,
  quantity,
  onIncrease,
  onDecrease,
}: IncrementerProps) {
  return (
    <Box sx={{ width: 96, textAlign: "right" }}>
      <IncrementerStyle>
        <IconButton
          size="small"
          color="inherit"
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          <Iconify icon={"eva:minus-fill"} width={16} height={16} />
        </IconButton>

        {quantity}

        <IconButton
          size="small"
          color="inherit"
          onClick={onIncrease}
          disabled={quantity >= available}
        >
          <Iconify icon={"eva:plus-fill"} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>

      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        available: {available}
      </Typography>
    </Box>
  );
}
