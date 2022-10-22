import "../styles/globals.css";

import Layout from "../components/Layout";
import "../styles/globals.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StateContext } from "../context/StateContext";

import { Toaster } from "react-hot-toast";

const theme = createTheme({
  typography: {
    fontFamily: "Inter var",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <ThemeProvider theme={theme}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StateContext>
  );
}

export default MyApp;
