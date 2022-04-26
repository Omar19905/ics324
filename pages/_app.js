import '../styles/globals.css'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import Head from "next/head";

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
        <>
          <Head>
          <title>Create Next App</title>
          <meta name="description" content="ics 324 project"/>
          <link rel="icon" href="/plane.png"/>
        </Head>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </>
    )
}

export default MyApp
