import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Listy Cars</title>
        <meta name="title" content="Listy Cars" />
        <meta property="og:title" content="Listy Cars" />
        <meta property="og:image" content="../images/icon.png" />
        <link rel="icon" type="image/png" href="../images/icon.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )    
}

export default MyApp
