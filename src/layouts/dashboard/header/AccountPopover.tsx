import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  Popover,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const MENU_OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: "/",
  },
];
export default function AccountPopover() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const handleClose = () => {
    setOpen(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  return (
    <>
      <Avatar
        onClick={handleOpen}
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >
        T
      </Avatar>

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            overflow: "inherit",
          },
        }}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            Tenzing Lama
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            Tenzing.lama36@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label}>{option.label}</MenuItem>
            </NextLink>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem sx={{ m: 1 }}>Logout</MenuItem>
      </Popover>
    </>
  );
}
