import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import fetch from "../lib/fetchJSON";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "../styles/global.css";
import Layout from "../components/layout";
import theme from "../src/theme";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <Layout home>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ThemeProvider>
  );
}
