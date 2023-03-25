import { NextPage } from "next";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import NotistackProvider from "../components/NotistackProvider";
import ProgressBar from "../components/ProgressBar";
import {
  SettingsProvider,
  SettingsValueProps,
} from "../contexts/SettingsContext";
import ThemeProvider from "../theme";
// @mui
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import cookie from "cookie";
import { getSettings } from "../utils/getSettings";
import ToggleMode from "../components/ToggleMode";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CollapseDrawerProvider } from "../contexts/CollapseDrawerContext";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
}
const queryClient = new QueryClient();
export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, settings } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CollapseDrawerProvider>
              <SettingsProvider defaultSettings={settings}>
                <ThemeProvider>
                  <NotistackProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </NotistackProvider>
                </ThemeProvider>
              </SettingsProvider>
            </CollapseDrawerProvider>
          </LocalizationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || "" : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
