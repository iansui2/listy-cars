import { Box, Stack, HStack, VStack, Heading, Text, Button, Image, IconButton, Center, useColorMode, useColorModeValue as mode } from '@chakra-ui/react'
import Link from "next/link"

export const EndSection = ({ image }) => (
    <Box mt={16} mb={8}>
        <Image pos="relative" src={image} alt="Cars Picture" />
    </Box>    
)