import { Box, HStack, Heading, Image, IconButton, Center, useColorMode, useColorModeValue as mode } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import Link from "next/link"

export const Header = ({ image, onOpen }) => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box>
            <Link href="/" passHref>
                <Center>
                    <HStack spacing={4} mb={4}>
                        <Heading size="lg">Listy</Heading>
                        <Image h="50px" src={image} _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }} alt="Listy Cars Icon" />
                        <Heading size="lg">Cars</Heading>
                    </HStack>
                </Center>    
            </Link>     

            <Center>
                <IconButton
                    borderRadius="xl"
                    size="lg"
                    bgColor="yellow.500"
                    width="100px"
                    _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                    onClick={toggleColorMode}
                    icon={colorMode == 'light' ? <IoMoonOutline color="white" /> : <IoSunnyOutline color="white" />}
                /> 
            </Center>    
        </Box>   
    ) 
}