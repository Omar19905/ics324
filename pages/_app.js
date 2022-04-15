import '../styles/globals.css'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    colors: {
      g:{
        1: "#303179",
        2:"#ed7966",
        bg:"#fef4e5",
      }
    }
  })
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
