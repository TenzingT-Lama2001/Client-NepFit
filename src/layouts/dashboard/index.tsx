import { useState, ReactNode } from "react";
import { Box, styled } from "@mui/material";
import DashboardHeader from "./header";
import NavbarVertical from "./navbar/NavbarVertical";
import { HEADER, NAVBAR } from "../../config";
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
type Props = {
  children: ReactNode;
};
type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));
export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { collapseClick, isCollapse } = useCollapseDrawer();
  return (
    <Box sx={{ display: { lg: "flex" }, minHeight: { lg: 1 } }}>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} />
      <NavbarVertical
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle collapseClick={collapseClick}>{children}</MainStyle>
    </Box>
  );
}
