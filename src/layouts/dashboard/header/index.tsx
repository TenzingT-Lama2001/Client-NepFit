import useResponsive from "../../../hooks/useResponsive";
import Logo from "../../../pages/Logo";
import { Box, Stack, AppBar, Toolbar, styled } from "@mui/material";
import cssStyles from "../../../utils/cssStyles";
import { HEADER, NAVBAR } from "../../../config";
import Iconify from "../../../components/Iconify";
import AccountPopover from "./AccountPopover";

type Props = {
  onOpenSidebar: VoidFunction;

  verticalLayout?: boolean;
};
type RootStyleProps = {
  verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "verticalLayout",
})<RootStyleProps>(({ verticalLayout, theme }) => ({
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

  return (
    <RootStyle verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

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
