import { useState } from "react";
import { paramCase } from "change-case";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
// next
import { useRouter } from "next/router";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Typography,
  Autocomplete,
  InputAdornment,
  Popper,
  PopperProps,
} from "@mui/material";
// hooks
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
// utils
import axios from "../../../../utils/axios";
// routes

// components
import Image from "../../../../components/Image";
import Iconify from "../../../../components/Iconify";
import InputStyle from "../../../../components/InputStyle";
import SearchNotFound from "../../../../components/SearchNotFound";
import { PATH_DASHBOARD } from "../../../../routes/path";
import { Products } from "../../../../pages/dashboard/admin/products/list";
import { getProducts } from "../../../../api/products";
import { useQuery } from "@tanstack/react-query";

// ----------------------------------------------------------------------

const PopperStyle = styled((props: PopperProps) => (
  <Popper placement="bottom-start" {...props} />
))({
  width: "280px !important",
});

// ----------------------------------------------------------------------

export default function ShopProductSearch() {
  const { push } = useRouter();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useQuery<any>(
    ["get_products", searchQuery],
    () =>
      getProducts({
        page: 0,
        searchQuery: searchQuery,
        order: "asc",
      }),
    {
      onSuccess({ products }) {
        setSearchResults(products);
      },
    }
  );

  const handleChangeSearch = async (value: string) => {
    try {
      setSearchQuery(value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (name: string) => {
    // push(PATH_DASHBOARD.eCommerce.view(paramCase(name)));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick(searchQuery);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product: Products) => product.name}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder="Search product..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { name, imageUrl } = product;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        return (
          <li {...props}>
            <Image
              alt={imageUrl?.secure_url}
              src={imageUrl?.secure_url}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                flexShrink: 0,
                mr: 1.5,
              }}
            />
            <Link underline="none" onClick={() => handleClick(name)}>
              {parts.map((part: any, index: number) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? "primary" : "textPrimary"}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
