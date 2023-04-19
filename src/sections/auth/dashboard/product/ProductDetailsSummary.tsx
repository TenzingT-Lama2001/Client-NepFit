import { sentenceCase } from "change-case";
// next
import { useRouter } from "next/router";
// form
import { Controller, useForm } from "react-hook-form";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
// routes

// utils

// @types

// components
import Label from "../../../../components/Label";
import Iconify from "../../../../components/Iconify";

import { FormProvider } from "../../../../components/hook-form";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { useEffect, useState } from "react";
import { Products } from "../../../../pages/dashboard/admin/products/list";
import useAuth from "../../../../hooks/useAuth";
import { uniqBy } from "lodash";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

type FormValuesProps = CartItem;
export type CartItem = {
  _id: string;
  name: string;

  imageUrl: {
    id: string;
    secure_url: string;
  };
  price: number;
  qty: number;
  quantity: number;
  subtotal: number;
  stripeProductId?: any;
  stripeProductPriceId?: any;
};
type Props = {
  product: Products[];
  cart: CartItem[];
  onAddCart: (cartItem: CartItem) => void;
  onGotoStep: (step: number) => void;
};

export default function ProductDetailsSummary({
  cart,
  product,
  onAddCart,
  onGotoStep,
  ...other
}: Props) {
  const theme = useTheme();

  const { push } = useRouter();
  const [status, setStatus] = useState<string>("");

  const {
    name,
    _id,
    price,
    imageUrl,
    quantity,
    stripeProductId,
    stripeProductPriceId,
  } = product[0];
  const { productState, setProductState } = useAuth();

  useEffect(() => {
    if (quantity < 1) {
      setStatus("out_of_stock");
    } else if (quantity < 3) {
      setStatus("low_stock");
    } else {
      setStatus("in_stock");
    }
  }, [quantity]);

  const alreadyProduct = cart.map((item) => item?._id).includes(_id);

  const isMaxQuantity =
    cart.filter((item) => item?._id === _id).map((item) => item?.qty)[0] >=
    quantity;

  const defaultValues = {
    _id,
    name,
    imageUrl,
    price,
    quantity,
    qty: quantity < 1 ? 0 : 1,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit, reset } = methods;

  const values = watch();

  useEffect(() => {
    if (product[0]) {
      const defaultValues = {
        _id: product[0]._id,
        name: product[0].name,
        imageUrl: product[0].imageUrl,
        price: product[0].price,
        quantity: product[0].quantity,
        qty: product[0].quantity < 1 ? 0 : 1,
      };
      reset(defaultValues);
    }
  }, [product, reset]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (!alreadyProduct) {
        onAddCart({
          ...data,
          subtotal: data.price * data.qty,
        });
        reset();
      }
      onGotoStep(0);
      push(PATH_DASHBOARD.dashboard.products.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.price * values.qty,
        stripeProductId,
        stripeProductPriceId,
      });
      console.log({ stripeProductId, stripeProductPriceId });
      console.log({ cart });
      reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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

        <Typography variant="h5" paragraph>
          {name}
        </Typography>

        <Typography variant="h4" sx={{ mb: 3 }}>
          &nbsp;{price}
        </Typography>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Quantity
          </Typography>

          <div>
            <Incrementer
              name="qty"
              qty={values.qty}
              quantity={quantity}
              onIncrementQuantity={() => setValue("qty", values.qty + 1)}
              onDecrementQuantity={() => setValue("qty", values.qty - 1)}
            />
            <Typography
              variant="caption"
              component="div"
              sx={{ mt: 1, textAlign: "right", color: "text.secondary" }}
            >
              Available: {quantity}
            </Typography>
          </div>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={isMaxQuantity}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={"ic:round-add-shopping-cart"} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: "nowrap" }}
          >
            Add to Cart
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Buy Now
          </Button>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

type IncrementerProps = {
  name: string;
  quantity: number;
  qty: number;
  onIncrementQuantity: VoidFunction;
  onDecrementQuantity: VoidFunction;
};

function Incrementer({
  qty,
  quantity,
  onIncrementQuantity,
  onDecrementQuantity,
}: IncrementerProps) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        borderColor: "grey.50032",
      }}
    >
      <IconButton
        size="small"
        color="inherit"
        disabled={qty <= 1}
        onClick={onDecrementQuantity}
      >
        <Iconify icon={"eva:minus-fill"} width={14} height={14} />
      </IconButton>

      <Typography
        variant="body2"
        component="span"
        sx={{ width: 40, textAlign: "center" }}
      >
        {qty}
      </Typography>

      <IconButton
        size="small"
        color="inherit"
        disabled={qty >= quantity}
        onClick={onIncrementQuantity}
      >
        <Iconify icon={"eva:plus-fill"} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
