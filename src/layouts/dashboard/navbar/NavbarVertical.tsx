import { useEffect } from "react";
import Scrollbar from "../../../components/Scrollbar";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
import useResponsive from "../../../hooks/useResponsive";
import { Box, Stack, Drawer, styled } from "@mui/material";
import { NAVBAR } from "../../../config";
import Logo from "../../../pages/Logo";
import Iconify from "../../../components/Iconify";
import { useRouter } from "next/router";
import { useTheme } from "@mui/system";
import NavbarAccount from "./NavbarAccount";
import navConfig from "./NavConfig";
import NavSectionVertical from "../../../components/nav-section/vertical";
import useAuth from "../../../hooks/useAuth";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));
type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
};

export default function NavbarVertical({
  isOpenSidebar,
  onCloseSidebar,
}: Props) {
  const theme = useTheme();
  const { pathname } = useRouter();
  const isDesktop = useResponsive("up", "lg");
  const { auth } = useAuth();

  const {
    isCollapse,
    collapseClick,
    collapseHover,
    onToggleCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);
  let navList;
  switch (auth?.role) {
    case "admin":
      navList = navConfig.adminNavConfig;
      break;
    case "member":
      navList = navConfig.memberNavConfig;
      break;
    case "trainer":
      navList = navConfig.trainerNavConfig;
      break;
    case "staff":
      navList = navConfig.staffNavConfig;
      break;
    default:
      return null;
  }
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: "center" }),
        }}
      >
        {isDesktop && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Logo />
          </Stack>
        )}
        <NavbarAccount />
      </Stack>

      <NavSectionVertical nav={navList} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: NAVBAR.DASHBOARD_WIDTH,
        },
      }}
    >
      {!isDesktop && (
        <Drawer
          anchor="top"
          open={isOpenSidebar}
          PaperProps={{ sx: { width: "100%", height: "100%" } }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            padding={2}
          >
            {/* <Logo /> */}
            <Iconify
              icon="ci:close-big"
              sx={{
                marginLeft: "auto",
                width: "50px",
                height: "20px",
                cursor: "pointer",
              }}
              onClick={onCloseSidebar}
            />
          </Box>
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: "dashed",
              bgcolor: "background.default",
              transition: (theme) =>
                theme.transitions.create("width", {
                  duration: theme.transitions.duration.standard,
                }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
