import { Box } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'

export const AppLayout = ({ children }) => (
    <Box pt={8}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa+Ink&display=swap" rel="stylesheet" />
        <Header image="../images/icon.png" />
        <Box>
            {children}
        </Box>    
        <Footer />
    </Box>   
)