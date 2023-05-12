import { Box, Stack, HStack, VStack, Heading, Text, Button, Spinner, Image, Grid, IconButton, Center, useColorMode, useColorModeValue as mode } from '@chakra-ui/react'
import Link from "next/link"
import CarApi from "../services/car-be.service"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Swal from 'sweetalert2'

export const CarsList = ({ image }) => {
    const [cars, setCars] = useState([])
    const [isCarsAvailable, setCarsAvailable] = useState(false)

    const router = useRouter()

    const getCars = () => {
        CarApi.getAllCars()
            .then((result) => {
                console.log(result.data);
                setCars(result.data);
                setCarsAvailable(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteCar = (id) => {
        Swal.fire({
            title: 'Are you sure you wnat to delete this car?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            icon: 'warning',
          }).then((result) => {
            if (result.isConfirmed) {
                CarApi.deleteCar(id)
                    .then((result) => {
                        console.log(result.data);
                        getCars();
                        Swal.fire('Deleted', 'Data deleted successfully!', 'success')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
              
            }
          })
    }

    useEffect(() => {
        getCars()
    }, [])

    return (
        <Box mt={16}>
            <Center>
                <Heading color="yellow.500" mb={8}>List of Cars</Heading>
            </Center>    

            <VStack justify="center" height={cars.length > 0 ? 'auto' : 400} mb={16}>
                {
                    isCarsAvailable === true ? 
                        cars.length > 0 ?
                            <Grid templateColumns={{ base: 'auto', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
                                {
                                    cars.map((car) => (
                                        <Box key={car.name} boxShadow="2xl" borderRadius="2xl" p={4} _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}>
                                            <Image src={car.image} alt={car.name} h={250} mb={2} mx="auto" /> 
                                            <Heading size="lg" mb={2}>{car.name}</Heading>
                                            <Text mb={2}>{car.brand}</Text>
                                            <Text mb={2}>{car.year}</Text>
                                            <Text mb={6}>{car.description}</Text>
                                            <Stack direction={{ base: 'column', md: 'row' }} spacing={2} w="full">
                                                <Button
                                                    size="md"
                                                    rounded="full"
                                                    _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                                                    bg="yellow.500"
                                                    color="white"
                                                    onClick={() => {
                                                        router.push({
                                                            pathname: "/view",
                                                            query: {
                                                                id: car.id
                                                            }
                                                        })
                                                    }}>
                                                    View
                                                </Button>
                                                <Button
                                                    size="md"
                                                    rounded="full"
                                                    _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                                                    bg="red.500"
                                                    color="white"
                                                    onClick={() => deleteCar(car.id)}>
                                                    Delete
                                                </Button>
                                            </Stack>    
                                        </Box>    
                                    ))
                                }
                            </Grid>    
                        :
                            <Heading size="lg">No Cars Are Available!</Heading>    
                    :
                        <Spinner size='xl' color='yellow.500' />
                }
            </VStack>    
        </Box>    
    )
}