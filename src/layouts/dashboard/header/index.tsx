import useResponsive from "../../../hooks/useResponsive";
import Logo from "../../../pages/Logo";
import { Box, Stack, AppBar, Toolbar, styled } from "@mui/material";
import cssStyles from "../../../utils/cssStyles";
import { HEADER, NAVBAR } from "../../../config";
import Iconify from "../../../components/Iconify";
import AccountPopover from "./AccountPopover";
import useOffSetTop from "../../../hooks/useOffSetTop";

type Props = {
  onOpenSidebar: VoidFunction;

  verticalLayout?: boolean;
};
type RootStyleProps = {
  verticalLayout: boolean;
  isOffset: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isOffset" && prop !== "verticalLayout",
})<RootStyleProps>(({ isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,

    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

export default function DashboardHeader({
  onOpenSidebar,
  verticalLayout = false,
}: Props) {
  const isDesktop = useResponsive("up", "lg");
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  return (
    <RootStyle verticalLayout={verticalLayout} isOffset={isOffset}>
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {/* {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />} */}

        {!isDesktop && (
          <Iconify
            icon="eva:menu-2-fill"
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
