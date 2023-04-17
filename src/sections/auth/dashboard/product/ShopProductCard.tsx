import { paramCase, sentenceCase } from "change-case";
// next
import NextLink from "next/link";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
// routes

// utils

// @types

// components
import Label from "../../../../components/Label";
import Image from "../../../../components/Image";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { Products } from "../../../../pages/dashboard/admin/products/list";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
// ----------------------------------------------------------------------

type Props = {
  product: Products;
};

export default function ShopProductCard({ product }: Props) {
  const theme = useTheme();
  const { name, imageUrl, price, quantity } = product;
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    if (quantity < 1) {
      setStatus("out_of_stock");
    } else if (quantity < 3) {
      setStatus("low_stock");
    } else {
      setStatus("in_stock");
    }
  }, [quantity]);
  console.log("name", name);

  //   const linkTo = `${PATH_DASHBOARD.dashboard.admin.products.view}?name=${encodedName}`;
  const linkTo = PATH_DASHBOARD.dashboard.products.view(paramCase(name));

  return (
    <Card>
      <Box sx={{ position: "relative" }}>
        {status && (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={
              status === "out_of_stock"
                ? "error"
                : status === "low_stock"
                ? "warning"
                : "success"
            }
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: "absolute",
              textTransform: "capitalize",
            }}
          >
            {status ? sentenceCase(status) : ""}
          </Label>
        )}
        <Image alt={name} src={imageUrl?.secure_url} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <NextLink href={linkTo} passHref>
          <Link color="inherit">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>
        </NextLink>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={0.5}>
            {price && (
              <Typography
                component="span"
                sx={{ color: "text.disabled", textDecoration: "line-through" }}
              >
                ${price + 10}
              </Typography>
            )}

            <Typography variant="subtitle1">${price}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
