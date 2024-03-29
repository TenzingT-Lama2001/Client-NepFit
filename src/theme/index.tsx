import { useMemo, ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";

import shadows, { customShadows } from "./shadows";
import useSettings from "../hooks/useSettings";
import ToggleMode from "../components/ToggleMode";

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { themeMode } = useSettings();
  const isLight = themeMode === "light";

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: {
        borderRadius: 8,
      },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline>{children}</CssBaseline>
      {/* <ToggleMode /> */}
    </MUIThemeProvider>
  );
}
