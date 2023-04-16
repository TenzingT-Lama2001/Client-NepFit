import { ReactNode } from "react";
// @mui
import { styled } from "@mui/material/styles";
import Logo from "../pages/Logo";
import { Box } from "@mui/material";
import Image from "../components/Image";

// components

// ----------------------------------------------------------------------

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  children?: ReactNode;
};

export default function LogoOnlyLayout({ children }: Props) {
  return (
    <>
      <HeaderStyle>
        {" "}
        <Box height="3rem" width="3rem">
          <Image disabledEffect src={`/assets/logo.png`} />
        </Box>
      </HeaderStyle>
      {children}
    </>
  );
}
