import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { cookiesExpires, cookiesKey } from "../config";


type ThemeMode = "light" | "dark";
export type SettingsValueProps = {
  themeMode: ThemeMode;
};

export type SettingsContextProps = {
  themeMode: ThemeMode;
  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetSetting: VoidFunction;
};

export const defaultSettings: SettingsValueProps = {
  themeMode: "light",
};

const initialState: SettingsContextProps = {
  ...defaultSettings,
  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},
  onResetSetting: () => {},
};

const SettingsContext = createContext(initialState);

type SettingsProviderProps = {
  children: ReactNode;
  defaultSettings: SettingsValueProps;
};
function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const [settings, setSettings] = useSettingCookies(defaultSettings);
  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      themeMode: (event.target as HTMLInputElement).value as ThemeMode,
    });
  };

  // Reset

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings, // Mode
        onToggleMode,
        onChangeMode,

        //Reset
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
export { SettingsProvider, SettingsContext };

function useSettingCookies(
  defaultSettings: SettingsValueProps
): [SettingsValueProps, Dispatch<SetStateAction<SettingsValueProps>>] {
  const [settings, setSettings] = useState<SettingsValueProps>(defaultSettings);
  const onChangeSetting = () => {
    Cookies.set(cookiesKey.themeMode, settings.themeMode, {
      expires: cookiesExpires,
    });
  };

  useEffect(() => {
    onChangeSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return [settings, setSettings];
}
