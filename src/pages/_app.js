import { Navbar } from "@/components";
import { ContextProvider } from "@/context";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextProvider>
  );
}
