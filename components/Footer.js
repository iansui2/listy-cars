import { 
  Box, HStack, useDisclosure, Text, Spacer, 
  Container, Stack, IconButton, useColorModeValue as mode,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, Button
} from "@chakra-ui/react";
import Link from "next/link"

export const Footer = ({ }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box w="full" py={4}>
      <Container maxW="container.xl">
        <Stack direction={{ base: 'column', md: 'row' }} fontWeight="bold" w="full">
          <HStack spacing={1}>
            <Text>Powered by</Text>
            <Text as="a" href={process.env.NEXT_PUBLIC_REACT_APP_VERCEL} target="_blank" color="yellow.500" _hover={{ transform: 'scale(1.1)' }}>Vercel</Text>
          </HStack>
          <Spacer />
          <Text color="yellow.500" cursor="default" _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }} onClick={onOpen}>Credits</Text>
          <Spacer />
          <HStack spacing={1}>
            <Text>Last Updated on</Text>
            <Text color="yellow.500" cursor="default" _hover={{ transform: 'scale(1.05)' }}>June 17, 2023</Text>
          </HStack>
        </Stack>
      </Container>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              Credits
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text mr={2}>
                All of the pictures used in this website is from 
              </Text>  
              <Link href="https://unsplash.com/" passHref>
                <Text 
                  fontWeight="bold" 
                  border="0" 
                  cursor="default" 
                  _hover={{ transform: 'scale(1.02)', transition: 'all 300ms ease' }}>
                    https://unsplash.com/.
                </Text>  
              </Link>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                _focus={{ borderColor: 'yellow.500' }} 
                color="white"
                bgColor="yellow.500" 
                size="lg"
                border="0"
                rounded="full" 
                onClick={() => {
                  onClose()
                }}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
</Box>
  )
}