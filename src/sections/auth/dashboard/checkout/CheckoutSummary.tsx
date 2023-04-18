// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
} from "@mui/material";
// utils

// components
import Iconify from "../../../../components/Iconify";
import { useCallback, useEffect } from "react";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import useAuth from "../../../../hooks/useAuth";
import { sum } from "lodash";

// ----------------------------------------------------------------------

type Props = {
  discount?: number;
  subtotal?: number;
  shipping?: number;
  onEdit?: VoidFunction;
  enableEdit?: boolean;
  onApplyDiscount?: (discount: number) => void;
  enableDiscount?: boolean;
};

export default function CheckoutSummary({
  onEdit,
  discount,
  subtotal,
  shipping,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}: Props) {
  const displayShipping = shipping !== null ? "Free" : "-";

  const isMountedRef = useIsMountedRef();

  const { productState, setProductState } = useAuth();
  const { product, checkout } = productState ?? {};
  const { cart, billing, activeStep } = checkout ?? {};
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title="Order Summary" />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">${subtotal}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Shipping
            </Typography>
            <Typography variant="subtitle2">
              {shipping ? shipping : displayShipping}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle1" sx={{ color: "error.main" }}>
                ${subtotal}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Stack>

          {enableDiscount && onApplyDiscount && (
            <TextField
              fullWidth
              placeholder="Discount codes / Gifts"
              value="DISCOUNT5"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => onApplyDiscount(5)}
                      sx={{ mr: -0.5 }}
                    >
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
