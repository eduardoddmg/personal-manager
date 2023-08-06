import { Navbar } from "@/components";
import { ContextProvider } from "@/context";
import { ChakraProvider } from "@chakra-ui/react";

import NextProgress from "next-progress";

import "../style.css";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <NextProgress options={{ showSpinner: false, color: "#ffffff" }} />
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextProvider>
  );
}
