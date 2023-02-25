import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useSettings from "../hooks/useSettings";
import IconButton from "@mui/material/IconButton";
import { alpha, Box, styled } from "@mui/material";
import { NAVBAR } from "../config";
export default function ToggleMode() {
  const { themeMode, onToggleMode } = useSettings();
  console.log({ themeMode });
  const RootStyle = styled(Box)(({ theme }) => ({
    top: "50%",
    right: 0,
    bottom: 0,
    height: 60,
    display: "flex",
    position: "fixed",
    overflow: "hidden",

    flexDirection: "column",
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    zIndex: theme.zIndex.drawer + 3,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
  }));
  return (
    <RootStyle>
      <IconButton sx={{ ml: 1 }} onClick={onToggleMode} color="inherit">
        {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </RootStyle>
  );
}
