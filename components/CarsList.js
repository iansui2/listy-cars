import { Box, Stack, HStack, VStack, Heading, Text, Button, Image, IconButton, Center, useColorMode, useColorModeValue as mode } from '@chakra-ui/react'
import Link from "next/link"

export const CarsList = ({ image }) => (
    <Box mt={16}>
        <Center>
            <Heading color="yellow.500">List of Cars</Heading>
        </Center>    

        <VStack justify="center" height={800}>
            <Heading size="lg">No Cars are available</Heading>
        </VStack>    
    </Box>    
)