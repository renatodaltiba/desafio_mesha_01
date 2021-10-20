import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../global/theme";
import { UtilsContextProvider } from "../context/UtilsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UtilsContextProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UtilsContextProvider>
    </>
  );
}
export default MyApp;
