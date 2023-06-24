import { Box, Stack, HStack, VStack, Heading, Text, Button, Image, IconButton, Center, useColorMode, useColorModeValue as mode } from '@chakra-ui/react'
import Link from "next/link"

export const EndSection = ({ image }) => (
    <Box pos="relative" color="yellow.500" mt={16} mb={8}>
        <Image pos="relative" src={image} alt="Cars Picture" />
        <VStack mt={{ base: 8, md: 0 }} pos={{ base: "relative", md: "absolute" }} top={{ base: "0%", md: "20%", lg: "25%" }} left={{ base: "0%", md: "40%", lg: "75%" }} transform={{ base: "none", md: "translate(-50%, -50%)" }}>
            <Heading size="lg">Listing a Car Has Never Been This Easy!</Heading>
            <Text>You can add the name, brand, year bought, description and image of the car.</Text>
        </VStack>    
    </Box>    
)