import { Box, Stack, HStack, VStack, Heading, Text, Button, Image, IconButton, Center, useColorMode, useColorModeValue as mode } from '@chakra-ui/react'
import Link from "next/link"

export const Hero = ({ image }) => (
    <Box mt={16}>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={8} w="full">
            <Image src={image} width={{ md: 450, lg: 600, xl: 800 }} alt="Cars Picture" />
            <Center>
                <VStack align="start" spacing={4}>
                    <Heading>List your own car now!</Heading>
                    <Text>Listing a car has never been easier. Start the journey now by listing your car today!</Text>
                    <Link href="/add" passHref>
                        <Button
                            borderRadius="xl"
                            size="lg"
                            color="white"
                            bgColor="yellow.500"
                            _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                        >
                            List a Car
                        </Button>
                    </Link>    
                </VStack>    
            </Center>    
        </Stack>    
    </Box>    
)