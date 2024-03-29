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
import { logout } from "../../../api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PATH_AUTH, PATH_DASHBOARD } from "../../../routes/path";
import useAuth from "../../../hooks/useAuth";
import { getMember } from "../../../api/member";
import { paramCase } from "change-case";

export default function AccountPopover() {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { auth, setAuth, setCurrentPlan, setStripeDetails, setMembership } =
    useAuth();
  const currentRole = auth?.role;
  // const profileLink = `${
  //   PATH_DASHBOARD.dashboard
  // }.${currentRole}.edit(${paramCase(auth!.id)})`;
  const profileLink =
    auth?.id && `${PATH_DASHBOARD.dashboard.member.edit(paramCase(auth.id))}`;
  const MENU_OPTIONS = [
    {
      label: "Home",
      linkTo: "/",
    },
    {
      label: "Profile",
      linkTo: profileLink || "",
    },
  ];
  const handleClose = () => {
    setOpen(null);
  };

  // const { data: memberData } = useQuery(
  //   ["get_member_details"],
  //   () => getMember(auth?.id as string),
  //   {}
  // );
  const logoutMutation = useMutation(() => logout(), {
    onSuccess(data) {
      enqueueSnackbar(data.message || "Logout Successful");
      setAuth(null);
      setCurrentPlan(null);
      setMembership(null);
      setStripeDetails(null);

      push(PATH_AUTH.login);
    },
    onError(err: any) {
      console.log("in mutation");
      console.log("err", err);
      enqueueSnackbar(
        err.response.data.message ??
          err.message ??
          err.data.message ??
          "Something went wrong",
        { variant: "error" }
      );
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
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
        src={auth?.avatarUrl?.secure_url}
      />

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
            {auth?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {auth?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label}>{option.label}</MenuItem>
            </NextLink>
          ))}
          {/* <NextLink key="home" href="/" passHref>
            <MenuItem key="Home">Home</MenuItem>
          </NextLink>
          {auth?.id && (
            <NextLink key="home" href={`${profileLink}`} passHref>
              <MenuItem key="Profile">Profile</MenuItem>
            </NextLink>
          )} */}
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem sx={{ m: 1 }} onClick={() => handleLogout()}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
